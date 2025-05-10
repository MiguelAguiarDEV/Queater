<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Article>
 */
class ArticleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(),
            'body' => $this->faker->optional()->paragraph(4),
            'category_id' => \App\Models\Category::factory(),
            'image_path' => $this->faker->optional()->imageUrl(),
            'is_published' => $this->faker->boolean(),
            'price' => $this->faker->randomFloat(2, 1, 100),
        ];
    }
}
