<?php

namespace App\Http\Controllers;

use App\Models\Livre;
use App\Models\User;
use App\Models\Commande;
use App\Models\Categorie;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the admin dashboard with statistics and recent data.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        // Basic statistics
        $stats = [
            'totalUsers' => User::count(),
            'totalBooks' => Livre::count(),
            'totalOrders' => Commande::count(),
            'totalCategories' => Categorie::count(),
        ];

        // Latest 5 books
        $recentBooks = Livre::select('id', 'libelle', 'auteur', 'prix', 'image')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        // Latest 5 orders with user relation
        $recentOrders = Commande::with('user')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        return Inertia::render('admin/dashboard', [
            'stats' => $stats,
            'recentData' => [
                'recentBooks' => $recentBooks,
                'recentOrders' => $recentOrders,
            ],
        ]);
    }
}
