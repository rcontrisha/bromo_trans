<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Laporan extends Model
{
    protected $fillable = ['admin_id', 'periode', 'jumlah_tiket_terjual', 'total_pendapatan'];

    public function admin()
    {
        return $this->belongsTo(Admin::class);
    }
}
