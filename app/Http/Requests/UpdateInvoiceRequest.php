<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateInvoiceRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'sale_id' => 'sometimes|required|exists:sales,id',
            'invoice_number' => 'sometimes|required|string|max:255',
            'amount' => 'sometimes|required|numeric',
        ];
    }
}
