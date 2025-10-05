<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Pemesanan;
use App\Models\Pembayaran;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;

class LaporanController extends Controller
{
    public function index(Request $request)
    {
        $query = Pemesanan::with(['customer', 'tiket', 'pembayaran'])
            ->where('status_pemesanan', 'paid');

        // Terapkan filter berdasarkan request
        $this->applyFilters($query, $request);

        // Ambil total pendapatan & penjualan dari semua data yang terfilter (sebelum di-paginate)
        $totalQuery = clone $query;
        $totalPendapatan = $totalQuery->sum('total_harga');
        $totalPenjualan = $totalQuery->count();

        // Ambil data untuk halaman web dengan pagination (misal: 10 data per halaman)
        $laporans = $query->latest()->paginate(10)->withQueryString();

        $paymentMethods = Pembayaran::select('metode_pembayaran')
                                  ->distinct()
                                  ->pluck('metode_pembayaran');

        return Inertia::render('Admin/Laporan', [
            'laporans' => $laporans,
            // Kirim data total secara terpisah
            'reportTotals' => [
                'pendapatan' => $totalPendapatan,
                'penjualan' => $totalPenjualan,
            ],
            'filters' => $request->all(['quick_filter', 'start_date', 'end_date', 'payment_method']),
            'paymentMethods' => $paymentMethods,
        ]);
    }

    public function generatePdf(Request $request)
    {
        $query = Pemesanan::with(['customer', 'tiket', 'pembayaran'])
            ->where('status_pemesanan', 'paid');

        // Terapkan filter yang sama untuk PDF
        $this->applyFilters($query, $request);

        // Ambil SEMUA data yang terfilter
        $laporans = $query->latest('tanggal_pemesanan')->get();

        // Kelompokkan data berdasarkan Bulan dan Tahun
        $groupedLaporans = $laporans->groupBy(function ($item) {
            return Carbon::parse($item->tanggal_pemesanan)->format('F Y');
        });

        $totalPendapatan = $laporans->sum('total_harga');
        $totalPenjualan = $laporans->count();

        // Load view baru untuk PDF
        $pdf = PDF::loadView('pdf.laporan', [
            'groupedLaporans' => $groupedLaporans,
            'totalPendapatan' => $totalPendapatan,
            'totalPenjualan' => $totalPenjualan,
            'filters' => $request->all(['start_date', 'end_date', 'payment_method']),
        ]);

        return $pdf->download('laporan-penjualan-bromo-trans-' . date('Y-m-d') . '.pdf');
    }

    private function applyFilters($query, Request $request)
    {
        // Quick Filter
        if ($request->filled('quick_filter')) {
            $filter = $request->input('quick_filter');
            if ($filter === 'today') {
                $query->whereDate('tanggal_pemesanan', Carbon::today());
            } elseif ($filter === 'this_week') {
                $query->whereBetween('tanggal_pemesanan', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()]);
            } elseif ($filter === 'this_month') {
                $query->whereMonth('tanggal_pemesanan', Carbon::now()->month)
                      ->whereYear('tanggal_pemesanan', Carbon::now()->year);
            }
        }

        // Filter rentang tanggal
        if ($request->filled('start_date')) {
            $query->whereDate('tanggal_pemesanan', '>=', $request->input('start_date'));
        }
        if ($request->filled('end_date')) {
            $query->whereDate('tanggal_pemesanan', '<=', $request->input('end_date'));
        }

        // Filter metode pembayaran
        if ($request->filled('payment_method')) {
            $query->whereHas('pembayaran', function ($q) use ($request) {
                $q->where('metode_pembayaran', $request->input('payment_method'));
            });
        }
    }
}