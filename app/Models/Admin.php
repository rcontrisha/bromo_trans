<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    protected $fillable = ['user_id', 'nama_admin', 'alamat'];

    public function laporans()
    {
        return $this->hasMany(Laporan::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
