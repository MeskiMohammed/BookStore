<?php

namespace Database\Seeders;

use App\Models\Livre;
use App\Models\Categorie;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

class LivreSeeder extends Seeder
{
    private function fetchBooksByCategory(string $category, int $maxBooks = 5): array
    {
        $response = Http::get('https://www.googleapis.com/books/v1/volumes', [
            'q' => "subject:{$category}",
            'maxResults' => $maxBooks,
            'langRestrict' => 'fr',
            'orderBy' => 'relevance',
            'printType' => 'books'
        ]);

        if (!$response->successful()) {
            return [];
        }

        return $response->json()['items'] ?? [];
    }

    private function downloadImage($imageUrl): ?string
    {
        try {
            $response = Http::get($imageUrl);
            if ($response->successful()) {
                $filename = 'books/' . uniqid() . '.jpg';
                Storage::disk('public')->put($filename, $response->body());
                return $filename;
            }
        } catch (\Exception $e) {
            \Log::error("Error downloading image: " . $e->getMessage());
        }
        return null;
    }

    private function getIsbn($volumeInfo): ?string
    {
        $identifiers = $volumeInfo['industryIdentifiers'] ?? [];
        foreach ($identifiers as $identifier) {
            if (in_array($identifier['type'] ?? '', ['ISBN_13', 'ISBN_10'])) {
                return $identifier['identifier'];
            }
        }
        return null;
    }

    public function run(): void
    {
        $categories = Categorie::all();
        
        foreach ($categories as $category) {
            $books = $this->fetchBooksByCategory($category->nom);
            
            foreach ($books as $book) {
                $volumeInfo = $book['volumeInfo'] ?? [];
                
                // Skip if essential information is missing
                if (empty($volumeInfo['title']) || empty($volumeInfo['authors'])) {
                    continue;
                }

                $imageUrl = $volumeInfo['imageLinks']['thumbnail'] ?? null;
                $imagePath = null;
                
                if ($imageUrl) {
                    $imagePath = $this->downloadImage($imageUrl);
                }

                // Get ISBN (prefer ISBN-13, fallback to ISBN-10)
                $isbn = $this->getIsbn($volumeInfo);

                try {
                    Livre::create([
                        'libelle' => $volumeInfo['title'],
                        'description' => $volumeInfo['description'] ?? 'Aucune description disponible.',
                        'auteur' => implode(', ', $volumeInfo['authors']),
                        'prix' => rand(999, 4999) / 100, // Random price between 9.99 and 49.99
                        'image' => $imagePath,
                        'categorie_id' => $category->id,
                        'actif' => true,
                        'stock' => rand(10, 100),
                        'isbn' => $isbn,
                        'date_publication' => substr($volumeInfo['publishedDate'] ?? date('Y-m-d'), 0, 10),
                        'editeur' => $volumeInfo['publisher'] ?? 'Éditeur inconnu'
                    ]);

                    // Add a small delay to avoid hitting API rate limits
                    sleep(1);
                } catch (\Exception $e) {
                    \Log::error("Error creating book: " . $e->getMessage());
                    continue;
                }
            }
        }
    }
} 