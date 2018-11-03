<?php

namespace NVU\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;

class SocialAuthController extends Controller
{
    public function facebookLogin(Request $request) {
        if( !$request->has('code') )
        return Socialite::with('facebook')->redirect();

        $oauthUser = Socialite::with('facebook')->user();
        dd($oauthUser);
        }
}
