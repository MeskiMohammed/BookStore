<?php

namespace Database\Seeders;


use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoriesTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('categories')->insert([
            ['Nom' => 'Science-fiction', 'Description' => 'Univers futuristes, technologies avancées.'],
            ['Nom' => 'Fantasy', 'Description' => 'Magie, royaumes imaginaires.'],
            ['Nom' => 'Policier', 'Description' => 'Enquêtes, mystères à résoudre.'],
            ['Nom' => 'Romance', 'Description' => 'Histoires d\'amour.'],
            ['Nom' => 'Développement personnel', 'Description' => 'Livres pour s’améliorer au quotidien.'],
        ]);
    }
}
