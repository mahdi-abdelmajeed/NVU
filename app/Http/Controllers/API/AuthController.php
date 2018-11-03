<?php
namespace NVU\Http\Controllers\API;

use NVU\Http\Controllers\API\ApiBaceController as ApiBaceController;

use Illuminate\Http\Request;
use Validator;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use NVU\User;
use NVU\Address;


class AuthController extends ApiBaceController
{
    /**
     * Login user and create token
     *
     * @param  [string] email
     * @param  [string] password
     * @param  [boolean] remember_me
     * @return [string] access_token
     * @return [string] token_type
     * @return [string] expires_at
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
            'remember_me' => 'boolean'
        ]);
        $credentials = request(['email', 'password']);
        if(!Auth::once($credentials))
            return $this->sendError('Unauthorized.', ['message' => 'Unauthorized'], 401);
        $user = $request->user();
        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->token;
        if ($request->remember_me)
            $token->expires_at = Carbon::now()->addWeeks(1);
        $token->save();
        $response = [
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse(
                $tokenResult->token->expires_at
            )->toDateTimeString()
        ];
        return $this->sendResponse($response, 'User login successfully.');

    }
  
    /**
     * Logout user (Revoke the token)
     *
     * @return [string] message
     */
    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        return $this->sendResponse(NUll, 'User logout successfully.');
    }
    public function logoutOtherDevices(Request $request)
    {
        
        dd(Auth::logoutOtherDevices($request->password));
        if(Auth::logoutOtherDevices($request->password))
        return $this->sendResponse(NUll, 'User logout successfully.');
    }
}