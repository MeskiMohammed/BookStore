<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

class BookCoverHelper
{
    private static $placeholderBase64 = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMjAwIDMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2YzZjRmNiIvPjx0ZXh0IHg9IjEwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM2YjcyODAiPkJvb2sgQ292ZXI8L3RleHQ+PC9zdmc+';

    public static function downloadCover($isbn, $filename)
    {
        try {
            // Google Books API endpoint
            $response = Http::get("https://www.googleapis.com/books/v1/volumes?q=isbn:{$isbn}");

            if ($response->successful()) {
                $data = $response->json();

                if (isset($data['items'][0]['volumeInfo']['imageLinks']['thumbnail'])) {
                    $imageUrl = $data['items'][0]['volumeInfo']['imageLinks']['thumbnail'];

                    // Download the image
                    $imageContent = Http::get($imageUrl)->body();

                    // Save to public directory
                    $path = "images/books/{$filename}";
                    Storage::disk('public')->put($path, $imageContent);

                    return "/storage/{$path}";
                }
            }

            // If no cover found or error occurred, use base64 placeholder
            return self::$placeholderBase64;
        } catch (\Exception $e) {
            // If any error occurs, use base64 placeholder
            return self::$placeholderBase64;
        }
    }
}
