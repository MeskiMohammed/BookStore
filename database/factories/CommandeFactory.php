<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class CommandeFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'montant_totale' => $this->faker->randomFloat(2, 20, 500),
            'statut' => $this->faker->randomElement(['pending', 'processing', 'completed', 'cancelled']),
            'methode_paiement' => $this->faker->randomElement(['credit_card', 'paypal', 'bank_transfer', 'cash']),
            'client_name' => $this->faker->name(),
            'client_email' => $this->faker->safeEmail(),
            'client_phone' => $this->faker->phoneNumber(),
            'client_address' => $this->faker->address(),
        ];
    }
}
