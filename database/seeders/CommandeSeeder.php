<?php

namespace Database\Seeders;

use App\Models\Commande;
use Illuminate\Database\Seeder;

class CommandeSeeder extends Seeder
{
    public function run(): void
    {
        // Create 20 orders with their details
        Commande::factory()
            ->count(20)
            ->has(\App\Models\DetailsCommande::factory()->count(3))
            ->create();
    }
}
