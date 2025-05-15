<?php

namespace App\Http\Controllers;

use App\Models\Commande;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CommandeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $commandes = Commande::with('user')->latest()->get();
        
        return Inertia::render('admin/orders', [
            'commandes' => $commandes
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Commande $order)
    {
        $order->load('user', 'detailsCommandes.livre');
        
        return Inertia::render('admin/orders/show', [
            'commande' => $order
        ]);
    }

    /**
     * Update the status of the specified resource in storage.
     */
    public function updateStatus(Request $request, Commande $commande)
    {
        $request->validate([
            'statut' => 'required|string|in:en attente,en cours,expédiée,livrée,annulée'
        ]);

        $commande->update([
            'statut' => $request->statut
        ]);
        
        return redirect()->back()->with('success', 'Statut de la commande mis à jour avec succès.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Commande $order)
    {
        $request->validate([
            'statut' => 'required|string|in:en attente,en cours,expédiée,livrée,annulée',
            'adresse_livraison' => 'required|string',
            'methode_paiement' => 'required|string'
        ]);

        $order->update([
            'statut' => $request->statut,
            'adresse_livraison' => $request->adresse_livraison,
            'methode_paiement' => $request->methode_paiement
        ]);
        
        return redirect()->back()->with('success', 'Commande mise à jour avec succès.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Commande $order)
    {
        // Delete related order details first
        $order->detailsCommandes()->delete();
        
        // Then delete the order
        $order->delete();
        
        return redirect()->route('orders.index')->with('success', 'Commande supprimée avec succès.');
    }
}
