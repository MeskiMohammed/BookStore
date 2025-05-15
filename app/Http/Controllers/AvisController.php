<?php

namespace App\Http\Controllers;

use App\Models\Avis;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AvisController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $avis = Avis::with(['user', 'livre'])->latest()->get();
        
        return Inertia::render('admin/reviews', [
            'avis' => $avis
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'livre_id' => 'required|exists:livres,id',
            'note' => 'required|integer|min:1|max:5',
            'commentaire' => 'required|string'
        ]);

        // Check if user has already reviewed this book
        $existingReview = Avis::where('user_id', auth()->id())
            ->where('livre_id', $request->livre_id)
            ->first();
            
        if ($existingReview) {
            return redirect()->back()->with('error', 'Vous avez déjà laissé un avis pour ce livre.');
        }

        Avis::create([
            'user_id' => auth()->id(),
            'livre_id' => $request->livre_id,
            'note' => $request->note,
            'commentaire' => $request->commentaire
        ]);
        
        return redirect()->back()->with('success', 'Avis ajouté avec succès.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Avis $review)
    {
        $review->load('user', 'livre');
        
        return Inertia::render('admin/reviews/show', [
            'avis' => $review
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Avis $avis)
    {
        $request->validate([
            'note' => 'required|integer|min:1|max:5',
            'commentaire' => 'required|string'
        ]);

        // Check if the user is the owner of the review or an admin
        if (auth()->id() !== $avis->user_id && !auth()->user()->is_admin) {
            return redirect()->back()->with('error', 'Vous n\'êtes pas autorisé à modifier cet avis.');
        }

        $avis->update([
            'note' => $request->note,
            'commentaire' => $request->commentaire
        ]);
        
        return redirect()->back()->with('success', 'Avis mis à jour avec succès.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Avis $avis)
    {
        // Check if the user is the owner of the review or an admin
        if (auth()->id() !== $avis->user_id && !auth()->user()->is_admin) {
            return redirect()->back()->with('error', 'Vous n\'êtes pas autorisé à supprimer cet avis.');
        }
        
        $avis->delete();
        
        return redirect()->back()->with('success', 'Avis supprimé avec succès.');
    }
}
