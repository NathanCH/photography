<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests\PhotosRequest;
use App\Repositories\PhotosRepository;

class ApiController extends Controller
{
    protected $repository;

    public function __construct(PhotosRepository $repository)
    {
        $this->repository = $repository;
    }

    public function all()
    {
        return $this->repository->all();
    }

    public function show($id)
    {
        return $this->repository->find($id);
    }

    public function next($id)
    {
        return $this->repository->next($id);
    }

    public function prev($id)
    {
        return $this->repository->prev($id);
    }
}
