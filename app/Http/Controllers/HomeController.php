<?php

namespace App\Http\Controllers;

use App\Models\Livre;
use App\Models\Categorie;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display the home page.
     */
    public function index()
    {
        // Get featured books (newest releases)
        $featuredBooks = Livre::with('categorie')
            ->orderBy('date_publication', 'desc')
            ->limit(6)
            ->get();
        
        // Get popular books (most reviewed)
        $popularBooks = Livre::withCount('avis')
            ->orderBy('avis_count', 'desc')
            ->limit(6)
            ->get();
        
        // Get categories with book count
        $categories = Categorie::withCount('livres')
            ->orderBy('livres_count', 'desc')
            ->limit(6)
            ->get();
        
        return Inertia::render('store/home', [
            'featuredBooks' => $featuredBooks,
            'popularBooks' => $popularBooks,
            'categories' => $categories
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
