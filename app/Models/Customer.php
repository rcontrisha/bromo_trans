<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $fillable = ['user_id', 'nama', 'email', 'no_hp', 'alamat'];

    public function pemesanans()
    {
        return $this->hasMany(Pemesanan::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
