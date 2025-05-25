<?php

namespace App\Http\Controllers;

use App\Models\Livre;
use App\Models\Categorie;
use App\Models\DetailsCommande;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    private function getPrimaryAuthor($authors)
    {
        if (empty($authors)) {
            return 'Auteur inconnu';
        }
        // Get first author before any comma or 'and'
        $primaryAuthor = explode(',', $authors)[0];
        $primaryAuthor = explode(' and ', $primaryAuthor)[0];
        $primaryAuthor = explode(' & ', $primaryAuthor)[0];
        return trim($primaryAuthor);
    }

    /**
     * Display the home page.
     */
    public function index()
    {
        // Get Best Sellers (based on order details)
        $bestSellers = Livre::select(
            'livres.id',
            'livres.libelle',
            'livres.description',
            'livres.auteur',
            'livres.prix',
            'livres.image',
            'livres.categorie_id',
            DB::raw('COUNT(details_commandes.id) as total_orders')
        )
        ->leftJoin('details_commandes', 'livres.id', '=', 'details_commandes.livre_id')
        ->groupBy(
            'livres.id',
            'livres.libelle',
            'livres.description',
            'livres.auteur',
            'livres.prix',
            'livres.image',
            'livres.categorie_id'
        )
        ->orderBy('total_orders', 'desc')
        ->with(['categorie', 'avis'])
        ->take(10)
        ->get()
        ->map(function ($livre) {
            return [
                'id' => $livre->id,
                'libelle' => $livre->libelle,
                'description' => $livre->description,
                'auteur' => $this->getPrimaryAuthor($livre->auteur),
                'prix' => $livre->prix,
                'image' => $livre->image,
                'categorie' => $livre->categorie->nom,
                'rating' => $livre->avis->avg('note') ?? 0
            ];
        });

        // Get Popular Books (highest rated)
        $popular = Livre::select(
            'livres.id',
            'livres.libelle',
            'livres.description',
            'livres.auteur',
            'livres.prix',
            'livres.image',
            'livres.categorie_id',
            DB::raw('AVG(avis.note) as average_rating')
        )
        ->leftJoin('avis', 'livres.id', '=', 'avis.livre_id')
        ->groupBy(
            'livres.id',
            'livres.libelle',
            'livres.description',
            'livres.auteur',
            'livres.prix',
            'livres.image',
            'livres.categorie_id'
        )
        ->having('average_rating', '>', 0)
        ->orderBy('average_rating', 'desc')
        ->with(['categorie', 'avis'])
        ->take(10)
        ->get()
        ->map(function ($livre) {
            return [
                'id' => $livre->id,
                'libelle' => $livre->libelle,
                'description' => $livre->description,
                'auteur' => $this->getPrimaryAuthor($livre->auteur),
                'prix' => $livre->prix,
                'image' => $livre->image,
                'categorie' => $livre->categorie->nom,
                'rating' => $livre->average_rating
            ];
        });

        // Get Science Fiction Books
        $scienceFiction = Livre::select(
            'livres.id',
            'livres.libelle',
            'livres.description',
            'livres.auteur',
            'livres.prix',
            'livres.image',
            'livres.categorie_id'
        )
        ->whereHas('categorie', function($query) {
            $query->where('nom', 'like', '%science%fiction%');
        })
        ->with(['categorie', 'avis'])
        ->take(10)
        ->get()
        ->map(function ($livre) {
            return [
                'id' => $livre->id,
                'libelle' => $livre->libelle,
                'description' => $livre->description,
                'auteur' => $this->getPrimaryAuthor($livre->auteur),
                'prix' => $livre->prix,
                'image' => $livre->image,
                'categorie' => $livre->categorie->nom,
                'rating' => $livre->avis->avg('note') ?? 0
            ];
        });

        // Get all categories for the "Shop by category" section
        $bookGenres = Categorie::select('id', 'nom')->get();

        return Inertia::render('store/home', [
            'bestSellers' => $bestSellers,
            'popular' => $popular,
            'scienceFiction' => $scienceFiction,
            'bookGenres' => $bookGenres
        ]);
    }

    /**
     * Display the about page.
     */
    public function about()
    {
        return Inertia::render('store/about');
    }

    /**
     * Display the contact page.
     */
    public function contact()
    {
        return Inertia::render('store/contact');
    }

    /**
     * Handle contact form submission.
     */
    public function submitContact(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string'
        ]);

        // Here you would typically send an email or store the contact message
        // For now, we'll just redirect with a success message

        return redirect()->back()->with('success', 'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.');
    }
}
