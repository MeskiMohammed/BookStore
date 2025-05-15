<?php

namespace App\Http\Controllers;

use App\Models\Livre;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    /**
     * Display the cart page.
     */
    public function index()
    {
        // Get cart items from session
        $cartItems = session()->get('cart', []);
        $items = [];
        $total = 0;
        
        // Fetch book details for each cart item
        if (!empty($cartItems)) {
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
        }
        
        return Inertia::render('store/cart', [
            'cartItems' => $items,
            'total' => $total
        ]);
    }

    /**
     * Get cart items (for API).
     */
    public function getItems()
    {
        $cartItems = session()->get('cart', []);
        $items = [];
        $total = 0;
        
        if (!empty($cartItems)) {
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
        }
        
        return response()->json([
            'items' => $items,
            'total' => $total,
            'count' => count($items)
        ]);
    }

    /**
     * Add an item to the cart.
     */
    public function addItem(Request $request)
    {
        $request->validate([
            'livre_id' => 'required|exists:livres,id',
            'quantite' => 'required|integer|min:1'
        ]);
        
        $id = $request->livre_id;
        $quantite = $request->quantite;
        
        // Get the book to check stock
        $livre = Livre::find($id);
        if (!$livre) {
            return response()->json(['error' => 'Livre non trouvé.'], 404);
        }
        
        // Check if there's enough stock
        if ($livre->stock < $quantite) {
            return response()->json(['error' => 'Stock insuffisant.'], 400);
        }
        
        // Get cart from session
        $cart = session()->get('cart', []);
        
        // Check if item already exists in cart
        if (isset($cart[$id])) {
            // Update quantity if it doesn't exceed stock
            $newQuantity = $cart[$id]['quantite'] + $quantite;
            if ($newQuantity > $livre->stock) {
                return response()->json(['error' => 'Stock insuffisant.'], 400);
            }
            $cart[$id]['quantite'] = $newQuantity;
        } else {
            // Add new item to cart
            $cart[$id] = [
                'quantite' => $quantite
            ];
        }
        
        // Update cart in session
        session()->put('cart', $cart);
        
        return response()->json([
            'message' => 'Produit ajouté au panier.',
            'count' => count($cart)
        ]);
    }

    /**
     * Update cart item quantity.
     */
    public function updateItem(Request $request)
    {
        $request->validate([
            'livre_id' => 'required|exists:livres,id',
            'quantite' => 'required|integer|min:1'
        ]);
        
        $id = $request->livre_id;
        $quantite = $request->quantite;
        
        // Get the book to check stock
        $livre = Livre::find($id);
        if (!$livre) {
            return response()->json(['error' => 'Livre non trouvé.'], 404);
        }
        
        // Check if there's enough stock
        if ($livre->stock < $quantite) {
            return response()->json(['error' => 'Stock insuffisant.'], 400);
        }
        
        // Get cart from session
        $cart = session()->get('cart', []);
        
        // Update quantity if item exists
        if (isset($cart[$id])) {
            $cart[$id]['quantite'] = $quantite;
            session()->put('cart', $cart);
            return response()->json(['message' => 'Quantité mise à jour.']);
        }
        
        return response()->json(['error' => 'Produit non trouvé dans le panier.'], 404);
    }

    /**
     * Remove an item from the cart.
     */
    public function removeItem(Request $request)
    {
        $request->validate([
            'livre_id' => 'required|exists:livres,id'
        ]);
        
        $id = $request->livre_id;
        
        // Get cart from session
        $cart = session()->get('cart', []);
        
        // Remove item if it exists
        if (isset($cart[$id])) {
            unset($cart[$id]);
            session()->put('cart', $cart);
            return response()->json(['message' => 'Produit retiré du panier.']);
        }
        
        return response()->json(['error' => 'Produit non trouvé dans le panier.'], 404);
    }

    /**
     * Clear the cart.
     */
    public function clearCart()
    {
        session()->forget('cart');
        return response()->json(['message' => 'Panier vidé.']);
    }
}
