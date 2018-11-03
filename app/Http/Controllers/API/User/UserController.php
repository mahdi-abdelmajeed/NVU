<?php

namespace NVU\Http\Controllers\API\User;

use Illuminate\Http\Request;
use NVU\Http\Controllers\API\ApiBaceController;
use NVU\User;
class UserController extends ApiBaceController
{
    
    /**
     * Get the authenticated User
     *
     * @return [json] user object
     */
    public function user(Request $request)
    {
        return $this->sendResponse($request->user(), 'User Query successfully.');
    }


    public function search(Request $request, $id=null)
    {
        if($id) {
            $user = User::find($id);
            $info = Array(
                'id' => $user->id,
                'name' => $user->name,
                'pruture' => $user->proture($user, $user->proture),
                'abstract' => $user->abstract
            );
        }
        else {
            if(isset($request->searchBy))
                $searchBy = $request->searchBy;
            else
                $searchBy = "name";
            $search = $request->search;
            $users = User::where($searchBy,'like' , $search.'%')->get();
            $info = Array();
            foreach($users as $user) {
                $info[] = Array(
                    'id' => $user->id,
                    'name' => $user->name,
                    'pruture' => $user->proture($user, $user->proture),
                    'abstract' => $user->abstract
                );
            }
        }
        return $this->sendResponse($info, 'Users Query successfully.');
    }
}
