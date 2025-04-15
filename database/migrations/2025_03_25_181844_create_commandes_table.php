<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommandesTable extends Migration
{

    public function up()
    {

        Schema::create('commandes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->double('montant_totale');
            $table->string('statut');
            $table->string('methode_paiement');
            $table->timestamps();

        });

    }


    public function down(): void
    {
        Schema::dropIfExists('commandes');
    }
};
