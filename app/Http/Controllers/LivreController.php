<?php

namespace App\Http\Controllers;

use App\Models\Livre;
use App\Models\Categorie;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class LivreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $livres = Livre::with('categorie')->get();
        $categories = Categorie::all();

        return Inertia::render('admin/books', [
            'initialBooks' => $livres,
            'categories' => $categories,
            'flash' => [
                'newBook' => session('newBook'),
                'updatedBook' => session('updatedBook'),
                'deletedBookId' => session('deletedBookId'),
                'success' => session('success'),
                'error' => session('error')
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Categorie::all();

        return Inertia::render('admin/books/create', [
            'categories' => $categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'libelle' => 'required|string|max:255',
            'description' => 'required|string',
            'auteur' => 'required|string|max:255',
            'isbn' => 'required|string|max:20|unique:livres,isbn',
            'prix' => 'required|numeric|min:0',
            'stock' => 'required|numeric|min:0',
            'categorie_id' => 'required|exists:categories,id',
            'editeur' => 'required|string|max:255',
            'date_publication' => 'required|date',
            'image' => 'nullable|image|max:2048',
            'actif' => 'boolean'
        ]);

        try {
            $livre = new Livre();
            $livre->libelle = $request->libelle;
            $livre->description = $request->description;
            $livre->auteur = $request->auteur;
            $livre->isbn = $request->isbn;
            $livre->prix = $request->prix;
            $livre->stock = $request->stock;
            $livre->categorie_id = $request->categorie_id;
            $livre->editeur = $request->editeur;
            $livre->date_publication = $request->date_publication;
            $livre->actif = $request->has('actif') ? $request->boolean('actif') : true;

            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $filename = Str::slug($request->libelle) . '-' . time() . '.' . $image->getClientOriginalExtension();

                // Store the image
                $path = $image->storeAs('livres', $filename, 'public');
                $livre->image = '/storage/' . $path;
            } else {
                $livre->image = '/images/default-book.jpg';
            }

            $livre->save();

            // Load the category relationship and fresh data
            $livre = $livre->fresh(['categorie']);

            session()->flash('newBook', $livre);
            return redirect()->route('books.index')
                ->with('success', 'Book created successfully.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withInput()
                ->with('error', 'Error creating book: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Livre $book)
    {
        $book->load('categorie', 'avis.user');

        // Get related books from the same category
        $relatedBooks = Livre::where('categorie_id', $book->categorie_id)
            ->where('id', '!=', $book->id)
            ->where('actif', true)
            ->take(10)
            ->get();

        // Append computed attributes
        $book->append(['average_rating', 'in_stock']);

        // If accessing from admin route, show admin view
        if (request()->is('admin/*')) {
            return Inertia::render('admin/books/show', [
                'livre' => $book
            ]);
        }

        // Otherwise show public store view
        return Inertia::render('store/details-product', [
            'book' => $book,
            'relatedBooks' => $relatedBooks
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Livre $book)
    {
        $categories = Categorie::all();

        return Inertia::render('admin/books/edit', [
            'livre' => $book,
            'categories' => $categories
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Livre $book)
    {
        $request->validate([
            'libelle' => 'required|string|max:255',
            'description' => 'required|string',
            'auteur' => 'required|string|max:255',
            'prix' => 'required|numeric|min:0',
            'stock' => 'required|numeric|min:0',
            'categorie_id' => 'required|exists:categories,id',
            'editeur' => 'required|string|max:255',
            'image' => 'nullable|image|max:2048',
            'date_publication' => 'required|date',
            'isbn' => 'required|string|max:20|unique:livres,isbn,' . $book->id,
            'actif' => 'boolean'
        ]);

        try {
            $book->libelle = $request->libelle;
            $book->description = $request->description;
            $book->auteur = $request->auteur;
            $book->prix = $request->prix;
            $book->stock = $request->stock;
            $book->categorie_id = $request->categorie_id;
            $book->editeur = $request->editeur;
            $book->date_publication = $request->date_publication;
            $book->isbn = $request->isbn;
            $book->actif = $request->has('actif') ? $request->boolean('actif') : true;

            if ($request->hasFile('image')) {
                // Delete old image if it exists and is not the default
                if ($book->image && $book->image != '/images/default-book.jpg') {
                    $oldPath = str_replace('/storage/', '', $book->image);
                    Storage::disk('public')->delete($oldPath);
                }

                $image = $request->file('image');
                $filename = Str::slug($request->libelle) . '-' . time() . '.' . $image->getClientOriginalExtension();

                // Store the new image
                $path = $image->storeAs('livres', $filename, 'public');
                $book->image = '/storage/' . $path;
            }

            $book->save();

            // Load the category relationship and fresh data
            $book = $book->fresh(['categorie']);

            session()->flash('updatedBook', $book);
            return redirect()->route('books.index')
                ->with('success', 'Book updated successfully.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withInput()
                ->with('error', 'Error updating book: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Livre $book)
    {
        try {
            $bookId = $book->id; // Store the ID before deletion

            // Delete image if it exists and is not the default
            if ($book->image && $book->image != '/images/default-book.jpg') {
                $path = str_replace('/storage/', '', $book->image);
                Storage::disk('public')->delete($path);
            }

            $book->delete();
            session()->flash('deletedBookId', $bookId);
            return redirect()->route('books.index')
                ->with('success', 'Book deleted successfully.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Error deleting book: ' . $e->getMessage());
        }
    }
}
