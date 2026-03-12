<?php

namespace App\Repositories;

use App\DTOs\Assets\CreateAssetDto;
use App\DTOs\Assets\UpdateAssetDto;
use App\Filters\AssetFilter;
use App\Models\Asset;
use App\Repositories\Contracts\AssetRepositoryInterface;

class AssetRepository implements AssetRepositoryInterface
{
    public function getAll(array $filters = [], int $perPage = 10)
    {
        $query = Asset::query();

        // Apply filters using AssetFilter
        $query = (new AssetFilter($filters))->apply($query);

        return $query->latest()->paginate($perPage)->withQueryString();
    }

    public function getSingle(int $id): ?Asset
    {
        return Asset::find($id);
    }

    public function create(CreateAssetDto $dto, ?string $imageUrl): Asset
    {
        return Asset::create([
            'name' => $dto->name,
            'model' => $dto->model,
            'quantity' => $dto->quantity,
            'price' => $dto->price,
            'description' => $dto->description,
            'image' => $imageUrl
        ]);
    }

    public function update(Asset $asset, UpdateAssetDto $dto, ?string $imageUrl): Asset
    {
        $asset->update([
            'name' => $dto->name,
            'model' => $dto->model,
            'quantity' => $dto->quantity,
            'price' => $dto->price,
            'description' => $dto->description,
            'image' => $imageUrl
        ]);

        return $asset;
    }

    public function delete(Asset $asset): bool
    {
        return $asset->delete();
    }

    public function findByNameAndModel(string $name, ?string $model): ?Asset
    {
        return Asset::where('name', $name)
            ->where('model', $model)
            ->first();
    }
}
