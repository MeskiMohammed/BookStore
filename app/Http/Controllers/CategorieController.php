<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategorieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Categorie::withCount('livres')->get();
        
        return Inertia::render('admin/categories', [
            'categories' => $categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:255|unique:categories,nom',
            'description' => 'nullable|string'
        ]);

        Categorie::create([
            'nom' => $request->nom,
            'description' => $request->description
        ]);
        
        return redirect()->back()->with('success', 'Catégorie créée avec succès.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Categorie $category)
    {
        $category->load('livres');
        
        return Inertia::render('admin/categories/show', [
            'categorie' => $category
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Categorie $category)
    {
        $request->validate([
            'nom' => 'required|string|max:255|unique:categories,nom,' . $category->id,
            'description' => 'nullable|string'
        ]);

        $category->update([
            'nom' => $request->nom,
            'description' => $request->description
        ]);
        
        return redirect()->back()->with('success', 'Catégorie mise à jour avec succès.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Categorie $category)
    {
        // Check if category has books
        if ($category->livres()->count() > 0) {
            return redirect()->back()->with('error', 'Impossible de supprimer cette catégorie car elle contient des livres.');
        }
        
        $category->delete();
        
        return redirect()->back()->with('success', 'Catégorie supprimée avec succès.');
    }
}
