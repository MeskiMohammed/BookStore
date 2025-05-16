<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Database\Seeders\AvisTableSeeder;
use Database\Seeders\CategoriesTableSeeder;
use Database\Seeders\CommandesTableSeeder;
use Database\Seeders\DetailsCommandesTableSeeder;
use Illuminate\Database\Seeder;
use Database\Seeders\LivresTableSeeder;
use Database\Seeders\UsersTableSeeder;
use Database\Seeders\CategorieSeeder;
use Database\Seeders\LivreSeeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            CategorieSeeder::class,
            LivreSeeder::class,
            CategoriesTableSeeder::class,
            UsersTableSeeder::class,
            LivresTableSeeder::class,
            CommandesTableSeeder::class,
            DetailsCommandesTableSeeder::class,
            AvisTableSeeder::class,
        ]);
    }
}
