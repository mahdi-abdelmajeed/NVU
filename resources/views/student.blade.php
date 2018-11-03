@extends('layouts.app')

@section('title', 'منصة الطلاب')

@section('content')
    <div student></div>
@endsection

@section('script')
@parent
    <script src = "{{ asset('nvu/studentRoutes.js') }}"></script>
    <script src = "{{ asset('nvu/studentDirectives.js') }}"></script>
    <script src = "{{ asset('nvu/studentControllers.js') }}"></script>
@endsection