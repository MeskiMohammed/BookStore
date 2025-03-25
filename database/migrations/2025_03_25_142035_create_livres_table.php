<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLivresTable extends Migration
{
    
    public function up()
    {
        Schema::create('livres', function (Blueprint $table) {
            $table->id();
            $table->string('libelle');
            $table->string('description');
            $table->string('auteur');
            $table->string('isbn')->unique();
            $table->double('prix');
            $table->double('stock');
            $table->foreignId('categorie_id')->constrained('categories')->onDelete('cascade');
            $table->string('editeur');
            $table->date('date_publication');
            $table->string('image')->nullable();
            $table->boolean('actif')->default(1);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('livres');
    }
};
