<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Auth;
use App\Photo;
use App\Forms\AddPhoto;
use App\Http\Requests;
use App\Http\Requests\PhotosRequest;
use App\Http\Controllers\Controller;

class PhotosController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $photos = Photo::all();
        return view('photos.index', compact('photos'));
    }

    public function create()
    {
        return view('photos.create');
    }

    public function store(PhotosRequest $request)
    {
        $user = Auth::user();
        $photo = $request->file('photo');
        (new AddPhoto($user, $photo))->save();

        return redirect('photos');
    }

    public function show($id)
    {
        $photo = Photo::findOrFail($id);
        return view('photos.show', compact('photo'));
    }

    public function destroy($id)
    {
        Photo::findOrFail($id)->delete();
        return redirect('photos');
    }
}
