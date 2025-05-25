<?php

namespace Database\Factories;

use App\Models\Categorie;
use Illuminate\Database\Eloquent\Factories\Factory;

class CategorieFactory extends Factory
{
    protected $model = Categorie::class;

    protected $categories = [
        [
            'nom' => 'Littérature classique',
            'description' => 'Œuvres majeures de la littérature mondiale qui ont marqué l\'histoire.',
        ],
        [
            'nom' => 'Science-fiction',
            'description' => 'Histoires explorant les possibilités futures de la science et de la technologie.',
        ],
        [
            'nom' => 'Fantasy',
            'description' => 'Récits se déroulant dans des univers magiques avec des créatures mythiques.',
        ],
        [
            'nom' => 'Roman historique',
            'description' => 'Récits fictifs reconstituant des périodes historiques.',
        ],
        [
            'nom' => 'Philosophie',
            'description' => 'Ouvrages explorant les questions existentielles et morales.',
        ],
        [
            'nom' => 'Littérature jeunesse',
            'description' => 'Livres écrits pour les jeunes lecteurs.',
        ],
        [
            'nom' => 'Policier et Thriller',
            'description' => 'Histoires captivantes centrées sur des enquêtes et des mystères.',
        ],
        [
            'nom' => 'Poésie',
            'description' => 'Œuvres exprimant des émotions à travers l\'esthétique du langage.',
        ],
        [
            'nom' => 'Biographie',
            'description' => 'Récits de la vie réelle de personnages importants.',
        ],
        [
            'nom' => 'Littérature contemporaine',
            'description' => 'Œuvres modernes reflétant les préoccupations actuelles.',
        ],
    ];

    public function definition(): array
    {
        $category = $this->faker->unique()->randomElement($this->categories);
        return [
            'nom' => $category['nom'],
            'description' => $category['description'],
        ];
    }
}
