<?php

namespace App\DTOs\Assets;

use Illuminate\Http\Request;

class UpdateAssetDto
{
    public function __construct(
        public int $id,
        public string $name,
        public ?string $model,
        public int $quantity,
        public int $price,
        public ?string $description,
        public $image,
    ) {}

    public static function fromRequest(Request $request): self
    {
        return new self(
            id: $request->id,
            name: $request->name,
            model: $request->model,
            quantity: $request->quantity,
            price: $request->price,
            description: $request->description,
            image: $request->file('image')
        );
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'model' => $this->model,
            'quantity' => $this->quantity,
            'price' => $this->price,
            'description' => $this->description,
            'image' => $this->image
        ];
    }
}
