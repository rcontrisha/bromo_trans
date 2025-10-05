<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Invoice #{{ $pemesanan->id }}</title>
    <style>
        body {
            font-family: 'Helvetica', DejaVu Sans, sans-serif;
            font-size: 12px;
            color: #333;
        }
        .container {
            width: 100%;
            padding: 20px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        .header-table td {
            vertical-align: top;
        }
        .header-table .logo {
            width: 80px;
        }
        .header-table .company-details {
            text-align: right;
        }
        .header-table h1 {
            margin: 0;
            font-size: 24px;
            color: #2c5282;
        }
        .details-table {
            margin-top: 30px;
            margin-bottom: 30px;
        }
        .details-table td {
            vertical-align: top;
            padding: 2px 0;
            width: 50%;
        }
        .items-table {
            margin-top: 20px;
            border: 1px solid #ddd;
        }
        .items-table th, .items-table td {
            border: 1px solid #ddd;
            padding: 10px;
            text-align: left;
        }
        .items-table thead th {
            background-color: #f2f2f2;
            font-weight: bold;
        }
        .items-table .text-right {
            text-align: right;
        }
        .total-section {
            margin-top: 20px;
        }
        .total-table {
            width: 45%;
            float: right;
        }
        .total-table td {
            padding: 8px;
        }
        .total-table .total-label {
            font-weight: bold;
        }
        .total-table .grand-total td {
            font-size: 16px;
            font-weight: bold;
            background-color: #e2e8f0;
        }
        .footer {
            position: fixed;
            bottom: 20px;
            left: 20px;
            right: 20px;
            text-align: center;
            font-size: 10px;
            color: #888;
            border-top: 1px solid #ddd;
            padding-top: 10px;
        }
        .status-paid {
            color: #28a745;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <table class="header-table">
            <tr>
                <td class="logo">
                    <img src="{{ public_path('images/logo.png') }}" alt="Logo" style="width: 70px;">
                </td>
                <td class="company-details">
                    <h1>INVOICE</h1>
                    <p>
                        <strong>Bromo Trans Travel</strong><br>
                        Jl. Raya Bromo No.2, Sukapura, Probolinggo<br>
                        bromotrans.travel@gmail.com
                    </p>
                </td>
            </tr>
        </table>

        <table class="details-table">
            <tr>
                <td>
                    <strong>Ditagihkan Kepada:</strong><br>
                    {{ $pemesanan->customer->nama }}<br>
                    {{ $pemesanan->customer->no_hp }}<br>
                    {{ $pemesanan->customer->alamat }}
                </td>
                <td style="text-align: right;">
                    <strong>Invoice #:</strong> {{ $pemesanan->id }}<br>
                    <strong>Tanggal Pesan:</strong> {{ \Carbon\Carbon::parse($pemesanan->tanggal_pemesanan)->format('d M Y') }}<br>
                    <strong>Tanggal Bayar:</strong> {{ \Carbon\Carbon::parse($pemesanan->pembayaran->tanggal_pembayaran)->format('d M Y') }}<br>
                    <strong>Status:</strong> <span class="status-paid">LUNAS</span>
                </td>
            </tr>
        </table>

        <table class="items-table">
            <thead>
                <tr>
                    <th>Deskripsi</th>
                    <th class="text-right">Jumlah</th>
                    <th class="text-right">Harga Satuan</th>
                    <th class="text-right">Subtotal</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <strong>Tiket Perjalanan: Probolinggo - {{ $pemesanan->tiket->tujuan }}</strong><br>
                        <small>
                            Jadwal: {{ \Carbon\Carbon::parse($pemesanan->tiket->jadwal_keberangkatan)->translatedFormat('l, d M Y, H:i') }}<br>
                            Armada: {{ $pemesanan->tiket->mobil->tipe_mobil }} ({{ $pemesanan->tiket->mobil->plat_nomor }})
                        </small>
                    </td>
                    <td class="text-right">{{ $pemesanan->jumlah_tiket }}</td>
                    <td class="text-right">Rp {{ number_format($pemesanan->total_harga / $pemesanan->jumlah_tiket, 0, ',', '.') }}</td>
                    <td class="text-right">Rp {{ number_format($pemesanan->total_harga, 0, ',', '.') }}</td>
                </tr>
            </tbody>
        </table>

        <div class="total-section">
            <table class="total-table">
                <tr>
                    <td class="total-label">Subtotal</td>
                    <td class="text-right">Rp {{ number_format($pemesanan->total_harga, 0, ',', '.') }}</td>
                </tr>
                <tr>
                    <td class="total-label">Pajak (0%)</td>
                    <td class="text-right">Rp 0</td>
                </tr>
                <tr class="grand-total">
                    <td>Total Pembayaran</td>
                    <td class="text-right">Rp {{ number_format($pemesanan->total_harga, 0, ',', '.') }}</td>
                </tr>
            </table>
        </div>

        <div class="footer">
            Terima kasih telah melakukan perjalanan bersama Bromo Trans Travel.
        </div>
    </div>
</body>
</html>