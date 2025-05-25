<?php

namespace Database\Seeders;

use App\Models\Categorie;
use Illuminate\Database\Seeder;

class CategorieSeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            'Roman', 'Science-Fiction', 'Fantasy', 'Policier', 'Thriller',
            'Biographie', 'Histoire', 'Philosophie', 'Psychologie', 'Sociologie',
            'Économie', 'Politique', 'Droit', 'Médecine', 'Sciences',
            'Mathématiques', 'Informatique', 'Technologie', 'Art', 'Musique',
            'Cinéma', 'Photographie', 'Cuisine', 'Voyage', 'Sport',
            'Jeunesse', 'Bande Dessinée', 'Poésie', 'Théâtre', 'Essai',
            'Développement Personnel', 'Spiritualité', 'Religion', 'Mythologie', 'Légendes',
            'Langues', 'Éducation', 'Pédagogie', 'Littérature Classique', 'Littérature Moderne',
            'Polar', 'Horreur', 'Romance', 'Érotisme', 'Humour',
            'Comics', 'Manga', 'Graphic Novel', 'Nouvelle', 'Conte'
        ];

        foreach ($categories as $index => $categorie) {
            Categorie::create([
                'nom' => $categorie,
                'description' => "Description de la catégorie $categorie",
                'image' => '/placeholder.svg',
                'ordre' => $index + 1,
            ]);
        }
    }
}
