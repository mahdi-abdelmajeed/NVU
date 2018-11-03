<?php

namespace NVU;

use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;
    
    public $table = "users";

    public function student() {
        return $this->hasOne('NVU\Student');
    }

    public function address() {
        return $this->hasOne('NVU\Address');
    }

    public function photos() {
        return $this->hasMany('NVU\Photo');
    }

    public function proture($query, $proture_id) {
        if($proture_id)
            $img = $query->photos->find($proture_id)->img;
        else
            $img = "default.png";
        return asset("storage/app/public/img/users/".$img);
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'type'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];
}
