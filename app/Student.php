<?php

namespace NVU;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    public $table = "students";

    public $timestamps = false;

    public function user() {
        return $this->belongsTo('NVU\User');
    }
    public function result() {
        return $this->hasMany('NVU\Result');
    }
}
