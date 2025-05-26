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
        $cart = session()->get('cart', []);
        return response()->json([
            'cart' => $cart,
            'flash' => session('flash')
        ]);
    }

    /**
     * Add an item to the cart.
     */
    public function add(Request $request)
    {
        $product = $request->all();
        $cart = session()->get('cart', []);

        if (isset($cart[$product['id']])) {
            $cart[$product['id']]['quantity'] += $product['quantity'] ?? 1;
            $message = "Quantité mise à jour pour {$product['libelle']}";
        } else {
            $cart[$product['id']] = [
                'id' => $product['id'],
                'libelle' => $product['libelle'],
                'prix' => $product['prix'],
                'image' => $product['image'],
                'auteur' => $product['auteur'],
                'quantity' => $product['quantity'] ?? 1,
                'titre' => $product['libelle']
            ];
            $message = "{$product['libelle']} ajouté au panier";
        }

        session()->put('cart', $cart);
        session()->flash('flash', [
            'type' => 'success',
            'message' => $message
        ]);

        return response()->json([
            'cart' => $cart,
            'flash' => session('flash')
        ]);
    }

    /**
     * Update cart item quantity.
     */
    public function update(Request $request, $id)
    {
        $cart = session()->get('cart', []);
        $quantity = $request->input('quantity');

        if ($quantity <= 0) {
            $item = $cart[$id] ?? null;
            unset($cart[$id]);
            $message = $item ? "{$item['libelle']} retiré du panier" : "Produit retiré du panier";
        } else {
            $cart[$id]['quantity'] = $quantity;
            $message = "Quantité mise à jour pour {$cart[$id]['libelle']}";
        }

        session()->put('cart', $cart);
        session()->flash('flash', [
            'type' => 'success',
            'message' => $message
        ]);

        return response()->json([
            'cart' => $cart,
            'flash' => session('flash')
        ]);
    }

    /**
     * Remove an item from the cart.
     */
    public function remove($id)
    {
        $cart = session()->get('cart', []);
        $item = $cart[$id] ?? null;
        unset($cart[$id]);

        session()->put('cart', $cart);
        session()->flash('flash', [
            'type' => 'info',
            'message' => $item ? "{$item['libelle']} retiré du panier" : "Produit retiré du panier"
        ]);

        return response()->json([
            'cart' => $cart,
            'flash' => session('flash')
        ]);
    }

    /**
     * Clear the cart.
     */
    public function clear()
    {
        session()->forget('cart');
        session()->flash('flash', [
            'type' => 'info',
            'message' => 'Le panier a été vidé'
        ]);

        return response()->json([
            'cart' => [],
            'flash' => session('flash')
        ]);
    }
}
