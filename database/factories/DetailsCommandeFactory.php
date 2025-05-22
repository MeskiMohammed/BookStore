<?php

namespace Database\Factories;

use App\Models\Commande;
use App\Models\Livre;
use Illuminate\Database\Eloquent\Factories\Factory;

class DetailsCommandeFactory extends Factory
{
    public function definition(): array
    {
        return [
            'commande_id' => Commande::factory(),
            'livre_id' => Livre::factory(),
            'quantite' => $this->faker->numberBetween(1, 5),
            'prix' => $this->faker->randomFloat(2, 10, 200),
        ];
    }
}
