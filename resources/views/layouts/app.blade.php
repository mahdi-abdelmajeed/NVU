<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}" ng-app="nvu">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title> @yield('title') </title>

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('css/angular-material.min.css') }}" rel="stylesheet">
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
    <!-- Fonts
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">
    -->
    <!-- Jquery -->
    @yield('head')
</head>
<body>  
    @yield('content')
    <!-- Scripts -->
    @section('script')
        <script src = "{{ asset('nvu/angularjs/angular.min.js') }}"></script>
        <script src = "{{ asset('nvu/angularjs/lib/angular-route.min.js') }}"></script>
        <script src = "{{ asset('nvu/angularjs/lib/angular-animate.min.js') }}"></script>
        <script src = "{{ asset('nvu/angularjs/lib/angular-aria.min.js') }}"></script>
        <script src = "{{ asset('nvu/angularjs/lib/angular-messages.min.js') }}"></script>
        <script src = "{{ asset('nvu/angularjs/lib/angular-material.min.js') }}"></script>
        <script src = "{{ asset('nvu/app.js') }}"></script>
        <script src = "{{ asset('nvu/controllers.js') }}"></script>
        <script src = "{{ asset('nvu/directives.js') }}"></script>
        <script src = "{{ asset('js/app.js') }}"></script>
        <script src = "{{ asset('js/script.js') }}"></script>
    @show
</body>
</html>
