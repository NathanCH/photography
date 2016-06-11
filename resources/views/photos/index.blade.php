@extends('layouts.default')
@section('title', 'Index')

@section('content')
    <a href="/logout">Logout</a>

    <h2>Photos ({{ count($photos) }})</h2>
    <ul>
        @foreach($photos as $photo)
            <li><a href="photos/{{ $photo->id }}">{{ $photo->name }}</a></li>
        @endforeach
    </ul>
    <a href="photos/create">Add New Photo</a>
@stop
