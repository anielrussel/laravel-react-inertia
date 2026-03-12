<?php

namespace App\Filters;

use Illuminate\Database\Eloquent\Builder;

class AssetFilter extends BaseFilter
{
    public function name(Builder $query, $value)
    {
        $query->where('name', 'like', "%{$value}%");
    }

    public function model(Builder $query, $value)
    {
        $query->where('model', 'like', "%{$value}%");
    }

    public function minPrice(Builder $query, $value)
    {
        $query->where('price', '>=', $value);
    }

    public function maxPrice(Builder $query, $value)
    {
        $query->where('price', '<=', $value);
    }
}
