<?php

namespace App\Services;

use App\DTOs\Assets\CreateAssetDto;
use App\DTOs\Assets\UpdateAssetDto;
use App\Models\Asset;
use App\Repositories\Contracts\AssetRepositoryInterface;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Validation\ValidationException;

class AssetService
{
    protected $assetRepository;

    public function __construct(AssetRepositoryInterface $assetRepository)
    {
        $this->assetRepository = $assetRepository;
    }

    public function getAllAssets(): Collection
    {
        // TODO: better to add filters
        return $this->assetRepository->getAll();
    }

    public function getSingleAsset(int $id): ?Asset
    {
        return $this->assetRepository->getSingle($id);
    }

    public function createAsset(CreateAssetDto $dto): Asset
    {
        // Check if there is existing Asset with same 'name' and 'model'
        $existingAsset = $this->assetRepository->findByNameAndModel($dto->name, $dto->model);

        if ($existingAsset) {
            throw ValidationException::withMessages([
                'name' => ['Asset with the same name and model already exists.']
            ]);
        }

        $imageUrl = null;

        if ($dto->image) {
            $uploadedFile = $dto->image->getRealPath();

            $uploadResult = Cloudinary::uploadApi()->upload($uploadedFile, [
                'folder' => 'assets',
                'fetch_format' => 'auto',
                'quality' => 'auto'
            ]);

            $imageUrl = $uploadResult['secure_url'] ?? null;
        }

        return $this->assetRepository->create($dto, $imageUrl);
    }

    public function updateAsset(Asset $asset, UpdateAssetDto $dto): Asset
    {
        // Validate if asset to be updated is existing
        $assetToBeUpdate = $this->assetRepository->getSingle($asset->id);

        if (!$assetToBeUpdate || $assetToBeUpdate == null) {
            throw ValidationException::withMessages([
                'name' => ['Asset does not exists.']
            ]);
        }

        // Check if there is existing Asset with same 'name' and 'model'
        $existingAsset = $this->assetRepository->findByNameAndModel($dto->name, $dto->model);

        if ($existingAsset) {
            throw ValidationException::withMessages([
                'name' => ['Asset with the same name and model already exists.']
            ]);
        }


        //Upload image to blob storage (ex.cloudinary)
        $imageUrl = $asset->image;

        if ($dto->image) {
            $uploadedFile = $dto->image->getRealPath();

            $uploadResult = Cloudinary::uploadApi()->upload($uploadedFile, [
                'folder' => 'assets',
                'fetch_format' => 'auto',
                'quality' => 'auto'
            ]);

            $imageUrl = $uploadResult['secure_url'] ?? $asset->image;
        }

        return $this->assetRepository->update($asset, $dto, $imageUrl);
    }

    public function deleteAsset(Asset $asset): bool
    {
        // Validate if asset to be deleted is existing
        $assetToBeDelete = $this->assetRepository->getSingle($asset->id);

        if (!$assetToBeDelete || $assetToBeDelete == null) {
            throw ValidationException::withMessages([
                'name' => ['Asset does not exists.']
            ]);
        }

        return $this->assetRepository->delete($asset);
    }
}
