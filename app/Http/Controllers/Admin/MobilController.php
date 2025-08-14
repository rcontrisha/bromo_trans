<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Mobil;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class MobilController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Mobil', [
            'mobils' => Mobil::latest()->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Mobil/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'plat_nomor' => 'required|unique:mobils',
            'tipe_mobil' => 'required|string',
            'kapasitas' => 'required|integer|min:1',
        ]);

        Mobil::create($request->only('plat_nomor', 'tipe_mobil', 'kapasitas'));

        return redirect()->route('admin.mobil.index')->with('success', 'Mobil ditambahkan!');
    }

    public function edit(Mobil $mobil)
    {
        return Inertia::render('Admin/Mobil/Edit', [
            'mobil' => $mobil,
        ]);
    }

    public function update(Request $request, Mobil $mobil)
    {
        Log::info('=== Update Mobil ===');
        Log::info('Request Data:', $request->all());
        Log::info('Mobil Param:', $mobil->toArray());
        Log::info('Mobil ID Param:', ['id' => $mobil->id]); // ✅ Fix here

        $request->validate([
            'plat_nomor' => 'required|unique:mobils,plat_nomor,' . $mobil->id . ',id',
            'tipe_mobil' => 'required|string',
            'kapasitas' => 'required|integer|min:1',
        ]);

        $mobil->update($request->only('plat_nomor', 'tipe_mobil', 'kapasitas'));

        return redirect()->route('admin.mobil.index')->with('success', 'Mobil diperbarui!');
    }

    public function destroy(Mobil $mobil)
    {
        $mobil->delete();
        return redirect()->route('admin.mobil.index')->with('success', 'Mobil dihapus.');
    }
}
