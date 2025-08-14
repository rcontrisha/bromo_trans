<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pembayaran;
use App\Models\Pemesanan;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Mail\InvoiceMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class PembayaranController extends Controller
{
    public function index()
    {
        $pembayarans = Pembayaran::with(['pemesanan.customer', 'pemesanan.tiket.mobil'])
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Admin/Pembayaran', [
            'pembayarans' => $pembayarans,
        ]);
    }

    public function konfirmasi(Request $request, Pembayaran $pembayaran)
    {
        DB::transaction(function () use ($pembayaran) {
            $pembayaran->update(['tanggal_pembayaran' => now()]);
            $pembayaran->pemesanan->update(['status_pemesanan' => 'paid']);
        });

        return back()->with('success', 'Pembayaran berhasil dikonfirmasi.');
    }

    public function tolak(Request $request, Pembayaran $pembayaran)
    {
        DB::transaction(function () use ($pembayaran) {
            $pembayaran->pemesanan->update(['status_pemesanan' => 'rejected']);
        });

        return back()->with('success', 'Pembayaran ditolak.');
    }

    public function kirimInvoice(Request $request, $id) // Ubah parameter menjadi ID
    {
        $pemesanan = Pemesanan::findOrFail($id); // Ambil pemesanan berdasarkan ID

        Log::info('Proses kirim invoice dimulai.', ['pemesanan_id' => $pemesanan->id]);

        // Eager load relasi yang diperlukan
        $pemesanan->load('customer', 'pembayaran');

        if ($pemesanan->status_pemesanan !== 'paid') {
            Log::warning('Gagal kirim invoice karena status belum lunas.', [
                'pemesanan_id' => $pemesanan->id,
                'status' => $pemesanan->status_pemesanan
            ]);
            return back()->with('error', 'Invoice hanya bisa dikirim jika status sudah lunas.');
        }

        try {
            Log::info('Mengirim invoice ke email user.', [
                'email' => $pemesanan->customer->email,
                'pemesanan_id' => $pemesanan->id
            ]);

            Mail::to($pemesanan->customer->email)->send(new InvoiceMail($pemesanan));

            Log::info('Invoice berhasil dikirim.', [
                'pemesanan_id' => $pemesanan->id
            ]);

            return back()->with('success', 'Invoice berhasil dikirim ke email customer.');
        } catch (\Exception $e) {
            Log::error('Gagal mengirim invoice.', [
                'pemesanan_id' => $pemesanan->id,
                'error' => $e->getMessage()
            ]);

            return back()->with('error', 'Gagal mengirim invoice: ' . $e->getMessage());
        }
    }
}

?>