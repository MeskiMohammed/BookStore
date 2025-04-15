<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class DetailsCommande extends Model
{
    use HasFactory;

    protected $fillable = ['commande_id', 'livre_id', 'quantite', 'prix'];

    public function commande()
    {
        return $this->belongsTo(Commande::class);
    }

    public function livre()
    {
        return $this->belongsTo(Livre::class);
    }
}
