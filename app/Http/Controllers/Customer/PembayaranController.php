<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Pembayaran;
use App\Models\Pemesanan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class PembayaranController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'pemesanan_id' => 'required|exists:pemesanans,id',
            'metode_pembayaran' => 'required|in:qris,bni,bri,bca',
            'jumlah_pembayaran' => 'required|numeric|min:10000',
            'bukti_transfer' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
        ]);

        $path = null;

        if ($request->hasFile('bukti_transfer')) {
            $path = $request->file('bukti_transfer')->store('bukti_transfer', 'public');
        }

        $pembayaran = Pembayaran::create([
            'pemesanan_id' => $request->pemesanan_id,
            'metode_pembayaran' => $request->metode_pembayaran,
            'jumlah_pembayaran' => $request->jumlah_pembayaran,
            'bukti_transfer' => $path,
            'tanggal_pembayaran' => now(),
        ]);

        $pemesanan = Pemesanan::find($request->pemesanan_id);
        $pemesanan->status_pemesanan = 'waiting confirmation';
        $pemesanan->save();

        return redirect()->back()->with('message', 'Pembayaran berhasil dikirim!');
    }

    public function cancel(Request $request)
    {
        $request->validate([
            'pemesanan_id' => 'required|exists:pemesanans,id',
        ]);

        $pemesanan = Pemesanan::find($request->pemesanan_id);

        // misalnya cuma boleh cancel kalau belum dibayar
        if ($pemesanan->status_pemesanan === 'paid') {
            return back()->with('error', 'Pesanan sudah dibayar, tidak bisa dibatalkan.');
        }

        $pemesanan->status_pemesanan = 'cancelled'; // atau 'waiting confirmation' sesuai kebutuhan
        $pemesanan->save();

        return back()->with('success', 'Pesanan berhasil dibatalkan.');
    }
}
