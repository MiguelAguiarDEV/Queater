<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreInvoiceRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'sale_id' => 'required|exists:sales,id',
            'invoice_number' => 'required|string|max:255',
            'amount' => 'required|numeric',
        ];
    }
}
