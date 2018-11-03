@extends('layouts.app')

@section('title', 'جامعة وادي النيل')

@section('content')
<div app></div>
@endsection

@section('script')
@parent
  <script src = "{{ asset('nvu/nvuRoutes.js') }}"></script>
@endsection