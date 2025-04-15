<?php
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LivresTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('livres')->insert([
            [
                'libelle' => 'Les Étoiles de Demain',
                'description' => 'Un voyage interstellaire captivant.',
                'auteur' => 'Jean Dupuis',
                'isbn' => '9781234567890',
                'prix' => 24.99,
                'stock' => 50,
                'categorie_id' => 1,
                'editeur' => 'Éditions Cosmos',
                'date_publication' => '2022-09-10',
                'image' => 'etoiles.jpg',
                'actif' => 1,
            ],
            [
                'libelle' => 'Le Sortilège de l\'Ombre',
                'description' => 'Une aventure magique dans un royaume oublié.',
                'auteur' => 'Claire Méjean',
                'isbn' => '9780987654321',
                'prix' => 19.50,
                'stock' => 30,
                'categorie_id' => 2,
                'editeur' => 'Plume Magique',
                'date_publication' => '2023-01-15',
                'image' => 'sortilege.jpg',
                'actif' => 1,
            ],
            [
                'libelle' => 'Morts Sans Visage',
                'description' => 'Un thriller haletant.',
                'auteur' => 'Marc Lemoine',
                'isbn' => '9781122334455',
                'prix' => 15.00,
                'stock' => 40,
                'categorie_id' => 3,
                'editeur' => 'Noir sur Blanc',
                'date_publication' => '2021-11-20',
                'image' => 'thriller.jpg',
                'actif' => 1,
            ],
        ]);
    }
}
