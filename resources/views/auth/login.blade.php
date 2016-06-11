@extends('layouts.default')
@section('title', 'Login')

@section('content')
    <form method="POST" action="/login">
        {!! csrf_field() !!}
        @include('elements.errors')
        <fieldset>
            <label for="email">Email</label>
            <input type="email" name="email" id="email" value="{{ old('email') }}" required />
            <label for="password">Password</label>
            <input type="password" name="password" id="password" class="form-control" required />
            <label class="input-checkbox-label">
                 <input type="checkbox" name="remember" value="0">
                Remember Me?
            </label>
            <button id="submit">
                Login
            </button>
        </fieldset>
    </form>
@stop
