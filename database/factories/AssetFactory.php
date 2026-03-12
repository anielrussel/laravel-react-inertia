<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Asset>
 */
class AssetFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->randomElement([
                'Laptop',
                'Printer',
                'Monitor',
                'Keyboard',
                'Mouse',
                'Speaker',
                'Flash Drive',
            ]),
            'model' => fake()->bothify('Model-###'),
            'quantity' => fake()->numberBetween(1, 50),
            'price' => fake()->numberBetween(100, 5000),
            'description' => fake()->sentence(),
            'image' => null
        ];
    }
}
