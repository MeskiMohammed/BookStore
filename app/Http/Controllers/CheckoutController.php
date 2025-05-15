<?php

namespace App\Http\Controllers;

use App\Models\Commande;
use App\Models\DetailsCommande;
use App\Models\Livre;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class CheckoutController extends Controller
{
    /**
     * Display the checkout page.
     */
    public function index()
    {
        // Get cart items from session
        $cartItems = session()->get('cart', []);
        
        // Redirect to cart if empty
        if (empty($cartItems)) {
            return redirect()->route('cart.index')->with('error', 'Votre panier est vide.');
        }
        
        $items = [];
        $total = 0;
        
        // Fetch book details for each cart item
        foreach ($cartItems as $id => $details) {
            $livre = Livre::find($id);
            if ($livre) {
                $items[] = [
                    'id' => $id,
                    'livre' => $livre,
                    'quantite' => $details['quantite']
                ];
                $total += $livre->prix * $details['quantite'];
            }
        }
        
        // Get user information
        $user = auth()->user();
        
        return Inertia::render('store/checkout', [
            'cartItems' => $items,
            'total' => $total,
            'user' => $user
        ]);
    }

    /**
     * Process the checkout.
     */
    public function process(Request $request)
    {
        $request->validate([
            'adresse_livraison' => 'required|string|max:255',
            'methode_paiement' => 'required|string|in:carte,paypal,virement'
        ]);
        
        // Get cart items from session
        $cartItems = session()->get('cart', []);
        
        // Check if cart is empty
        if (empty($cartItems)) {
            return redirect()->route('cart.index')->with('error', 'Votre panier est vide.');
        }
        
        // Calculate total and check stock
        $total = 0;
        $items = [];
        
        foreach ($cartItems as $id => $details) {
            $livre = Livre::find($id);
            if (!$livre) {
                continue;
            }
            
            // Check if there's enough stock
            if ($livre->stock < $details['quantite']) {
                return redirect()->route('cart.index')->with('error', 'Stock insuffisant pour ' . $livre->titre);
            }
            
            $items[] = [
                'livre' => $livre,
                'quantite' => $details['quantite'],
                'prix' => $livre->prix
            ];
            
            $total += $livre->prix * $details['quantite'];
        }
        
        // Begin transaction
        DB::beginTransaction();
        
        try {
            // Create order
            $commande = Commande::create([
                'user_id' => auth()->id(),
                'total' => $total,
                'statut' => 'en attente',
                'adresse_livraison' => $request->adresse_livraison,
                'methode_paiement' => $request->methode_paiement
            ]);
            
            // Create order details and update stock
            foreach ($items as $item) {
                DetailsCommande::create([
                    'commande_id' => $commande->id,
                    'livre_id' => $item['livre']->id,
                    'quantite' => $item['quantite'],
                    'prix_unitaire' => $item['prix']
                ]);
                
                // Update stock
                $item['livre']->decrement('stock', $item['quantite']);
            }
            
            // Clear cart
            session()->forget('cart');
            
            // Commit transaction
            DB::commit();
            
            return redirect()->route('checkout.success')->with('commande_id', $commande->id);
            
        } catch (\Exception $e) {
            // Rollback transaction on error
            DB::rollBack();
            
            return redirect()->route('cart.index')->with('error', 'Une erreur est survenue lors du traitement de votre commande.');
        }
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
