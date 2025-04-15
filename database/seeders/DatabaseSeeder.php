<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use AvisTableSeeder;
use CategoriesTableSeeder;
use CommandesTableSeeder;
use DetailsCommandesTableSeeder;
use Illuminate\Database\Seeder;
use LivresTableSeeder;
use UsersTableSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            CategoriesTableSeeder::class,
            UsersTableSeeder::class,
            LivresTableSeeder::class,
            CommandesTableSeeder::class,
            DetailsCommandesTableSeeder::class,
            AvisTableSeeder::class,
        ]);
    }
}
