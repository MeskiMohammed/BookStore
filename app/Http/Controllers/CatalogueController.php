<?php

namespace App\Http\Controllers;

use App\Models\Livre;
use App\Models\Categorie;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CatalogueController extends Controller
{
    /**
     * Display the catalogue page with filters.
     */
    public function index(Request $request)
    {
        $query = Livre::with('categorie');
        
        // Apply category filter
        if ($request->has('categorie') && $request->categorie) {
            $query->where('categorie_id', $request->categorie);
        }
        
        // Apply price range filter
        if ($request->has('prix_min') && $request->prix_min) {
            $query->where('prix', '>=', $request->prix_min);
        }
        
        if ($request->has('prix_max') && $request->prix_max) {
            $query->where('prix', '<=', $request->prix_max);
        }
        
        // Apply search filter
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('titre', 'like', "%{$search}%")
                  ->orWhere('auteur', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }
        
        // Apply sorting
        $sort = $request->sort ?? 'titre';
        $direction = $request->direction ?? 'asc';
        
        $query->orderBy($sort, $direction);
        
        // Get paginated results
        $livres = $query->paginate(12)->withQueryString();
        
        // Get all categories for filter
        $categories = Categorie::all();
        
        return Inertia::render('store/catalogue', [
            'livres' => $livres,
            'categories' => $categories,
            'filters' => $request->only(['categorie', 'prix_min', 'prix_max', 'search', 'sort', 'direction'])
        ]);
    }

    /**
     * Display the product details page.
     */
    public function show($id)
    {
        $livre = Livre::with(['categorie', 'avis.user'])->findOrFail($id);
        
        // Get related books from the same category
        $relatedBooks = Livre::where('categorie_id', $livre->categorie_id)
            ->where('id', '!=', $livre->id)
            ->inRandomOrder()
            ->limit(4)
            ->get();
        
        return Inertia::render('store/details-product', [
            'livre' => $livre,
            'relatedBooks' => $relatedBooks
        ]);
    }
}
