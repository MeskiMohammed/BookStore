<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDetailsCommandesTable extends Migration
{
    
    public function up()
    {
        Schema::create('details_commandes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('commande_id')->constrained('commandes')->onDelete('cascade');
            $table->foreignId('livre_id')->constrained('livres')->onDelete('cascade');
            $table->integer('quantite');
            $table->double('prix');
            $table->timestamps();
        });
    }

    
    public function down(): void
    {
        Schema::dropIfExists('details_commandes');
    }
};
