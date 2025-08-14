<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tiket extends Model
{
    protected $fillable = ['mobil_id', 'tujuan', 'jadwal_keberangkatan', 'harga_tiket'];

    public function mobil()
    {
        return $this->belongsTo(Mobil::class);
    }

    public function pemesanans()
    {
        return $this->hasMany(Pemesanan::class);
    }
}
