<?php

namespace App\Http\Controllers;

use App\DTOs\Assets\CreateAssetDto;
use App\DTOs\Assets\UpdateAssetDto;
use App\Http\Requests\Assets\AssetCreateRequest;
use App\Http\Requests\Assets\AssetUpdateRequest;
use App\Models\Asset;
use App\Services\AssetService;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class AssetController extends Controller
{
    public function __construct(protected AssetService $assetService) {}

    public function index()
    {
        $assets = $this->assetService->getAllAssets();

        return Inertia::render('assets/Assets', [
            'assets' => $assets,
        ]);
    }

    public function create()
    {
        return Inertia::render('assets/Create', []);
    }

    public function store(AssetCreateRequest $request)
    {

        try {
            $dto = CreateAssetDto::fromRequest($request); // Validate requests

            $this->assetService->createAsset($dto);

            return back()
                ->with('success', 'Asset created successfully.');
        } catch (ValidationException $e) {
            throw $e;
        } catch (\Throwable $th) {
            return back()->with('failed', 'Failed to create asset. Something went wrong.');
        }
    }

    public function edit(Asset $asset)
    {
        return Inertia::render('assets/Edit', [
            'asset' => $asset
        ]);
    }

    public function update(AssetUpdateRequest $request, Asset $asset)
    {

        try {
            $dto = UpdateAssetDto::fromRequest($request);

            $this->assetService->updateAsset($asset, $dto);

            return back()
                ->with('success', 'Asset updated successfully.');
        } catch (ValidationException $e) {
            throw $e;
        } catch (\Throwable $th) {
            return back()
                ->with('failed', 'Failed to update asset. Something went wrong.');
        }
    }

    public function destroy(Asset $asset)
    {
        try {
            $this->assetService->deleteAsset($asset);

            return redirect()
                ->route('assets.index')
                ->with('success', 'Asset deleted successfully.');
        } catch (ValidationException $e) {
            throw $e;
        } catch (\Throwable $th) {
            return redirect()
                ->route('assets.index')
                ->with('failed', 'Failed to delete asset. Something went wrong.');
        }
    }
}
