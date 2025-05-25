<?php

namespace Database\Seeders;

use App\Models\Avis;
use Illuminate\Database\Seeder;

class AvisSeeder extends Seeder
{
    public function run(): void
    {
        // Create 50 reviews
        Avis::factory()->count(50)->create();
    }
}
