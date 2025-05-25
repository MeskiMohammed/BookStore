<?php

namespace Database\Factories;

use App\Models\Categorie;
use App\Models\Livre;
use Illuminate\Database\Eloquent\Factories\Factory;

class LivreFactory extends Factory
{
    protected $model = Livre::class;

    protected $books = [
        [
            'libelle' => 'Le Petit Prince',
            'description' => 'Un conte poétique et philosophique sous l\'apparence d\'un livre pour enfants. Le Petit Prince raconte l\'histoire d\'un aviateur qui, après une panne de moteur dans le désert du Sahara, rencontre un petit prince venu d\'une autre planète.',
            'auteur' => 'Antoine de Saint-Exupéry',
            'isbn' => '9782070612758',
            'prix' => 12.90,
            'stock' => 50,
            'editeur' => 'Gallimard',
            'date_publication' => '1943-04-06',
            'image' => 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=300&fit=crop',
            'categorie' => 'Littérature jeunesse',
        ],
        [
            'libelle' => '1984',
            'description' => 'Dans une société totalitaire, Winston Smith travaille au ministère de la Vérité où il réécrit l\'histoire. Mais il commence à douter du système et à rêver de liberté.',
            'auteur' => 'George Orwell',
            'isbn' => '9782070379179',
            'prix' => 9.90,
            'stock' => 35,
            'editeur' => 'Gallimard',
            'date_publication' => '1949-06-08',
            'image' => 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=200&h=300&fit=crop',
            'categorie' => 'Science-fiction',
        ],
        [
            'libelle' => 'L\'Étranger',
            'description' => 'Meursault, un employé de bureau algérois, apprend la mort de sa mère. Le jour de l\'enterrement, il ne pleure pas. Le lendemain, il va nager, rencontre une ancienne collègue, Marie, et va voir un film comique avec elle.',
            'auteur' => 'Albert Camus',
            'isbn' => '9780679720201',
            'prix' => 8.90,
            'stock' => 40,
            'editeur' => 'Gallimard',
            'date_publication' => '1942-05-19',
            'image' => 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=200&h=300&fit=crop',
            'categorie' => 'Littérature classique',
        ],
        [
            'libelle' => 'Harry Potter à l\'école des sorciers',
            'description' => 'Le jour de ses onze ans, Harry Potter, un orphelin élevé par un oncle et une tante qui le détestent, voit son existence bouleversée. Un géant vient le chercher pour l\'emmener à Poudlard, une école de sorcellerie.',
            'auteur' => 'J.K. Rowling',
            'isbn' => '9782070541270',
            'prix' => 24.90,
            'stock' => 60,
            'editeur' => 'Gallimard Jeunesse',
            'date_publication' => '1997-06-26',
            'image' => 'https://images.unsplash.com/photo-1600189261867-30e5ffe7b8da?w=200&h=300&fit=crop',
            'categorie' => 'Fantasy',
        ],
        [
            'libelle' => 'Les Misérables',
            'description' => 'Dans le Paris du XIXe siècle, Jean Valjean, ancien forçat, tente de se racheter. Il croise le chemin de Fantine, une jeune femme qui a dû abandonner sa fille Cosette.',
            'auteur' => 'Victor Hugo',
            'isbn' => '9782070409227',
            'prix' => 15.90,
            'stock' => 30,
            'editeur' => 'Gallimard',
            'date_publication' => '1862-01-01',
            'image' => 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&h=300&fit=crop',
            'categorie' => 'Littérature classique',
        ],
        [
            'libelle' => 'Le Comte de Monte-Cristo',
            'description' => 'En 1815, Edmond Dantès, jeune marin, est accusé à tort de bonapartisme et emprisonné au château d\'If. Après quatorze années, il s\'évade, s\'empare du trésor de l\'île de Monte-Cristo et entreprend de se venger.',
            'auteur' => 'Alexandre Dumas',
            'isbn' => '9782070413118',
            'prix' => 14.90,
            'stock' => 25,
            'editeur' => 'Gallimard',
            'date_publication' => '1844-08-28',
            'image' => 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=200&h=300&fit=crop',
            'categorie' => 'Roman historique',
        ],
        [
            'libelle' => 'Don Quichotte',
            'description' => 'Alonso Quichano, un gentilhomme de la Manche, devient fou en lisant trop de romans de chevalerie. Il se prend pour un chevalier errant et part à l\'aventure avec son écuyer Sancho Panza.',
            'auteur' => 'Miguel de Cervantes',
            'isbn' => '9782070413119',
            'prix' => 13.90,
            'stock' => 20,
            'editeur' => 'Gallimard',
            'date_publication' => '1605-01-16',
            'image' => 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=300&fit=crop',
            'categorie' => 'Littérature classique',
        ],
        [
            'libelle' => 'Crime et Châtiment',
            'description' => 'Raskolnikov, un étudiant pauvre de Saint-Pétersbourg, assassine une vieille prêteuse sur gages et sa sœur. Rongé par la culpabilité, il finit par se dénoncer.',
            'auteur' => 'Fiodor Dostoïevski',
            'isbn' => '9782070413110',
            'prix' => 11.90,
            'stock' => 15,
            'editeur' => 'Gallimard',
            'date_publication' => '1866-01-01',
            'image' => 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=200&h=300&fit=crop',
            'categorie' => 'Littérature classique',
        ],
        [
            'libelle' => 'Les Raisins de la colère',
            'description' => 'Dans les années 1930, la famille Joad, chassée de ses terres par la sécheresse et la Grande Dépression, part en Californie à la recherche d\'une vie meilleure.',
            'auteur' => 'John Steinbeck',
            'isbn' => '9782070413111',
            'prix' => 10.90,
            'stock' => 18,
            'editeur' => 'Gallimard',
            'date_publication' => '1939-04-14',
            'image' => 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&h=300&fit=crop',
            'categorie' => 'Littérature classique',
        ],
        [
            'libelle' => 'Cent ans de solitude',
            'description' => 'L\'histoire de la famille Buendía sur sept générations dans le village imaginaire de Macondo, fondé par José Arcadio Buendía.',
            'auteur' => 'Gabriel García Márquez',
            'isbn' => '9782070413112',
            'prix' => 9.90,
            'stock' => 22,
            'editeur' => 'Gallimard',
            'date_publication' => '1967-05-30',
            'image' => 'https://images.unsplash.com/photo-1600189261867-30e5ffe7b8da?w=200&h=300&fit=crop',
            'categorie' => 'Littérature contemporaine',
        ],
    ];

    public function definition(): array
    {
        $book = $this->faker->unique()->randomElement($this->books);
        $categorie = Categorie::where('nom', $book['categorie'])->first();

        return [
            'libelle' => $book['libelle'],
            'description' => $book['description'],
            'auteur' => $book['auteur'],
            'isbn' => $book['isbn'],
            'prix' => $book['prix'],
            'stock' => $book['stock'],
            'categorie_id' => $categorie->id,
            'editeur' => $book['editeur'],
            'date_publication' => $book['date_publication'],
            'image' => $book['image'],
            'actif' => true,
        ];
    }
}
