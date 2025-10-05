import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, usePage } from '@inertiajs/react';

export default function Pembayaran({ auth, pembayarans }) {
    const { flash = {} } = usePage().props;

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
            router.post(route('admin.pembayaran.kirimInvoice', { id: id })); // Ubah parameter menjadi id
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Pembayaran Masuk" />

            <div className="max-w-6xl mx-auto p-6 space-y-6">
                <h1 className="text-2xl font-bold text-gray-800">Pembayaran Masuk</h1>

                {flash.success && (
                    <div className="bg-green-100 text-green-800 px-4 py-2 rounded border border-green-200">
                        {flash.success}
                    </div>
                )}

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
                            {pembayarans.map((pembayaran) => {
                                const isLunas = pembayaran.pemesanan.status_pemesanan === 'paid';

                                return (
                                    <tr key={pembayaran.pemesanan.id} className="hover:bg-gray-50 transition">
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
                                            {pembayaran.pemesanan.status_pemesanan === "paid" ? (
                                                <button
                                                onClick={() => handleKirimInvoice(pembayaran.pemesanan.id)}
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition"
                                                >
                                                Kirim Invoice
                                                </button>
                                            ) : pembayaran.pemesanan.status_pemesanan === "rejected" ? (
                                                <span className="text-red-600 font-semibold"></span>
                                            ) : pembayaran.pemesanan.status_pemesanan === "cancelled" ? (
                                                <span className="text-gray-500 font-semibold"></span>
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
                            })}
                            {pembayarans.length === 0 && (
                                <tr>
                                    <td colSpan="7" className="text-center text-gray-500 p-4">
                                        Belum ada pembayaran masuk.
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
