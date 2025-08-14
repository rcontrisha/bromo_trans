<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Tiket;
use App\Models\Mobil;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class TiketController extends Controller
{
    public function index()
    {
        $tikets = Tiket::with('mobil')->latest()->get();
        $mobils = Mobil::all();

        // Hitung jumlah seat terpakai untuk setiap tiket
        $tiketStatus = [];
        foreach ($tikets as $tiket) {
            $terpakai = DB::table('pemesanans')
                ->where('tiket_id', $tiket->id)
                ->count();
            $kapasitas = $tiket->mobil ? $tiket->mobil->kapasitas : 0;
            $tersedia = max($kapasitas - $terpakai, 0);
            $tiketStatus[$tiket->id] = [
                'tersedia' => $tersedia,
                'kapasitas' => $kapasitas,
            ];
        }

        return Inertia::render('Admin/Tiket', [
            'tikets' => $tikets,
            'mobils' => $mobils,
            'tiketStatus' => $tiketStatus,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'tujuan' => 'required|string|max:255',
            'jadwal_keberangkatan' => 'required|date',
            'harga_tiket' => 'required|numeric',
            'mobil_id' => 'required|exists:mobils,id',
        ]);

        Tiket::create($validated);
        return redirect()->back();
    }

    public function update(Request $request, Tiket $tiket)
    {
        $validated = $request->validate([
            'tujuan' => 'required|string|max:255',
            'jadwal_keberangkatan' => 'required|date',
            'harga_tiket' => 'required|numeric',
            'mobil_id' => 'required|exists:mobils,id',
        ]);

        $tiket->update($validated);
        return redirect()->back();
    }

    public function destroy(Tiket $tiket)
    {
        $tiket->delete();
        return redirect()->back();
    }
}
