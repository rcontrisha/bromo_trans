<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Mobil extends Model
{
    protected $fillable = ['plat_nomor', 'tipe_mobil', 'kapasitas'];

    public function tikets()
    {
        return $this->hasMany(Tiket::class);
    }
}
