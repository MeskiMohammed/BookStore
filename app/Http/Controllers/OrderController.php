<?php

namespace App\Http\Controllers;

use App\Models\Commande;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Commande::with(['user', 'details_commandes.livre'])
            ->latest()
            ->get();
        $users = User::select('id', 'nom', 'prenom')->get();

        return Inertia::render('admin/orders', [
            'initialOrders' => $orders,
            'users' => $users,
            'flash' => [
                'message' => session('message'),
                'type' => session('type')
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
            'montant_totale' => 'required|numeric|min:0',
            'statut' => 'required|string|in:en_attente,en_cours,livree,annulee',
            'methode_paiement' => 'required|string|in:credit_card,paypal'
        ]);

        $order = Commande::create($request->all());
        $order->load('user');

        session()->flash('newOrder', $order);
        return redirect()->route('orders.index')
            ->with('success', 'Order created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Commande $order)
    {
        $order->load(['user', 'details_commandes.livre']);

        return Inertia::render('admin/orders/show', [
            'commande' => $order,
            'availableStatuses' => [
                'en_attente' => 'En attente',
                'en_cours' => 'En cours',
                'livree' => 'Livrée',
                'annulee' => 'Annulée'
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Commande $order)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'montant_totale' => 'required|numeric|min:0',
            'statut' => 'required|string|in:en_attente,en_cours,livree,annulee',
            'methode_paiement' => 'required|string|in:credit_card,paypal'
        ]);

        $order->update($request->all());
        $order->load('user');

        session()->flash('updatedOrder', $order);
        return redirect()->route('orders.index')
            ->with('success', 'Order updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Commande $order)
    {
        $orderId = $order->id;

        // Delete related order details first
        $order->details_commandes()->delete();
        $order->delete();

        session()->flash('deletedOrderId', $orderId);
        return redirect()->route('orders.index')
            ->with('success', 'Order deleted successfully.');
    }

    /**
     * Update the order status.
     */
    public function updateStatus(Request $request, Commande $order)
    {
        $request->validate([
            'statut' => 'required|string|in:en_attente,en_cours,livree,annulee'
        ]);

        $order->update([
            'statut' => $request->statut
        ]);

        // Reload the order with its relationships
        $order->load(['user', 'details_commandes.livre']);

        session()->flash('updatedOrder', $order);
        return redirect()->back()->with('success', 'Order status updated successfully.');
    }
}
