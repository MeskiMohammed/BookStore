<?php
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CommandesTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('commandes')->insert([
            [
                'user_id' => 1,
                'montant_totale' => 49.98,
                'statut' => 'validée',
                'methode_paiement' => 'carte bancaire',
            ],
            [
                'user_id' => 2,
                'montant_totale' => 19.50,
                'statut' => 'en attente',
                'methode_paiement' => 'paypal',
            ],
        ]);
    }
}
