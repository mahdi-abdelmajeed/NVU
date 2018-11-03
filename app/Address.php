<?php

namespace NVU;

use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    public $table = "addresses";

    public $timestamps = false;
    protected $fillable =[
        'user_id', 'phone', 'state', 'locality', 'address', 'dormitory'
    ];

    public function user() {
        return $this->belongsTo('NVU\User');
    }
}
