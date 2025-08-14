<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Admin;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        // Buat akun user terlebih dahulu
        $user = User::create([
            'name' => 'Admin Bromo',
            'email' => 'admin@bromo.test',
            'password' => Hash::make('admin1234'), // ganti kalo perlu
            'role' => 'admin',
        ]);

        // Buat data admin
        Admin::create([
            'user_id' => $user->id,
            'nama_admin' => 'Admin Bromo',
            'alamat' => 'Jl. Admin No. 1',
        ]);
    }
}
