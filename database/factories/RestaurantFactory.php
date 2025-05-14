<?php
namespace Database\Factories;

use App\Models\Restaurant;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class RestaurantFactory extends Factory
{
    protected $model = Restaurant::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->company(),
            // TODO: Add necessary fields
            // 'address' => $this->faker->address(),
            // 'phone' => $this->faker->phoneNumber(),
            // 'email' => $this->faker->unique()->safeEmail(),
            'user_id' => User::factory(),
        ];
    }
}
