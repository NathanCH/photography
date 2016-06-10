<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;

class PhotosRequest extends Request
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'photo' => 'required|mimes:jpg,jpeg,png,gif'
        ];
    }
}
