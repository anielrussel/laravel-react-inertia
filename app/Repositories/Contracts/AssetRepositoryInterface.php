<?php

namespace App\Repositories\Contracts;

use App\DTOs\Assets\CreateAssetDto;
use App\DTOs\Assets\UpdateAssetDto;
use App\Models\Asset;
use Illuminate\Database\Eloquent\Collection;

interface AssetRepositoryInterface
{
    public function getAll(): Collection;

    public function getSingle(int $id): ?Asset;

    public function create(CreateAssetDto $dto, ?string $imageUrl): Asset;

    public function update(Asset $asset, UpdateAssetDto $dto, ?string $imageUrl): Asset;

    public function delete(Asset $asset): bool;

    public function findByNameAndModel(string $name, ?string $model): ?Asset;
}
