<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Livre extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'libelle',
        'description',
        'auteur',
        'isbn',
        'prix',
        'stock',
        'categorie_id',
        'editeur',
        'date_publication',
        'image',
        'actif',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'prix' => 'double',
        'stock' => 'double',
        'date_publication' => 'date',
        'actif' => 'boolean',
    ];

    /**
     * Get the category that owns the book.
     */
    public function categorie()
    {
        return $this->belongsTo(Categorie::class);
    }

    /**
     * Get the reviews for the book.
     */
    public function avis()
    {
        return $this->hasMany(Avis::class);
    }

    /**
     * Get the order details for the book.
     */
    public function detailsCommandes()
    {
        return $this->hasMany(DetailsCommande::class);
    }

    /**
     * Get the average rating for the book.
     */
    public function getAverageRatingAttribute()
    {
        return $this->avis()->avg('note') ?? 0;
    }

    /**
     * Check if the book is in stock.
     */
    public function getInStockAttribute()
    {
        return $this->stock > 0;
    }
}
