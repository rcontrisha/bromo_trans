<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Tiket;
use App\Models\Pemesanan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class TiketController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tikets = \App\Models\Tiket::with('mobil')->latest()->get();

        foreach ($tikets as $tiket) {
            $terpakai = DB::table('pemesanans')
                ->where('tiket_id', $tiket->id)
                ->sum('jumlah_tiket');
            $kapasitas = $tiket->mobil ? $tiket->mobil->kapasitas : 0;
            $tiket->kursi_tersedia = max($kapasitas - $terpakai, 0);
        }

        $customer = Auth::user()->customer;

        return \Inertia\Inertia::render('Customer/Jadwal', [
            'tikets' => $tikets,
            'customer' => $customer,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'tiket_id' => 'required|exists:tikets,id',
            'jumlah_tiket' => 'required|integer|min:1',
            'penumpangs' => 'required|array',
            'penumpangs.*.nama' => 'required|string|max:255',
            'penumpangs.*.kontak' => 'required|string|max:255',
        ]);

        $tiket = Tiket::findOrFail($request->tiket_id);

        // Tentukan harga tiket masuk kawasan
        $jadwal = $tiket->jadwal_keberangkatan;
        // Pastikan format tanggal sesuai ISO agar strtotime benar
        $timestamp = strtotime(str_replace(' ', 'T', $jadwal));
        $dayOfWeek = (int)date('w', $timestamp); // 0 = Minggu, 6 = Sabtu
        $hargaTiketMasuk = ($dayOfWeek === 0 || $dayOfWeek === 6) ? 89000 : 64000;

        // Total harga = (harga tiket + tiket masuk) * jumlah tiket
        $totalHarga = ($tiket->harga_tiket + $hargaTiketMasuk) * $request->jumlah_tiket;

        $customer = Auth::user()->customer;

        Pemesanan::create([
            'customer_id' => $customer->id,
            'tiket_id' => $tiket->id,
            'jumlah_tiket' => $request->jumlah_tiket,
            'tanggal_pemesanan' => now(),
            'status_pemesanan' => 'booked',
            'total_harga' => $totalHarga,
            'data_penumpang' => json_encode($request->penumpangs),
        ]);

        return redirect()->back()->with('success', 'Tiket berhasil dipesan!');
    }   

    public function pesananSaya()
    {
        $customer = Auth::user()->customer;

        $pemesanans = Pemesanan::with('tiket.mobil')
            ->where('customer_id', $customer->id)
            ->latest()
            ->get();

        return Inertia::render('Customer/PesananSaya', [
            'pemesanans' => $pemesanans,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
