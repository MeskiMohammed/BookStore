<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Commande extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'montant_totale', 'statut', 'methode_paiement'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function detailsCommandes()
    {
        return $this->hasMany(DetailsCommande::class, 'commande_id');
    }
}
