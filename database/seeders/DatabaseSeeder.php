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
use Database\Seeders\UserSeeder;
use Database\Seeders\CommandeSeeder;
use Database\Seeders\DetailsCommandeSeeder;
use Database\Seeders\AvisSeeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            CategorieSeeder::class,
            LivreSeeder::class,
            CommandeSeeder::class,
            DetailsCommandeSeeder::class,
            AvisSeeder::class,
        ]);
    }
}
