<?php

namespace App\Http\Controllers;

use App\Models\DetailsCommande;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DetailsCommandeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        $search = $request->input('search', '');
        $sort = $request->input('sort', 'created_at');
        $direction = $request->input('direction', 'desc');
        $perPage = $request->input('perPage', 10);
        $commande_id = $request->input('commande_id', '');

        $detailsCommandes = DetailsCommande::with(['commande.user', 'livre'])
            ->when($search, function ($query, $search) {
                return $query->whereHas('livre', function ($q) use ($search) {
                    $q->where('libelle', 'like', "%{$search}%");
                })
                ->orWhereHas('commande.user', function ($q) use ($search) {
                    $q->where('nom', 'like', "%{$search}%")
                      ->orWhere('prenom', 'like', "%{$search}%")
                      ->orWhere('email', 'like', "%{$search}%");
                });
            })
            ->when($commande_id, function ($query, $commande_id) {
                return $query->where('commande_id', $commande_id);
            })
            ->orderBy($sort, $direction)
            ->paginate($perPage)
            ->withQueryString();

        return Inertia::render('admin/order-details', [
            'detailsCommandes' => $detailsCommandes,
            'filters' => [
                'search' => $search,
                'sort' => $sort,
                'direction' => $direction,
                'perPage' => $perPage,
                'commande_id' => $commande_id,
            ],
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\DetailsCommande  $detailsCommande
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(DetailsCommande $detailsCommande)
    {
        $detailsCommande->load(['commande.user', 'livre']);
        
        return response()->json([
            'detailsCommande' => $detailsCommande,
        ]);
    }
}
