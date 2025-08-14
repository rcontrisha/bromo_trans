<!DOCTYPE html>
<html>
<head>
    <title>Invoice Pembayaran</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f9fafb;
            padding: 20px;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            overflow: hidden;
        }
        .email-header {
            background: linear-gradient(135deg, #2c5282, #3182ce);
            color: white;
            padding: 25px;
            text-align: center;
        }
        .email-header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 700;
        }
        .email-body {
            padding: 30px;
            line-height: 1.6;
            color: #4a5568;
        }
        .email-button {
            display: inline-block;
            margin: 20px 0;
            padding: 12px 24px;
            background-color: #3182ce;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
        }
        .email-footer {
            padding: 20px;
            text-align: center;
            color: #718096;
            font-size: 14px;
            border-top: 1px solid #e2e8f0;
        }
        .highlight {
            color: #2c5282;
            font-weight: 600;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1>Invoice Pembayaran Bromo Trans</h1>
        </div>
        
        <div class="email-body">
            <p>Halo {{ $pemesanan->customer->nama }},</p>
            
            <p>Terima kasih telah melakukan pemesanan di Bromo Trans. Berikut adalah detail pemesanan Anda:</p>
            
            <ul>
                <li><span class="highlight">Kode Pemesanan:</span> #{{ $pemesanan->id }}</li>
                <li><span class="highlight">Tujuan:</span> Probolinggo - {{ $pemesanan->tiket->tujuan }}</li>
                <li><span class="highlight">Jadwal:</span> {{ \Carbon\Carbon::parse($pemesanan->tiket->jadwal_keberangkatan)->translatedFormat('l, j F Y \p\u\k\u\l H:i') }}</li>
                <li><span class="highlight">Total Pembayaran:</span> Rp {{ number_format($pemesanan->total_harga, 0, ',', '.') }}</li>
                <li><span class="highlight">Status:</span> {{ ucfirst($pemesanan->status_pemesanan) }}</li>
            </ul>
            
            <p>Invoice lengkap telah kami lampirkan dalam format PDF pada email ini.</p>
            
            <div style="text-align: center;">
                <a href="{{ url('/') }}" class="email-button">Kunjungi Website Kami</a>
            </div>
            
            <p>Jika Anda memiliki pertanyaan atau membutuhkan bantuan, jangan ragu untuk menghubungi kami.</p>
        </div>
        
        <div class="email-footer">
            <p>&copy; {{ date('Y') }} Bromo Trans. Semua hak dilindungi.</p>
            <p>Email ini dikirim secara otomatis, harap tidak membalas.</p>
        </div>
    </div>
</body>
</html>