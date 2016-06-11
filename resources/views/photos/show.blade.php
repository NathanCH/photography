@extends('layouts.default')
@section('title', 'Show')

@section('content')
    <a href="/logout">Logout</a>
    <div>
        <h2>Photo ({{ $photo->name }})</h2>
        <img src="{{ $photo->path }}" />
    </div>
    <a href="/photos">Back</a>
@stop
