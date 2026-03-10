<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Asset extends Model
{
    protected $fillable = [
        'name',
        'model',
        'quantity',
        'price',
        'description',
        'image'
    ];
}
