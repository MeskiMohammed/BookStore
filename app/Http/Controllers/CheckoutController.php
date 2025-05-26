<?php

namespace App\Http\Controllers;

use App\Models\Commande;
use App\Models\DetailsCommande;
use App\Models\Livre;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

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

        try {
            // Check if cart is empty
            if (empty($request->cartItems)) {
                return redirect()->back()->withErrors([
                    'error' => 'Votre panier est vide.'
                ]);
            }

            $validated = $request->validate([
                'firstName' => 'required|string|max:255',
                'lastName' => 'required|string|max:255',
                'email' => 'required|email|max:255',
                'address' => 'required|string|max:255',
                'paymentMethod' => 'required|in:credit_card,paypal',
                'cardNumber' => 'required_if:paymentMethod,credit_card|string|max:19',
                'cardName' => 'required_if:paymentMethod,credit_card|string|max:255',
                'cardExpiry' => 'required_if:paymentMethod,credit_card|string|max:5',
                'cardCvc' => 'required_if:paymentMethod,credit_card|string|max:4',
                'paypalEmail' => 'nullable|email|max:255',
                'cartItems' => 'required|array|min:1',
                'cartItems.*.id' => 'required|exists:livres,id',
                'cartItems.*.quantity' => 'required|integer|min:1',
                'cartItems.*.prix' => 'required|numeric|min:0',
            ]);


            DB::beginTransaction();

            try {
                // Calculate totals
                $subtotal = collect($validated['cartItems'])->sum(function ($item) {
                    return $item['quantity'] * $item['prix'];
                });
                $shipping = 5.99;
                $tax = $subtotal * 0.20; // 20% TVA
                $total = $subtotal + $shipping + $tax;



                // Create order
                $commande = Commande::create([
                    'user_id' => Auth::id(), // This will be null for guest checkout
                    'client_name' => $validated['firstName'] . ' ' . $validated['lastName'],
                    'client_email' => $validated['email'],
                    'client_address' => $validated['address'],
                    'montant_totale' => $total,
                    'statut' => 'en_attente',
                    'methode_paiement' => $validated['paymentMethod'],
                    'paiement_statut' => 'en_attente',
                ]);


                // Create order details and update book stock
                foreach ($validated['cartItems'] as $item) {
                    $livre = Livre::findOrFail($item['id']);

                    if ($livre->stock < $item['quantity']) {
                        throw new \Exception("Stock insuffisant pour le livre: " . $livre->titre);
                    }

                    $sousTotal = $item['quantity'] * $item['prix'];

                    DetailsCommande::create([
                        'commande_id' => $commande->id,
                        'livre_id' => $item['id'],
                        'quantite' => $item['quantity'],
                        'prix_unitaire' => $item['prix'],
                        'sous_total' => $sousTotal,
                    ]);

                    $livre->update([
                        'stock' => $livre->stock - $item['quantity']
                    ]);


                }

                DB::commit();

                // Clear the cart from session
                session()->forget('cart');

                // Store order ID in session for success page
                session(['commande_id' => $commande->id]);

                return redirect()->route('checkout.success');

            } catch (\Exception $e) {
                DB::rollBack();
                throw $e;
            }

        } catch (\Illuminate\Validation\ValidationException $e) {


            return redirect()->back()
                ->withErrors($e->errors())
                ->withInput();

        } catch (\Exception $e) {


            return redirect()->back()
                ->withErrors(['error' => 'Une erreur est survenue lors du traitement de votre commande: ' . $e->getMessage()])
                ->withInput();
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

        $commande = Commande::with(['details_commandes.livre'])->find($commandeId);

        if (!$commande) {
            return redirect()->route('home');
        }

        return Inertia::render('store/checkout-success', [
            'commande' => $commande
        ]);
    }
}
