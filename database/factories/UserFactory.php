<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

class UserFactory extends Factory
{
    public function definition(): array
    {
        return [
            'Nom' => $this->faker->lastName(),
            'Prenom' => $this->faker->firstName(),
            'Adresse' => $this->faker->address(),
            'Email' => $this->faker->unique()->safeEmail(),
            'Password' => bcrypt('password'),
        ];
    }
}
