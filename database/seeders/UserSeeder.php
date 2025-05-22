<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {
        \App\Models\User::create([
            'nom' => 'Admin',
            'prenom' => 'Super',
            'adresse' => 'Admin Address',
            'email' => 'admin@example.com',
            'password' => Hash::make('admin'),
            'admin' => true,
        ]);
        \App\Models\User::factory()->count(9)->create();
    }
}
