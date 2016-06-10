<?php

namespace App\Http\Controllers;

use App\Photo;
use App\Http\Requests;
use Illuminate\Http\Request;

class PhotosController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index() {}

    public function create() {}

    public function store(PhotosRequest $request) {}

    public function show($id) {}

    public function edit($id) {}

    public function update(PhotosRequest $request, $id) {}

    public function destroy($id) {}
}
