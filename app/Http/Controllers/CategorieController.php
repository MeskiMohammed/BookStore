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
        $categories = Categorie::all();
        
        return Inertia::render('admin/categories', [
            'initialCategories' => $categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:255',
            'description' => 'nullable|string'
        ]);

        try {
            $category = new Categorie();
            $category->nom = $request->nom;
            $category->description = $request->description;
            $category->save();
        
            return redirect()->back()
                ->with('success', 'Category created successfully.')
                ->with('newCategory', $category);
        } catch (\Exception $e) {
            return redirect()->back()
                ->withInput()
                ->with('error', 'Error creating category: ' . $e->getMessage());
        }
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
            'nom' => 'required|string|max:255',
            'description' => 'nullable|string'
        ]);

        try {
            $category->nom = $request->nom;
            $category->description = $request->description;
            $category->save();
        
            return redirect()->back()
                ->with('success', 'Category updated successfully.')
                ->with('updatedCategory', $category);
        } catch (\Exception $e) {
            return redirect()->back()
                ->withInput()
                ->with('error', 'Error updating category: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Categorie $category)
    {
        try {
        // Check if category has books
            if ($category->livres()->exists()) {
                return redirect()->back()
                    ->with('error', 'Cannot delete category: It has associated books.');
        }
        
        $category->delete();
            return redirect()->back()
                ->with('success', 'Category deleted successfully.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Error deleting category: ' . $e->getMessage());
        }
    }
}
