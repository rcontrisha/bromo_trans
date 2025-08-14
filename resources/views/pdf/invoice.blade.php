<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Invoice #{{ $pemesanan->id }}</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f9fafb;
            padding: 20px;
        }
        .invoice-container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            overflow: hidden;
        }
        .invoice-header {
            background: linear-gradient(135deg, #2c5282, #3182ce);
            color: white;
            padding: 30px 40px;
            text-align: center;
        }
        .invoice-header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 700;
        }
        .invoice-header p {
            margin: 10px 0 0;
            opacity: 0.9;
        }
        .invoice-body {
            padding: 40px;
        }
        .section {
            margin-bottom: 30px;
        }
        .section-title {
            font-size: 20px;
            font-weight: 600;
            color: #2c5282;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #e2e8f0;
        }
        .detail-grid {
            display: grid;
            grid-template-columns: max-content 1fr;
            gap: 12px 20px;
            font-size: 15px;
        }
        .detail-label {
            font-weight: 600;
            color: #4a5568;
        }
        .detail-value {
            color: #2d3748;
        }
        .passenger-list {
            margin-top: 15px;
        }
        .passenger-item {
            padding: 16px;
            margin-bottom: 12px;
            background-color: #f8fafc;
            border-radius: 8px;
            border-left: 4px solid #2c5282;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);
        }
        .passenger-item p {
            margin: 6px 0;
        }
        .total-price {
            font-size: 20px;
            font-weight: 700;
            color: #2c5282;
        }
        .status-badge {
            display: inline-block;
            padding: 6px 16px;
            border-radius: 20px;
            font-weight: 600;
            background-color: #c6f6d5;
            color: #22543d;
        }
        .payment-method {
            font-weight: 600;
            color: #2c5282;
        }
        .footer {
            background-color: #edf2f7;
            padding: 25px 40px;
            text-align: center;
            color: #4a5568;
            font-size: 14px;
        }
        .divider {
            height: 1px;
            background: #e2e8f0;
            margin: 25px 0;
        }
    </style>
</head>
<body>
    <div class="invoice-container">
        <div class="invoice-header">
            <h1>Invoice Pembayaran</h1>
            <p>Tanggal: {{ now()->format('d M Y H:i') }}</p>
        </div>
        
        <div class="invoice-body">
            <div class="section">
                <h2 class="section-title">Detail Pemesanan</h2>
                <div class="detail-grid">
                    <div class="detail-label">Kode Pemesanan:</div>
                    <div class="detail-value">#{{ $pemesanan->id }}</div>
                    
                    <div class="detail-label">Tujuan:</div>
                    <div class="detail-value">Probolinggo - {{ $pemesanan->tiket->tujuan }}</div>
                    
                    <div class="detail-label">Jadwal Keberangkatan:</div>
                    <div class="detail-value">
                        {{ \Carbon\Carbon::parse($pemesanan->tiket->jadwal_keberangkatan)->translatedFormat('l, j F Y') }} 
                        pukul {{ \Carbon\Carbon::parse($pemesanan->tiket->jadwal_keberangkatan)->format('H:i') }}
                    </div>
                    
                    <div class="detail-label">Tanggal Pemesanan:</div>
                    <div class="detail-value">
                        {{ \Carbon\Carbon::parse($pemesanan->tanggal_pemesanan)->translatedFormat('j/n/Y, H.i.s') }}
                    </div>
                    
                    <div class="detail-label">Jumlah Tiket:</div>
                    <div class="detail-value">{{ $pemesanan->jumlah_tiket }} orang</div>
                    
                    <div class="detail-label">Total Harga:</div>
                    <div class="detail-value total-price">
                        Rp {{ number_format($pemesanan->total_harga, 0, ',', '.') }}
                    </div>
                    
                    <div class="detail-label">Status Pemesanan:</div>
                    <div class="detail-value">
                        <span class="status-badge">{{ ucfirst($pemesanan->status_pemesanan) }}</span>
                    </div>
                    
                    <div class="detail-label">Informasi Kendaraan:</div>
                    <div class="detail-value">
                        {{ $pemesanan->tiket->mobil->tipe_mobil }} — {{ $pemesanan->tiket->mobil->plat_nomor }}
                    </div>
                </div>
            </div>
            
            <div class="divider"></div>
            
            <div class="section">
                <h2 class="section-title">Data Penumpang</h2>
                <div class="passenger-list">
                    @foreach(json_decode($pemesanan->data_penumpang, true) as $index => $penumpang)
                        <div class="passenger-item">
                            <p><span class="detail-label">Nama:</span> {{ $penumpang['nama'] }}</p>
                            <p><span class="detail-label">Kontak:</span> {{ $penumpang['kontak'] }}</p>
                        </div>
                    @endforeach
                </div>
            </div>
            
            <div class="divider"></div>
            
            <div class="section">
                <h2 class="section-title">Detail Pembayaran</h2>
                <div class="detail-grid">
                    <div class="detail-label">Metode Pembayaran:</div>
                    <div class="detail-value payment-method">
                        {{ ucfirst($pemesanan->pembayaran->metode_pembayaran) }}
                    </div>
                    
                    <div class="detail-label">Jumlah Pembayaran:</div>
                    <div class="detail-value">
                        Rp {{ number_format($pemesanan->pembayaran->jumlah_pembayaran, 0, ',', '.') }}
                    </div>
                    
                    <div class="detail-label">Tanggal Pembayaran:</div>
                    <div class="detail-value">
                        {{ \Carbon\Carbon::parse($pemesanan->pembayaran->tanggal_pembayaran)->translatedFormat('j/n/Y, H.i.s') }}
                    </div>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <p>Terima kasih telah menggunakan layanan Bromo Trans.</p>
            <p>&copy; {{ date('Y') }} Bromo Trans. Semua hak dilindungi.</p>
        </div>
    </div>
</body>
</html>