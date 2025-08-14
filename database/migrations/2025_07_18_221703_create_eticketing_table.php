<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. customers
        Schema::create('customers', function (Blueprint $table) {
            $table->id(); // <-- now uses Laravel default 'id'
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('nama');
            $table->string('email')->unique();
            $table->string('no_hp', 20)->nullable();
            $table->text('alamat')->nullable();
            $table->timestamps();
        });

        // 2. admins
        Schema::create('admins', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('username')->unique();
            $table->string('password');
            $table->string('nama_admin');
            $table->text('alamat')->nullable();
            $table->timestamps();
        });

        // 3. mobils
        Schema::create('mobils', function (Blueprint $table) {
            $table->id();
            $table->string('plat_nomor')->unique();
            $table->string('tipe_mobil');
            $table->integer('kapasitas');
            $table->timestamps();
        });

        // 4. tikets
        Schema::create('tikets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mobil_id')->nullable()->constrained('mobils')->onDelete('set null');
            $table->string('tujuan');
            $table->dateTime('jadwal_keberangkatan');
            $table->decimal('harga_tiket', 10, 2);
            $table->timestamps();
        });

        // 5. pemesanans
        Schema::create('pemesanans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_id')->constrained('customers')->onDelete('cascade');
            $table->foreignId('tiket_id')->nullable()->constrained('tikets')->onDelete('set null');
            $table->date('tanggal_pemesanan');
            $table->enum('status_pemesanan', ['booked', 'paid', 'cancelled'])->default('booked');
            $table->decimal('total_harga', 10, 2);
            $table->timestamps();
        });

        // 6. pembayarans
        Schema::create('pembayarans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pemesanan_id')->constrained('pemesanans')->onDelete('cascade');
            $table->enum('metode_pembayaran', ['cash', 'transfer', 'qris'])->default('transfer');
            $table->string('bukti_transfer')->nullable();
            $table->dateTime('tanggal_pembayaran')->nullable();
            $table->decimal('jumlah_pembayaran', 10, 2);
            $table->timestamps();
        });

        // 7. laporans
        Schema::create('laporans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('admin_id')->nullable()->constrained('admins')->onDelete('set null');
            $table->string('periode');
            $table->integer('jumlah_tiket_terjual')->default(0);
            $table->decimal('total_pendapatan', 15, 2)->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('laporans');
        Schema::dropIfExists('pembayarans');
        Schema::dropIfExists('pemesanans');
        Schema::dropIfExists('tikets');
        Schema::dropIfExists('mobils');
        Schema::dropIfExists('admins');
        Schema::dropIfExists('customers');
    }
};
