<?php

namespace App\Http\Controllers;

use App\Models\Livre;
use App\Models\User;
use App\Models\Commande;
use App\Models\Categorie;
use App\Models\Avis;
use App\Models\DetailsCommande;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Carbon\Carbon;

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
        $stats = $this->getBasicStats();

        // Recent data
        $recentData = $this->getRecentData();

        // Chart data
        $chartData = $this->getChartData();

        // Performance data
        $performanceData = $this->getPerformanceData();

        return Inertia::render('admin/dashboard', [
            'stats' => $stats,
            'recentData' => $recentData,
            'chartData' => $chartData,
            'performanceData' => $performanceData,
        ]);
    }

    /**
     * Get basic statistics for the dashboard.
     *
     * @return array
     */
    private function getBasicStats()
    {
        // Total counts
        $totalUsers = User::count();
        $totalBooks = Livre::count();
        $totalOrders = Commande::count();
        $totalCategories = Categorie::count();
        $totalReviews = Avis::count();

        // Revenue statistics
        $totalRevenue = Commande::where('statut', 'completed')
            ->sum('montant_totale');

        $monthlyRevenue = Commande::where('statut', 'completed')
            ->whereMonth('created_at', Carbon::now()->month)
            ->whereYear('created_at', Carbon::now()->year)
            ->sum('montant_totale');

        // Stock statistics
        $lowStockCount = Livre::where('stock', '<', 10)->count();
        $outOfStockCount = Livre::where('stock', 0)->count();

        // Order statistics
        $pendingOrdersCount = Commande::where('statut', 'en attente')->count();

        return [
            'totalUsers' => $totalUsers,
            'totalBooks' => $totalBooks,
            'totalOrders' => $totalOrders,
            'totalCategories' => $totalCategories,
            'totalReviews' => $totalReviews,
            'totalRevenue' => $totalRevenue,
            'monthlyRevenue' => $monthlyRevenue,
            'lowStockCount' => $lowStockCount,
            'outOfStockCount' => $outOfStockCount,
            'pendingOrdersCount' => $pendingOrdersCount,
        ];
    }

    /**
     * Get recent data for the dashboard.
     *
     * @return array
     */
    private function getRecentData()
    {
        // Recent orders
        $recentOrders = Commande::with('user')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        // Recent users
        $recentUsers = User::orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        // Recent reviews
        $recentReviews = Avis::with(['user', 'livre'])
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        return [
            'recentOrders' => $recentOrders,
            'recentUsers' => $recentUsers,
            'recentReviews' => $recentReviews,
        ];
    }

    /**
     * Get chart data for the dashboard.
     *
     * @return array
     */
    private function getChartData()
    {
        // Sales data for the last 7 days
        $dailySales = $this->getDailySalesData();

        // Monthly sales for the current year
        $monthlySales = $this->getMonthlySalesData();

        // Category distribution
        $categoryDistribution = $this->getCategoryDistribution();

        // Order status distribution
        $orderStatusDistribution = $this->getOrderStatusDistribution();

        return [
            'dailySales' => $dailySales,
            'monthlySales' => $monthlySales,
            'categoryDistribution' => $categoryDistribution,
            'orderStatusDistribution' => $orderStatusDistribution,
        ];
    }

    /**
     * Get performance data for the dashboard.
     *
     * @return array
     */
    private function getPerformanceData()
    {
        // Top selling books
        $topSellingBooks = $this->getTopSellingBooks();

        // Top categories
        $topCategories = $this->getTopCategories();

        // Top customers
        $topCustomers = $this->getTopCustomers();

        return [
            'topSellingBooks' => $topSellingBooks,
            'topCategories' => $topCategories,
            'topCustomers' => $topCustomers,
        ];
    }

    /**
     * Get daily sales data for the last 7 days.
     *
     * @return array
     */
    private function getDailySalesData()
    {
        $startDate = Carbon::now()->subDays(6)->startOfDay();
        $endDate = Carbon::now()->endOfDay();

        $salesData = Commande::select(
                DB::raw('DATE(created_at) as date'),
                DB::raw('SUM(montant_totale) as total'),
                DB::raw('COUNT(*) as count')
            )
            ->whereBetween('created_at', [$startDate, $endDate])
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        // Fill in missing dates with zero values
        $result = [];
        for ($i = 0; $i < 7; $i++) {
            $date = Carbon::now()->subDays(6 - $i)->format('Y-m-d');
            $dayData = $salesData->firstWhere('date', $date);

            $result[] = [
                'date' => $date,
                'total' => $dayData ? $dayData->total : 0,
                'count' => $dayData ? $dayData->count : 0,
            ];
        }

        return $result;
    }

    /**
     * Get monthly sales data for the current year.
     *
     * @return array
     */
    private function getMonthlySalesData()
    {
        $currentYear = Carbon::now()->year;

        $salesData = Commande::select(
                DB::raw('MONTH(created_at) as month'),
                DB::raw('SUM(montant_totale) as total'),
                DB::raw('COUNT(*) as count')
            )
            ->whereYear('created_at', $currentYear)
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        // Fill in all months with zero values if no data
        $result = [];
        for ($month = 1; $month <= 12; $month++) {
            $monthData = $salesData->firstWhere('month', $month);

            $result[] = [
                'month' => $month,
                'monthName' => Carbon::create($currentYear, $month, 1)->format('F'),
                'total' => $monthData ? $monthData->total : 0,
                'count' => $monthData ? $monthData->count : 0,
            ];
        }

        return $result;
    }

    /**
     * Get category distribution data.
     *
     * @return array
     */
    private function getCategoryDistribution()
    {
        return Categorie::withCount('livres')
            ->orderBy('livres_count', 'desc')
            ->get()
            ->map(function ($category) {
                return [
                    'name' => $category->nom,
                    'count' => $category->livres_count,
                ];
            });
    }

    /**
     * Get order status distribution data.
     *
     * @return array
     */
    private function getOrderStatusDistribution()
    {
        return Commande::select('statut', DB::raw('count(*) as count'))
            ->groupBy('statut')
            ->get()
            ->map(function ($status) {
                return [
                    'status' => $status->statut,
                    'count' => $status->count,
                ];
            });
    }

    /**
     * Get top selling books.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    private function getTopSellingBooks()
    {
        return Livre::select('livres.*', DB::raw('SUM(details_commandes.quantite) as total_sold'))
            ->join('details_commandes', 'livres.id', '=', 'details_commandes.livre_id')
            ->groupBy('livres.id')
            ->orderBy('total_sold', 'desc')
            ->limit(5)
            ->get();
    }

    /**
     * Get top categories by sales.
     *
     * @return array
     */
    private function getTopCategories()
    {
        return Categorie::select('categories.*', DB::raw('SUM(details_commandes.quantite) as total_sold'))
            ->join('livres', 'categories.id', '=', 'livres.categorie_id')
            ->join('details_commandes', 'livres.id', '=', 'details_commandes.livre_id')
            ->groupBy('categories.id')
            ->orderBy('total_sold', 'desc')
            ->limit(5)
            ->get();
    }

    /**
     * Get top customers by purchase amount.
     *
     * @return array
     */
    private function getTopCustomers()
    {
        return User::select('users.*', DB::raw('SUM(commandes.montant_totale) as total_spent'), DB::raw('COUNT(commandes.id) as order_count'))
            ->join('commandes', 'users.id', '=', 'commandes.user_id')
            ->groupBy('users.id')
            ->orderBy('total_spent', 'desc')
            ->limit(5)
            ->get();
    }
}
