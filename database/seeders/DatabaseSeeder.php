<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\{Categorie, Livre, User, Commande, DetailsCommande, Avis};

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        Categorie::factory(5)->create();
        User::factory(10)->create();
        Livre::factory(20)->create();
        Commande::factory(15)->create();
        DetailsCommande::factory(40)->create();
        Avis::factory(30)->create();
    }
}
