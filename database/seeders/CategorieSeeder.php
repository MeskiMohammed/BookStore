<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class CategorieSeeder extends Seeder
{
    public function run()
    {
        \App\Models\Categorie::factory()->count(5)->create();
    }
}
