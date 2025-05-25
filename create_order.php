<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\Commande;

$order = Commande::create([
    'user_id' => 1,
    'client_name' => 'John Doe',
    'client_email' => 'john@example.com',
    'client_address' => '123 Main St',
    'montant_totale' => 150.00,
    'statut' => 'en_attente',
    'methode_paiement' => 'credit_card'
]);

echo "Order created with ID: " . $order->id . "\n";
