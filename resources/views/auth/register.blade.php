@extends('layouts.default')
@section('title', 'Register')

@section('content')
    <form method="POST" action="/register">
        {!! csrf_field() !!}
        @include('elements.errors')
        <fieldset>
            <label for="name">Name</label>
            <input type="text" name="name" id="name" value="{{ old('name') }}" required />

            <label for="email">Email</label>
            <input type="email" name="email" id="email" value="{{ old('email') }}" required />

            <label for="password">Password</label>
            <input type="password" name="password" id="password" required />

            <label for="confirm-password">Confirm Password</label>
            <input type="password" name="password_confirmation" id="password_confirmation" required />
            <button id="submit">
                Register
            </button>
        </fieldset>
    </form>
@stop
