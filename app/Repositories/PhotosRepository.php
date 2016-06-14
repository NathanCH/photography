<?php

namespace App\Repositories;

use App\Photo;
use App\Forms\AddPhoto;

class PhotosRepository
{
	protected $model;

	public function __construct(Photo $photo)
	{
		$this->model = $photo;
	}

	public function all()
	{
		return $this->model->all();
	}

	public function find($id)
	{
		return $this->model->findOrFail($id);
	}

	public function store($user, $photo)
	{
		return (new AddPhoto($user, $photo))->save();
	}

	public function delete($id)
	{
		return $this->model->findOrFail($id)->delete();
	}

	public function next($id)
	{
		return $this->model->where('id', '>', $id)->first();
	}

	public function prev($id)
	{
		return Photo::where('id', '=', $id - 1)->first();
	}
}