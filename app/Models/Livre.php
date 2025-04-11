<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Livre extends Model
{
    use HasFactory;

    protected $fillable = [
        'libelle', 'description', 'auteur', 'isbn', 'prix', 'stock',
        'categorie_id', 'editeur', 'date_publication', 'image', 'actif'
    ];

    public function categorie()
    {
        return $this->belongsTo(Categorie::class);
    }

    public function avis()
    {
        return $this->hasMany(Avis::class);
    }

    public function detailsCommandes()
    {
        return $this->hasMany(DetailsCommande::class, 'livre_id');
    }
}
