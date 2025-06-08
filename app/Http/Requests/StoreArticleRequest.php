<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreArticleRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }    public function rules()
    {
        return [
            'title' => 'required|string|max:255',
            'body' => 'required|string',
            'price' => 'required|numeric',
            'category_id' => 'required|exists:categories,id',
            'restaurant_id' => 'required|exists:restaurants,id',
            'image_path' => 'nullable|string',
            'is_published' => 'boolean',
        ];
    }
}
