<?php

namespace Database\Seeders;

use App\Models\Livre;
use App\Models\Categorie;
use App\Helpers\BookCoverHelper;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class LivreSeeder extends Seeder
{
    public function run(): void
    {
        // Create storage link if it doesn't exist
        if (!Storage::disk('public')->exists('images/books')) {
            Storage::disk('public')->makeDirectory('images/books');
        }

        $categories = Categorie::all();
        $realBooks = [
            [
                'libelle' => 'Le Petit Prince',
                'auteur' => 'Antoine de Saint-Exupéry',
                'description' => "Un conte poétique et philosophique sous l'apparence d'un conte pour enfants.",
                'isbn' => '9782070612758',
                'prix' => 80,
                'stock' => 30,
                'editeur' => 'Gallimard',
                'date_publication' => '1943-04-06',
                'image' => null,
            ],
            [
                'libelle' => '1984',
                'auteur' => 'George Orwell',
                'description' => "Un roman d'anticipation sur la surveillance et la liberté.",
                'isbn' => '9780451524935',
                'prix' => 95,
                'stock' => 25,
                'editeur' => 'Secker & Warburg',
                'date_publication' => '1949-06-08',
                'image' => null,
            ],
            [
                'libelle' => "L'Étranger",
                'auteur' => 'Albert Camus',
                'description' => "Un roman sur l'absurdité de la vie et l'aliénation.",
                'isbn' => '9782070360029',
                'prix' => 70,
                'stock' => 20,
                'editeur' => 'Gallimard',
                'date_publication' => '1942-05-19',
                'image' => null,
            ],
            [
                'libelle' => "Harry Potter à l'école des sorciers",
                'auteur' => 'J.K. Rowling',
                'description' => "Le début de la saga du jeune sorcier Harry Potter.",
                'isbn' => '9780747532699',
                'prix' => 120,
                'stock' => 40,
                'editeur' => 'Bloomsbury',
                'date_publication' => '1997-06-26',
                'image' => null,
            ],
            [
                'libelle' => 'Les Misérables',
                'auteur' => 'Victor Hugo',
                'description' => "Une fresque historique et sociale du XIXe siècle.",
                'isbn' => '9782070409181',
                'prix' => 150,
                'stock' => 15,
                'editeur' => 'A. Lacroix, Verboeckhoven & Cie',
                'date_publication' => '1862-04-03',
                'image' => null,
            ],
            [
                'libelle' => 'Le Comte de Monte-Cristo',
                'auteur' => 'Alexandre Dumas',
                'description' => "Un roman d'aventure et de vengeance.",
                'isbn' => '9782070409075',
                'prix' => 130,
                'stock' => 18,
                'editeur' => 'Pétion',
                'date_publication' => '1846-08-28',
                'image' => null,
            ],
            [
                'libelle' => 'Don Quichotte',
                'auteur' => 'Miguel de Cervantes',
                'description' => "Les aventures du célèbre chevalier à la triste figure.",
                'isbn' => '9782070409945',
                'prix' => 110,
                'stock' => 12,
                'editeur' => 'Francisco de Robles',
                'date_publication' => '1605-01-16',
                'image' => null,
            ],
            [
                'libelle' => 'Crime et Châtiment',
                'auteur' => 'Fiodor Dostoïevski',
                'description' => "Un roman psychologique sur la culpabilité et la rédemption.",
                'isbn' => '9782070360536',
                'prix' => 100,
                'stock' => 22,
                'editeur' => 'The Russian Messenger',
                'date_publication' => '1866-01-01',
                'image' => null,
            ],
            [
                'libelle' => 'Les Raisins de la colère',
                'auteur' => 'John Steinbeck',
                'description' => "Un roman sur la Grande Dépression et l'exode des fermiers.",
                'isbn' => '9782070360421',
                'prix' => 90,
                'stock' => 17,
                'editeur' => 'The Viking Press',
                'date_publication' => '1939-04-14',
                'image' => null,
            ],
            [
                'libelle' => 'Cent ans de solitude',
                'auteur' => 'Gabriel García Márquez',
                'description' => "Une saga familiale magique et réaliste.",
                'isbn' => '9782070530434',
                'prix' => 105,
                'stock' => 19,
                'editeur' => 'Editorial Sudamericana',
                'date_publication' => '1967-05-30',
                'image' => null,
            ],
            [
                'libelle' => 'Fahrenheit 451',
                'auteur' => 'Ray Bradbury',
                'description' => "Un roman dystopique sur une société sans livres.",
                'isbn' => '9782070368228',
                'prix' => 85,
                'stock' => 21,
                'editeur' => 'Ballantine Books',
                'date_publication' => '1953-10-19',
                'image' => null,
            ],
            [
                'libelle' => 'La Peste',
                'auteur' => 'Albert Camus',
                'description' => "Un roman sur une épidémie de peste à Oran.",
                'isbn' => '9782070360420',
                'prix' => 90,
                'stock' => 17,
                'editeur' => 'Gallimard',
                'date_publication' => '1947-06-10',
                'image' => null,
            ],
            [
                'libelle' => 'Le Rouge et le Noir',
                'auteur' => 'Stendhal',
                'description' => "Un roman sur l'ascension sociale et la passion.",
                'isbn' => '9782070360024',
                'prix' => 95,
                'stock' => 14,
                'editeur' => 'Levavasseur',
                'date_publication' => '1830-11-01',
                'image' => null,
            ],
            [
                'libelle' => 'Madame Bovary',
                'auteur' => 'Gustave Flaubert',
                'description' => "Un roman sur les illusions et les désillusions d'une femme.",
                'isbn' => '9782070360025',
                'prix' => 100,
                'stock' => 13,
                'editeur' => 'Revue de Paris',
                'date_publication' => '1857-12-01',
                'image' => null,
            ],
            [
                'libelle' => 'Le Seigneur des Anneaux',
                'auteur' => 'J.R.R. Tolkien',
                'description' => "Une épopée fantastique en Terre du Milieu.",
                'isbn' => '9780261102385',
                'prix' => 200,
                'stock' => 10,
                'editeur' => 'Allen & Unwin',
                'date_publication' => '1954-07-29',
                'image' => null,
            ],
        ];

        // Insert real books
        foreach ($realBooks as $book) {
            // Find a category that matches the book's category or get a random one
            $categorie = Categorie::where('nom', $book['categorie'])->first() ?? $categories->random();

            Livre::create(array_merge($book, [
                'categorie_id' => $categorie->id,
                'actif' => 1,
            ]));
        }

        // Fill up to 50 books with generic data
        // for ($i = count($realBooks) + 1; $i <= 50; $i++) {
        //     Livre::create([
        //         'libelle' => "Livre $i",
        //         'auteur' => "Auteur $i",
        //         'description' => "Description détaillée du livre $i. Ce livre raconte une histoire captivante...",
        //         'isbn' => 'ISBN-' . str_pad($i, 10, '0', STR_PAD_LEFT),
        //         'prix' => rand(50, 500),
        //         'stock' => rand(0, 100),
        //         'editeur' => "Éditeur " . rand(1, 5),
        //         'date_publication' => now()->subDays(rand(1, 365)),
        //         'image' => BookCoverHelper::downloadCover('', "book-{$i}.jpg"),
        //         'categorie_id' => $categories->random()->id,
        //         'actif' => 1,
        //     ]);
        // }
    }
}
