<?php

namespace App\Http\Controllers;

use App\Models\Commande;
use App\Models\DetailsCommande;
use App\Models\Livre;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class CheckoutController extends Controller
{
    /**
     * Display the checkout page.
     */
    public function index()
    {
        return Inertia::render('store/checkout');
    }

    public function store(Request $request)
    {
        $request->validate([
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'address' => 'required|string|max:255',
            'paymentMethod' => 'required|string|in:credit_card,paypal,bank_transfer',
        ]);

        // Get cart items from session
        $cartItems = session('cart', []);

        if (empty($cartItems)) {
            return redirect()->back()->with('error', 'Your cart is empty.');
        }

        // Calculate totals
        $subtotal = collect($cartItems)->sum(function ($item) {
            return $item['prix'] * $item['quantity'];
        });
        $shipping = 5.00;
        $tax = $subtotal * 0.1;
        $total = $subtotal + $shipping + $tax;

        // Create order
        $commande = Commande::create([
            'user_id' => Auth::id(),
            'client_name' => $request->firstName . ' ' . $request->lastName,
            'client_email' => $request->email,
            'client_address' => $request->address,
            'payment_method' => $request->paymentMethod,
            'total_amount' => $total,
            'status' => 'pending',
        ]);

        // Create order details
        foreach ($cartItems as $item) {
            DetailsCommande::create([
                'commande_id' => $commande->id,
                'livre_id' => $item['id'],
                'quantity' => $item['quantity'],
                'price' => $item['prix'],
            ]);
        }

        // Clear cart
        session()->forget('cart');

        return redirect()->route('home')->with('success', 'Order placed successfully!');
    }

    /**
     * Display the checkout success page.
     */
    public function success()
    {
        $commandeId = session('commande_id');

        if (!$commandeId) {
            return redirect()->route('home');
        }

        $commande = Commande::with(['detailsCommandes.livre'])->find($commandeId);

        if (!$commande || $commande->user_id !== auth()->id()) {
            return redirect()->route('home');
        }

        return Inertia::render('store/checkout-success', [
            'commande' => $commande
        ]);
    }
}
