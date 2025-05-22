<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DetailsCommandeSeeder extends Seeder
{
    public function run()
    {
        \App\Models\DetailsCommande::factory()->count(30)->create();
    }
}
