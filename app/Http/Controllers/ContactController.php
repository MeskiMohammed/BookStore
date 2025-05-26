<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'prenom' => 'required|string|max:255',
            'nom' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'telephone' => 'nullable|string|max:255',
            'message' => 'required|string',
        ]);

        if (Auth::check()) {
            $validated['user_id'] = Auth::id();
        }

        Contact::create($validated);

        return redirect()->back()->with('success', 'Message envoyé avec succès!');
    }

    public function index()
    {
        $contacts = Contact::latest()->get();
        return Inertia::render('admin/contacts', [
            'initialContacts' => $contacts,
            'flash' => [
                'updatedContact' => session('updatedContact'),
                'deletedContactId' => session('deletedContactId'),
                'success' => session('success'),
                'error' => session('error')
            ],
        ]);
    }

    public function updateStatus(Request $request, Contact $contact)
    {
        $validated = $request->validate([
            'status' => 'required|string|in:pending,in_progress,completed,cancelled'
        ]);

        $contact->update($validated);

        session()->flash('updatedContact', $contact);
        return back()->with('success', 'Statut mis à jour avec succès');
    }

    public function destroy(Contact $contact)
    {
        $contact->delete();
        session()->flash('deletedContactId', $contact->id);
        return back()->with('success', 'Message supprimé avec succès');
    }
}
