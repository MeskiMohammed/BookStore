<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CategorieFactory extends Factory
{
    public function definition(): array
    {
        return [
            'Nom' => $this->faker->word(),
            'Description' => $this->faker->sentence(),
        ];
    }
}
