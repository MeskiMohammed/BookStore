<?php

namespace Database\Factories;

use App\Models\Commande;
use App\Models\DetailsCommande;
use App\Models\Livre;
use Illuminate\Database\Eloquent\Factories\Factory;

class DetailsCommandeFactory extends Factory
{
    protected $model = DetailsCommande::class;

    public function definition(): array
    {
        $livre = Livre::inRandomOrder()->first();
        $quantite = $this->faker->numberBetween(1, 5);
        $prix_unitaire = $livre->prix;

        return [
            'commande_id' => Commande::factory(),
            'livre_id' => $livre->id,
            'quantite' => $quantite,
            'prix_unitaire' => $prix_unitaire,
            'sous_total' => $prix_unitaire * $quantite,
        ];
    }
}
