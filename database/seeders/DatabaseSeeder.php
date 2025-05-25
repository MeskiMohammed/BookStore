<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Database\Seeders\CategorieSeeder;
use Database\Seeders\LivreSeeder;
use Database\Seeders\UserSeeder;
use Database\Seeders\AvisSeeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create admin user
        User::factory()->create([
            'nom' => 'Admin',
            'prenom' => 'User',
            'adresse' => '123 Admin Street',
            'email' => 'admin@bookstore.com',
            'password' => Hash::make('password'),
            'admin' => true,
        ]);

        // Create regular user
        User::factory()->create([
            'nom' => 'User',
            'prenom' => 'Regular',
            'adresse' => '456 User Street',
            'email' => 'user@bookstore.com',
            'password' => Hash::make('password'),
            'admin' => false,
        ]);

        // Create additional random users
        User::factory(3)->create();

        // Call individual seeders in the correct order
        $this->call([
            UserSeeder::class,      // First create users
            CategorieSeeder::class, // Then categories
            LivreSeeder::class,     // Then books
            AvisSeeder::class,      // Finally reviews
        ]);
    }
}
