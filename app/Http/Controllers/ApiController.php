<?php

namespace App\Http\Controllers;

use App\Photo;
use App\Http\PhotosRequest;
use App\Jobs\AddPhotoJob;
use Illuminate\Http\Request;

class ApiController extends Controller
{
    public function all()
    {
        return Photo::all();
    }

    public function store(PhotosRequest $request)
    {
        $photo = $request->file('photo');

        (new AddPhotoJob($photo))->save();
    }

    public function view($id)
    {
        return Photo::findOrFail($id);
    }

    public function destroy($id)
    {
        return Photo::findOrFail($id)->delete();
    }
}
