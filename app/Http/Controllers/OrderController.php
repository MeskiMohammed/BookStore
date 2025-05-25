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
        $orders = Commande::with('user')->latest()->get();
        $users = User::select('id', 'nom', 'prenom')->get();

        return Inertia::render('admin/orders', [
            'initialOrders' => $orders,
            'users' => $users,
            'flash' => [
                'newOrder' => session('newOrder'),
                'updatedOrder' => session('updatedOrder'),
                'deletedOrderId' => session('deletedOrderId'),
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
            'montant_totale' => 'required|numeric|min:0',
            'statut' => 'required|string|in:pending,processing,completed,cancelled',
            'method_paiment' => 'required|string|in:credit_card,paypal,bank_transfer,cash'
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
    public function show($id)
    {
        $order = \App\Models\Commande::with(['user', 'orderDetails.livre'])->findOrFail($id);
        return response()->json($order);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Commande $order)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'montant_totale' => 'required|numeric|min:0',
            'statut' => 'required|string|in:pending,processing,completed,cancelled',
            'method_paiment' => 'required|string|in:credit_card,paypal,bank_transfer,cash'
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
        $order->detailsCommandes()->delete();
        $order->delete();

        session()->flash('deletedOrderId', $orderId);
        return redirect()->route('orders.index')
            ->with('success', 'Order deleted successfully.');
    }
}
