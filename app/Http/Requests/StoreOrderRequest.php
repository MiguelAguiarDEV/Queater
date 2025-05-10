<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'required|email',
            'status' => 'required|string',
            'ordered_at' => 'required|date',
            'restaurant_id' => 'required|exists:restaurants,id', // Add validation for restaurant_id
        ];
    }
}
