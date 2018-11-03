<?php

namespace NVU;

use Illuminate\Database\Eloquent\Model;

class Result extends Model
{
    public $table = "results";

    public function student() {
        return $this->belongsTo('NVU\Student');
    }
}
