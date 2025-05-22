<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class AvisSeeder extends Seeder
{
    public function run()
    {
        \App\Models\Avis::factory()->count(20)->create();
    }
}
