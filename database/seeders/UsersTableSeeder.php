<?php

namespace Database\Seeders;


use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('users')->insert([
            [
                'Nom' => 'Meski',
                'Prenom' => 'Mohammed',
                'Adresse' => '12 Rue des Lilas, Paris',
                'Email' => 'mohammed.meski@example.com',
                'Password' => Hash::make('password123'),
            ],
            [
                'Nom' => 'Ait Ali',
                'Prenom' => 'Zakaria',
                'Adresse' => '8 Avenue Victor Hugo, Lyon',
                'Email' => 'zakarua.aitali@example.com',
                'Password' => Hash::make('monsecret'),
            ],
            [
                'Nom' => 'Chahboun',
                'Prenom' => 'Houda',
                'Adresse' => '45 Boulevard Haussmann, Paris',
                'Email' => 'houda.chahboun@example.com',
                'Password' => Hash::make('houda2024'),
            ],
        ]);
    }
}
