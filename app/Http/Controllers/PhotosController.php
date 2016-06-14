<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Auth;
use App\Http\Requests;
use App\Http\Requests\PhotosRequest;
use App\Http\Controllers\Controller;
use App\Repositories\PhotosRepository;

class PhotosController extends Controller
{
    protected $repository;

    public function __construct(PhotosRepository $repository)
    {
        $this->middleware('auth');
        $this->repository = $repository;
    }

    public function index()
    {   
        $photos = $this->repository->all();

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

        $this->repository->store($user, $photo);

        return redirect('photos');
    }

    public function show($id)
    {
        $photo = $this->repository->find($id);

        return view('photos.show', compact('photo'));
    }

    public function destroy($id)
    {
        $this->repository->delete($id);

        return redirect('photos');
    }

    public function next($id)
    {
        $photo = $this->repository->next($id);

        return redirect("photos/{$photo->id}");
    }

    public function prev($id)
    {
        $photo = $this->repository->prev($id);

        return redirect("photos/{$photo->id}");
    }
}
