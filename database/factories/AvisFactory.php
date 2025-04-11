<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Livre;
use Illuminate\Database\Eloquent\Factories\Factory;

class AvisFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::inRandomOrder()->first()->id ?? User::factory(),
            'livre_id' => Livre::inRandomOrder()->first()->id ?? Livre::factory(),
            'note' => $this->faker->numberBetween(1, 5),
            'commentaire' => $this->faker->sentence(),
        ];
    }
}
