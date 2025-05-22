<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class CommandeSeeder extends Seeder
{
    public function run()
    {
        \App\Models\Commande::factory()->count(10)->create();
    }
}
