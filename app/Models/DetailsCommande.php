<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailsCommande extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'commande_id',
        'livre_id',
        'quantite',
        'prix',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'quantite' => 'integer',
        'prix' => 'double',
    ];

    /**
     * Get the order that owns the order detail.
     */
    public function commande()
    {
        return $this->belongsTo(Commande::class);
    }

    /**
     * Get the book that owns the order detail.
     */
    public function livre()
    {
        return $this->belongsTo(Livre::class);
    }

    /**
     * Get the subtotal for the order detail.
     */
    public function getSubtotalAttribute()
    {
        return $this->prix * $this->quantite;
    }
}
