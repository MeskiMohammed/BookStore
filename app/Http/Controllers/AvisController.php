<?php

namespace App\Http\Controllers;

use App\Models\Avis;
use App\Models\User;
use App\Models\Livre;
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
        $users = User::select('id', 'nom', 'prenom')->get();
        $books = Livre::select('id', 'libelle')->get();
        
        return Inertia::render('admin/reviews', [
            'initialReviews' => $avis,
            'users' => $users,
            'books' => $books,
            'flash' => [
                'newReview' => session('newReview'),
                'updatedReview' => session('updatedReview'),
                'deletedReviewId' => session('deletedReviewId'),
                'success' => session('success'),
                'error' => session('error')
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'livre_id' => 'required|exists:livres,id',
            'note' => 'required|integer|min:1|max:5',
            'commentaire' => 'required|string'
        ]);

        $avis = Avis::create($request->all());
        $avis->load('user', 'livre');

        session()->flash('newReview', $avis);
        return redirect()->route('reviews.index')
            ->with('success', 'Review added successfully.');
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
    public function update(Request $request, Avis $review)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'livre_id' => 'required|exists:livres,id',
            'note' => 'required|integer|min:1|max:5',
            'commentaire' => 'required|string'
        ]);

        $review->update($request->all());
        $review->load('user', 'livre');

        session()->flash('updatedReview', $review);
        return redirect()->route('reviews.index')
            ->with('success', 'Review updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Avis $review)
    {
        $reviewId = $review->id;
        $review->delete();
        
        session()->flash('deletedReviewId', $reviewId);
        return redirect()->route('reviews.index')
            ->with('success', 'Review deleted successfully.');
    }
}
