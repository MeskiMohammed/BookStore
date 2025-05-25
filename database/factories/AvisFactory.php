<?php

namespace Database\Factories;

use App\Models\Avis;
use App\Models\Livre;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class AvisFactory extends Factory
{
    protected $model = Avis::class;

    public function definition(): array
    {
        return [
            'user_id' => User::inRandomOrder()->first()->id,
            'livre_id' => Livre::inRandomOrder()->first()->id,
            'note' => $this->faker->numberBetween(1, 5),
            'commentaire' => $this->faker->paragraph(),
        ];
    }
}
