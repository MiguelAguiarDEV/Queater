<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRestaurantRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'sometimes|required|string|max:255',
            // 'user_id' => 'sometimes|required|exists:users,id',
            // 'address' => 'sometimes|required|string|max:255',
            // 'phone' => 'sometimes|required|string|max:50',
            // 'email' => 'sometimes|required|email|unique:restaurants,email,' . $this->restaurant,
        ];
    }
}
