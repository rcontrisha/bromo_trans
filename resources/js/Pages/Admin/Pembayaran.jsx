import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Pembayaran({ auth, pembayarans, filters }) {
    const { flash = {} } = usePage().props;
    const [from, setFrom] = useState(filters?.from || '');
    const [to, setTo] = useState(filters?.to || '');
    const [metode, setMetode] = useState(filters?.metode || '');
    const [status, setStatus] = useState(filters?.status || ''); // 🔥 baru
    const [quick, setQuick] = useState(filters?.quick || '');

    const applyFilter = () => {
        router.get(route('admin.pembayaran.index'), { from, to, metode, status, quick }, { preserveState: true });
    };

    const clearFilter = () => {
        setFrom('');
        setTo('');
        setMetode('');
        setStatus('');
        setQuick('');
        router.get(route('admin.pembayaran.index'));
    };

    const handleQuickFilter = (type) => {
        setQuick(type);
        setFrom('');
        setTo('');
        router.get(route('admin.pembayaran.index'), { quick: type }, { preserveState: true });
    };

    const handleKonfirmasi = (id) => {
        if (confirm('Yakin ingin menyetujui pembayaran ini?')) {
            router.post(route('admin.pembayaran.konfirmasi', { pembayaran: id }));
        }
    };

    const handleTolak = (id) => {
        if (confirm('Tolak pembayaran ini?')) {
            router.post(route('admin.pembayaran.tolak', { pembayaran: id }));
        }
    };

    const handleKirimInvoice = (id) => {
        if (confirm('Kirim invoice ke customer?')) {
            router.post(route('admin.pembayaran.kirimInvoice', { id }));
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Pembayaran Masuk" />

            <div className="max-w-7xl mx-auto p-6 space-y-6">
                <h1 className="text-2xl font-bold text-gray-800">Pembayaran Masuk</h1>

                {/* Alert */}
                {flash.success && (
                    <div className="bg-green-100 text-green-800 px-4 py-2 rounded border border-green-200">
                        {flash.success}
                    </div>
                )}

                {/* Filter Section */}
                <div className="p-4 bg-white rounded-lg shadow">
                    <div className="flex flex-wrap items-end justify-between gap-4">
                        {/* Kiri: Semua Filter */}
                        <div className="flex flex-wrap items-end gap-4">
                            {/* Filter Cepat */}
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700 mb-1">Filter Cepat</label>
                                <div className="flex space-x-2">
                                    {['today', 'week', 'month'].map((filter) => (
                                        <button
                                        key={filter}
                                        onClick={() => handleQuickFilter(filter)}
                                        className={`px-3 py-2 text-sm rounded-md transition ${
                                            quick === filter
                                            ? 'bg-indigo-600 text-white'
                                            : 'bg-gray-200 hover:bg-gray-300'
                                        }`}
                                        >
                                        {filter === 'today'
                                            ? 'Hari Ini'
                                            : filter === 'week'
                                            ? 'Minggu Ini'
                                            : 'Bulan Ini'}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Dari & Sampai Tanggal */}
                            <div className="flex flex-col md:flex-row md:space-x-2">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-1">Dari Tanggal</label>
                                    <input
                                        type="date"
                                        value={from}
                                        onChange={(e) => setFrom(e.target.value)}
                                        className="w-full border-gray-300 rounded-md shadow-sm"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-1">Sampai Tanggal</label>
                                    <input
                                        type="date"
                                        value={to}
                                        onChange={(e) => setTo(e.target.value)}
                                        className="w-full border-gray-300 rounded-md shadow-sm"
                                    />
                                </div>
                            </div>

                            {/* Metode Pembayaran */}
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700 mb-1">Metode Pembayaran</label>
                                <select
                                    value={metode}
                                    onChange={(e) => setMetode(e.target.value)}
                                    className="w-40 border-gray-300 rounded-md shadow-sm"
                                >
                                    <option value="">Semua</option>
                                    <option value="bni">BNI</option>
                                    <option value="bri">BRI</option>
                                    <option value="bca">BCA</option>
                                    <option value="qris">QRIS</option>
                                </select>
                            </div>

                            {/* Status Pembayaran */}
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700 mb-1">Status Pembayaran</label>
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="w-40 border-gray-300 rounded-md shadow-sm"
                                >
                                    <option value="">Semua</option>
                                    <option value="pending">Menunggu</option>
                                    <option value="paid">Lunas</option>
                                    <option value="rejected">Ditolak</option>
                                    <option value="cancelled">Dibatalkan</option>
                                </select>
                            </div>
                        </div>

                        {/* Kanan: Tombol Aksi */}
                        <div className="flex space-x-2 shrink-0">
                            <button
                                onClick={applyFilter}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md shadow whitespace-nowrap"
                            >
                                Terapkan Filter
                            </button>
                            <button
                                onClick={clearFilter}
                                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md shadow whitespace-nowrap"
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto bg-white rounded shadow">
                    <table className="min-w-full text-sm text-left border">
                        <thead className="bg-gray-100 text-gray-700 font-semibold">
                            <tr>
                                <th className="p-3 border">ID</th>
                                <th className="p-3 border">Customer</th>
                                <th className="p-3 border">Metode</th>
                                <th className="p-3 border">Jumlah</th>
                                <th className="p-3 border">Bukti</th>
                                <th className="p-3 border">Status</th>
                                <th className="p-3 border">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pembayarans.length > 0 ? (
                                pembayarans.map((pembayaran) => {
                                    const isLunas = pembayaran.pemesanan.status_pemesanan === 'paid';
                                    return (
                                        <tr key={pembayaran.id} className="hover:bg-gray-50 transition">
                                            <td className="p-3 border">{pembayaran.id}</td>
                                            <td className="p-3 border">
                                                {pembayaran.pemesanan?.customer?.nama ?? '-'}
                                            </td>
                                            <td className="p-3 border capitalize">{pembayaran.metode_pembayaran}</td>
                                            <td className="p-3 border">
                                                Rp {parseFloat(pembayaran.jumlah_pembayaran).toLocaleString('id-ID')}
                                            </td>
                                            <td className="p-3 border">
                                                {pembayaran.bukti_transfer ? (
                                                    <a
                                                        href={`/storage/${pembayaran.bukti_transfer}`}
                                                        target="_blank"
                                                        className="text-blue-600 underline"
                                                    >
                                                        Lihat Bukti
                                                    </a>
                                                ) : (
                                                    <span className="text-gray-500">-</span>
                                                )}
                                            </td>
                                            <td className="p-3 border capitalize">
                                                {pembayaran.pemesanan.status_pemesanan === "paid" ? (
                                                    <span className="text-green-600 font-semibold">Lunas</span>
                                                ) : pembayaran.pemesanan.status_pemesanan === "rejected" ? (
                                                    <span className="text-red-600 font-semibold">Ditolak</span>
                                                ) : pembayaran.pemesanan.status_pemesanan === "cancelled" ? (
                                                    <span className="text-gray-500 font-semibold">Dibatalkan</span>
                                                ) : (
                                                    <span className="text-yellow-600">Menunggu</span>
                                                )}
                                            </td>
                                            <td className="p-3 border">
                                                {isLunas ? (
                                                    <button
                                                        onClick={() => handleKirimInvoice(pembayaran.pemesanan.id)}
                                                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition"
                                                    >
                                                        Kirim Invoice
                                                    </button>
                                                ) : (
                                                    <div className="space-x-2">
                                                        <button
                                                            onClick={() => handleKonfirmasi(pembayaran.id)}
                                                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded transition"
                                                        >
                                                            Konfirmasi
                                                        </button>
                                                        <button
                                                            onClick={() => handleTolak(pembayaran.id)}
                                                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition"
                                                        >
                                                            Tolak
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center text-gray-500 p-4">
                                        Tidak ada data pembayaran.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
