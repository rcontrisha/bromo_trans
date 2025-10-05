<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\MobilController;
use App\Http\Controllers\Admin\TiketController;
use App\Http\Controllers\Customer\TiketController as CustomerTiketController;
use App\Http\Controllers\Customer\PembayaranController;
use App\Http\Controllers\Admin\PembayaranController as AdminPembayaranController;
use App\Http\Controllers\Admin\LaporanController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Models\Admin;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
    Route::resource('mobil', MobilController::class);
    Route::resource('tiket', TiketController::class);
    Route::get('/pembayaran', [AdminPembayaranController::class, 'index'])->name('pembayaran.index');
    Route::post('/pembayaran/{pembayaran}/konfirmasi', [AdminPembayaranController::class, 'konfirmasi'])->name('pembayaran.konfirmasi');
    Route::post('/pembayaran/{pembayaran}/tolak', [AdminPembayaranController::class, 'tolak'])->name('pembayaran.tolak');
    Route::post('/pembayaran/kirim-invoice/{id}', [AdminPembayaranController::class, 'kirimInvoice'])->name('pembayaran.kirimInvoice');
    Route::get('/laporan', [LaporanController::class, 'index'])->name('laporan.index');
    Route::get('/laporan/pdf', [LaporanController::class, 'generatePdf'])->name('laporan.pdf');
});

Route::middleware(['auth', 'role:customer'])->group(function () {
    Route::get('/jadwal', [CustomerTiketController::class, 'index'])->name('customer.jadwal');
    Route::post('/pemesanan', [CustomerTiketController::class, 'store'])->name('customer.pemesanan.store');
    Route::get('/pesanan', [CustomerTiketController::class, 'pesananSaya'])->name('customer.pesanan');
    Route::post('/pembayaran', [PembayaranController::class, 'store'])->name('pembayaran.store');
    Route::post('/pemesanan/cancel', [PembayaranController::class, 'cancel'])->name('pemesanan.cancel');
    Route::get('/pesanan/{pemesanan}/invoice', [PembayaranController::class, 'downloadInvoice'])->name('pemesanan.invoice');
});

require __DIR__.'/auth.php';
