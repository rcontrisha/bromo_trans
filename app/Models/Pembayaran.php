<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pembayaran extends Model
{
    protected $fillable = ['pemesanan_id', 'metode_pembayaran', 'bukti_transfer', 'tanggal_pembayaran', 'jumlah_pembayaran'];

    public function pemesanan()
    {
        return $this->belongsTo(Pemesanan::class);
    }
}
