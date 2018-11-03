<?php

namespace NVU\Http\Controllers\API\User;

use Illuminate\Http\Request;
use NVU\Http\Controllers\API\ApiBaceController;
use NVU\Address;

class AddressController extends ApiBaceController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user_id = $request->user()->getKey();
        $address = Address::find($user_id);
        if($address){
            return $this->sendResponse($address, 'your Query successfully.');
        }
        return $this->sendError('you are don\'t have Address.', 404);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user_id = $request->user()->getKey();
        $address = Address::create($request->all());
        return response()->json($address, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $user_id = $request->user()->getKey();
        $address = Address::find($user_id);
        $address->update($request->all());
        return response()->json($address, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user_id = $request->user()->getKey();
        $address = Address::find($user_id);
        $address->delete();
        return response()->json(null, 204);

    }
}
