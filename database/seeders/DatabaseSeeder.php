<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\CategoriesTableSeeder;
use Database\Seeders\UsersTableSeeder;
use Database\Seeders\LivresTableSeeder;
use Database\Seeders\CommandesTableSeeder;
use Database\Seeders\DetailsCommandesTableSeeder;
use Database\Seeders\AvisTableSeeder;

class DatabaseSeeder extends Seeder
{
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
