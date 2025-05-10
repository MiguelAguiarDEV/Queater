<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSaleRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'order_id' => 'sometimes|required|exists:orders,id',
            'total_amount' => 'sometimes|required|numeric',
        ];
    }
}
