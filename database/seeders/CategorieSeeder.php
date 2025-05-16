<?php

namespace Database\Seeders;

use App\Models\Categorie;
use Illuminate\Database\Seeder;

class CategorieSeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            'Fiction',
            'Science Fiction',
            'Mystery',
            'Romance',
            'Fantasy',
            'Biography',
            'History',
            'Business',
            'Self-Help',
            'Science',
            'Technology',
            'Poetry',
            'Drama',
            'Horror',
            'Children\'s Literature',
            'Young Adult',
            'Educational',
            'Philosophy',
            'Art & Photography',
            'Cooking'
        ];

        foreach ($categories as $category) {
            Categorie::create([
                'nom' => $category,
                'description' => "Collection of {$category} books",
                'actif' => true
            ]);
        }
    }
} 