<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pemesanan extends Model
{
    protected $fillable = ['customer_id', 'tiket_id', 'tanggal_pemesanan', 'status_pemesanan', 'total_harga', 'jumlah_tiket', 'data_penumpang'];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function tiket()
    {
        return $this->belongsTo(Tiket::class);
    }

    public function pembayaran()
    {
        return $this->hasOne(Pembayaran::class);
    }
}
