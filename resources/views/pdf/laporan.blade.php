<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Laporan Penjualan</title>
    <style>
        @page {
            margin: 0cm 0cm;
        }
        body {
            font-family: 'Helvetica', sans-serif;
            color: #333;
            font-size: 11px;
            margin: 2.5cm 1.5cm 1.5cm 1.5cm;
        }
        .header {
            position: fixed;
            top: 1cm;
            left: 1.5cm;
            right: 1.5cm;
            height: 1.5cm;
            text-align: left;
            border-bottom: 1px solid #ddd;
            padding-bottom: 10px;
        }
        .header .logo {
            float: left;
            height: 40px;
            width: auto;
        }
        .header .company-details {
            float: right;
            text-align: right;
            font-size: 10px;
        }
        .footer {
            position: fixed;
            bottom: 0.5cm;
            left: 1.5cm;
            right: 1.5cm;
            height: 1cm;
            text-align: center;
            font-size: 9px;
            color: #888;
        }
        .footer .page-number:before {
            content: "Halaman " counter(page);
        }
        .report-title {
            text-align: center;
            margin-bottom: 20px;
        }
        .report-title h1 {
            margin: 0;
            font-size: 20px;
            color: #2c5282;
        }
        .report-title p {
            margin-top: 5px;
            font-size: 12px;
            color: #555;
        }
        .summary-box {
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 25px;
            width: 100%;
        }
        .summary-box table {
            width: 100%;
            border-collapse: collapse;
        }
        .summary-box td {
            padding: 5px;
            font-size: 13px;
        }
        table.data-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        .data-table th, .data-table td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        .data-table th {
            background-color: #e2e8f0;
            font-weight: bold;
            font-size: 11px;
        }
        .data-table .text-right { text-align: right; }
        .data-table .text-center { text-align: center; }
        .month-header {
            background-color: #2c5282;
            color: white;
            padding: 8px 12px;
            font-size: 14px;
            font-weight: bold;
            margin-top: 25px;
            margin-bottom: 10px;
            border-radius: 4px;
        }
        .subtotal-row td {
            background-color: #f7fafc;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="header">
        <img src="{{ public_path('images/logo.png') }}" alt="Logo" class="logo"/>
        <div class="company-details">
            <strong>Bromo Trans Travel</strong><br>
            Jl. Raya Bromo No.2, Sukapura, Probolinggo<br>
            bromotrans.travel@gmail.com
        </div>
    </div>

    <div class="footer">
        <div class="page-number"></div>
    </div>

    <main>
        <div class="report-title">
            <h1>Laporan Penjualan</h1>
            @php
                $startDate = !empty($filters['start_date']) ? \Carbon\Carbon::parse($filters['start_date'])->format('d M Y') : null;
                $endDate = !empty($filters['end_date']) ? \Carbon\Carbon::parse($filters['end_date'])->format('d M Y') : 'Sekarang';
            @endphp
            <p>
                @if($startDate)
                    Periode: {{ $startDate }} - {{ $endDate }}
                @else
                    Semua Transaksi
                @endif
            </p>
            <p style="font-size: 9px;">Dicetak pada: {{ now()->translatedFormat('l, d F Y H:i') }}</p>
        </div>

        <div class="summary-box">
            <table>
                <tr>
                    <td><strong>Total Seluruh Transaksi</strong></td>
                    <td class="text-right"><strong>{{ $totalPenjualan }}</strong></td>
                </tr>
                <tr>
                    <td><strong>Total Seluruh Pendapatan</strong></td>
                    <td class="text-right"><strong>Rp {{ number_format($totalPendapatan, 0, ',', '.') }}</strong></td>
                </tr>
            </table>
        </div>

        @forelse($groupedLaporans as $bulan => $laporans)
            <div class="month-header">{{ $bulan }}</div>
            <table class="data-table">
                <thead>
                    <tr>
                        <th class="text-center">No</th>
                        <th>Tanggal</th>
                        <th>Kode</th>
                        <th>Customer</th>
                        <th>Metode</th>
                        <th class="text-center">Jml Tiket</th>
                        <th class="text-right">Total Harga</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($laporans as $index => $laporan)
                        <tr>
                            <td class="text-center">{{ $index + 1 }}</td>
                            <td>{{ \Carbon\Carbon::parse($laporan->tanggal_pemesanan)->format('d-m-Y') }}</td>
                            <td>#{{ $laporan->id }}</td>
                            <td>{{ $laporan->customer->nama }}</td>
                            <td style="text-transform: uppercase;">{{ $laporan->pembayaran->metode_pembayaran ?? 'N/A' }}</td>
                            <td class="text-center">{{ $laporan->jumlah_tiket }}</td>
                            <td class="text-right">Rp {{ number_format($laporan->total_harga, 0, ',', '.') }}</td>
                        </tr>
                    @endforeach
                </tbody>
                <tfoot>
                    <tr class="subtotal-row">
                        <td colspan="5"><strong>Subtotal Bulan {{ $bulan }}</strong></td>
                        <td class="text-center"><strong>{{ $laporans->sum('jumlah_tiket') }}</strong></td>
                        <td class="text-right"><strong>Rp {{ number_format($laporans->sum('total_harga'), 0, ',', '.') }}</strong></td>
                    </tr>
                </tfoot>
            </table>
        @empty
            <p style="text-align:center;">Tidak ada data penjualan pada periode yang dipilih.</p>
        @endforelse
    </main>
</body>
</html>