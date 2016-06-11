@extends('layouts.default')
@section('title', 'Create')

@section('content')
    <a href="/logout">Logout</a>
    <form method="POST" action="/photos" enctype="multipart/form-data">
		{!! csrf_field() !!}
		@include('elements.errors')
        <fieldset>
            <label for="photo">Photo</label>
            <input type="file" name="photo" id="photo" required />
            <button id="submit">
                Submit
            </button>
        </fieldset>
    </form>
@stop
