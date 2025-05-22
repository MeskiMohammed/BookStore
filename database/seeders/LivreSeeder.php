<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class LivreSeeder extends Seeder
{
    public function run()
    {
        \App\Models\Livre::factory()->count(20)->create();
    }
}
