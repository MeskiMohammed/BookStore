<?php

namespace Database\Seeders;


use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DetailsCommandesTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('details_commandes')->insert([
            [
                'commande_id' => 1,
                'livre_id' => 1,
                'quantite' => 2,
                'prix' => 24.99,
            ],
            [
                'commande_id' => 2,
                'livre_id' => 2,
                'quantite' => 1,
                'prix' => 19.50,
            ],
        ]);
    }
}
