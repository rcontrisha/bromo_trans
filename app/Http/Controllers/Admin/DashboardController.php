<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Pemesanan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // 1. Data untuk Stat Cards
        $totalPendapatan = Pemesanan::where('status_pemesanan', 'paid')->sum('total_harga');
        $totalPemesanan = Pemesanan::where('status_pemesanan', 'paid')->count();
        $totalCustomer = Customer::count();
        $totalTiketTerjual = Pemesanan::where('status_pemesanan', 'paid')->sum('jumlah_tiket');

        // 2. Data untuk Grafik Penjualan (12 bulan terakhir)
        $salesData = Pemesanan::select(
            DB::raw('YEAR(tanggal_pemesanan) as year'),
            DB::raw('MONTHNAME(tanggal_pemesanan) as month_name'),
            DB::raw('MONTH(tanggal_pemesanan) as month'),
            DB::raw('SUM(total_harga) as total_sales')
        )
        ->where('status_pemesanan', 'paid')
        ->where('tanggal_pemesanan', '>=', now()->subYear())
        ->groupBy('year', 'month_name', 'month')
        ->orderBy('year', 'asc')
        ->orderBy('month', 'asc')
        ->get();

        // Format data untuk Chart.js
        $chartLabels = $salesData->map(fn($data) => substr($data->month_name, 0, 3)); // Jan, Feb, Mar
        $chartData = $salesData->map(fn($data) => $data->total_sales);

        // 3. Data untuk Tabel Pesanan Terbaru
        $recentOrders = Pemesanan::with('customer')
            ->where('status_pemesanan', 'paid')
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'pendapatan' => $totalPendapatan,
                'pemesanan' => $totalPemesanan,
                'customer' => $totalCustomer,
                'tiket' => $totalTiketTerjual,
            ],
            'salesChart' => [
                'labels' => $chartLabels,
                'data' => $chartData,
            ],
            'recentOrders' => $recentOrders,
        ]);
    }
}