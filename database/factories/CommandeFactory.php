<?php

namespace Database\Factories;

use App\Models\Commande;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class CommandeFactory extends Factory
{
    protected $model = Commande::class;

    public function definition(): array
    {
        $user = User::inRandomOrder()->first();

        return [
            'user_id' => $user->id,
            'montant_totale' => $this->faker->randomFloat(2, 10, 200),
            'statut' => $this->faker->randomElement(['en_attente', 'en_cours', 'livree', 'annulee']),
            'methode_paiement' => $this->faker->randomElement(['credit_card', 'paypal']),
            'client_name' => $user->name,
            'client_email' => $user->email,
            'client_phone' => $this->faker->phoneNumber(),
            'client_address' => $this->faker->address(),
        ];
    }
}
