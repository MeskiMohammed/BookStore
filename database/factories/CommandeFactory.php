<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class CommandeFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::inRandomOrder()->first()->id ?? User::factory(),
            'montant_totale' => $this->faker->randomFloat(2, 20, 500),
            'statut' => $this->faker->randomElement(['en_attente', 'payee', 'livree']),
            'methode_paiement' => $this->faker->randomElement(['carte', 'paypal', 'espece']),
        ];
    }
}
