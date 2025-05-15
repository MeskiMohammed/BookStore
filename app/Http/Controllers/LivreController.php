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

        return Inertia::render('admin/books', [
            'initialBooks' => $livres
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
            'titre' => 'required|string|max:255',
            'auteur' => 'required|string|max:255',
            'description' => 'required|string',
            'prix' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'categorie_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|max:2048',
            'date_publication' => 'required|date',
            'isbn' => 'required|string|max:20|unique:livres,isbn',
        ]);

        $livre = new Livre();
        $livre->titre = $request->titre;
        $livre->auteur = $request->auteur;
        $livre->description = $request->description;
        $livre->prix = $request->prix;
        $livre->stock = $request->stock;
        $livre->categorie_id = $request->categorie_id;
        $livre->date_publication = $request->date_publication;
        $livre->isbn = $request->isbn;

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $filename = Str::slug($request->titre) . '-' . time() . '.' . $image->getClientOriginalExtension();
            $path = $image->storeAs('public/livres', $filename);
            $livre->image = Storage::url($path);
        } else {
            $livre->image = '/images/default-book.jpg';
        }

        $livre->save();

        return redirect()->route('books.index')->with('success', 'Livre créé avec succès.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Livre $book)
    {
        $book->load('categorie', 'avis.user');

        return Inertia::render('admin/books/show', [
            'livre' => $book
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
            'titre' => 'required|string|max:255',
            'auteur' => 'required|string|max:255',
            'description' => 'required|string',
            'prix' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'categorie_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|max:2048',
            'date_publication' => 'required|date',
            'isbn' => 'required|string|max:20|unique:livres,isbn,' . $book->id,
        ]);

        $book->titre = $request->titre;
        $book->auteur = $request->auteur;
        $book->description = $request->description;
        $book->prix = $request->prix;
        $book->stock = $request->stock;
        $book->categorie_id = $request->categorie_id;
        $book->date_publication = $request->date_publication;
        $book->isbn = $request->isbn;

        if ($request->hasFile('image')) {
            // Delete old image if it exists and is not the default
            if ($book->image && $book->image != '/images/default-book.jpg') {
                Storage::delete(str_replace('/storage', 'public', $book->image));
            }

            $image = $request->file('image');
            $filename = Str::slug($request->titre) . '-' . time() . '.' . $image->getClientOriginalExtension();
            $path = $image->storeAs('public/livres', $filename);
            $book->image = Storage::url($path);
        }

        $book->save();

        return redirect()->route('books.index')->with('success', 'Livre mis à jour avec succès.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Livre $book)
    {
        // Delete image if it exists and is not the default
        if ($book->image && $book->image != '/images/default-book.jpg') {
            Storage::delete(str_replace('/storage', 'public', $book->image));
        }

        $book->delete();

        return redirect()->route('books.index')->with('success', 'Livre supprimé avec succès.');
    }
}
