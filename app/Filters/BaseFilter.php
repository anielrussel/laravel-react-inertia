<?php

namespace App\Filters;

use Illuminate\Database\Eloquent\Builder;

abstract class BaseFilter
{
    protected array $filters;

    public function __construct(array $filters = [])
    {
        $this->filters = $filters;
    }

    public function apply(Builder $query): Builder
    {
        foreach ($this->filters as $name => $value) {
            if ($value === null || $value === '') {
                continue;
            }

            // If the child filter class has a method for this filter, call it
            if (method_exists($this, $name)) {
                $this->$name($query, $value);
            }
        }

        return $query;
    }
}
