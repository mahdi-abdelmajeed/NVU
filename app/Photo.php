<?php

namespace NVU;

use Illuminate\Database\Eloquent\Model;

class Photo extends Model
{
    public $table = "photos";

    public function user() {
        return $this->belongsTo('NVU\User');
    }
}
