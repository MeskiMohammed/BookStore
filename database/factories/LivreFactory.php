<?php

namespace Database\Factories;

use App\Models\Categorie;
use Illuminate\Database\Eloquent\Factories\Factory;

class LivreFactory extends Factory
{
    public function definition(): array
    {
        return [
            'libelle' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph(),
            'auteur' => $this->faker->name(),
            'isbn' => $this->faker->isbn13(),
            'prix' => $this->faker->randomFloat(2, 5, 100),
            'stock' => $this->faker->numberBetween(10, 100),
            'categorie_id' => Categorie::inRandomOrder()->first()->id ?? Categorie::factory(),
            'editeur' => $this->faker->company(),
            'date_publication' => $this->faker->date(),
            'image' => $this->faker->imageUrl(),
            'actif' => 1,
        ];
    }
}
