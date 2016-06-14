@extends('layouts.default')
@section('title', 'Show')

@section('content')
    <a href="/logout">Logout</a>
    <div>
        <h2>Photo ({{ $photo->name }})</h2>
        <img src="{{ $photo->path }}" style="max-height: 250px;" />
    </div>
    <a href="/photos/{{$photo->id}}/prev">Prev</a>
    <a href="/photos">Back</a>
    <a href="/photos/{{$photo->id}}/next">Next</a>

    <form action="/photos/{{ $photo->id }}" method="POST">
        {!! csrf_field() !!}
        {{ method_field('DELETE') }}
        <button type="submit">Delete</button>
    </form>
@stop
