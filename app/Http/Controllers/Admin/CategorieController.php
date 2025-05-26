<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Categorie;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategorieController extends Controller
{
    public function index()
    {
        $categories = Categorie::withCount('livres')->get();

        return Inertia::render('admin/categories', [
            'initialCategories' => $categories,
            'flash' => [
                'newCategory' => session('newCategory'),
                'updatedCategory' => session('updatedCategory'),
                'deletedCategoryId' => session('deletedCategoryId'),
                'success' => session('success'),
                'error' => session('error'),
            ],
        ]);
    }
}
