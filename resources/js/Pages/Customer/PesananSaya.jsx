import { useState } from 'react';
import LandingLayout from '@/Layouts/LandingLayout';
import LandingNavbar from '@/Components/LandingNavbar';
import { Head } from '@inertiajs/react';

function getStatusLabel(status) {
    switch (status) {
        case 'paid':
            return 'Lunas';
        case 'booked':
            return 'Belum Bayar';
        case 'waiting confirmation':
            return 'Menunggu Konfirmasi';
        case 'canceled':
            return 'Dibatalkan';
        default:
            return status;
    }
}

export default function PesananSaya({ auth, pemesanans }) {
    const [showModal, setShowModal] = useState(false);
    const [selectedPesanan, setSelectedPesanan] = useState(null);

    const openModal = (pesanan) => {
        setSelectedPesanan(pesanan);
        setShowModal(true);
    };

    const parsePenumpang = (data) => {
        try {
            return JSON.parse(data);
        } catch {
            return [];
        }
    };

    return (
        <>
            <Head title="Pesanan Saya" />

            <LandingLayout>
                {/* Force navbar dalam keadaan scrolled */}
                <LandingNavbar user={auth.user} forceScrolled={true} />
                
                <div className="max-w-7xl mx-auto px-4 py-8 pt-24">
                    <h1 className="text-2xl font-bold mb-6 text-gray-800">Pesanan Saya</h1>

                    {pemesanans.length === 0 ? (
                        <div className="text-center text-gray-500">
                            Belum ada pemesanan yang dilakukan.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {pemesanans.map((pesanan) => (
                                <div
                                    key={pesanan.id}
                                    className="bg-white rounded-xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition flex flex-col h-full"
                                >
                                    <div className="mb-3">
                                        <h2 className="text-xl font-semibold text-grey-700">Tujuan: {pesanan.tiket.tujuan}</h2>
                                        <p className="text-sm text-gray-500">
                                            Jadwal:{' '}
                                            {new Date(pesanan.tiket.jadwal_keberangkatan).toLocaleDateString('id-ID', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </p>
                                    </div>

                                    <div className="text-sm text-gray-700 space-y-1 flex-grow">
                                        <p>
                                            <span className="font-medium">Status:</span>
                                            <span className={`ml-1 px-2 py-1 rounded text-xs ${
                                                pesanan.status_pemesanan === 'booked' ? 'bg-yellow-100 text-yellow-800' :
                                                pesanan.status_pemesanan === 'paid' ? 'bg-green-100 text-green-800' :
                                                pesanan.status_pemesanan === 'canceled' ? 'bg-red-100 text-red-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>
                                                {getStatusLabel(pesanan.status_pemesanan)}
                                            </span>
                                        </p>
                                        <p><span className="font-medium">Harga:</span> Rp {parseInt(pesanan.total_harga).toLocaleString()}</p>
                                        <p><span className="font-medium">Mobil:</span> {pesanan.tiket?.mobil?.tipe_mobil}</p>
                                        <p><span className="font-medium">Plat:</span> {pesanan.tiket?.mobil?.plat_nomor}</p>
                                        <p><span className="font-medium">Tanggal Pesan:</span>{' '}
                                            {new Date(pesanan.tanggal_pemesanan).toLocaleString('id-ID')}
                                        </p>
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            className="w-full py-2 px-4 rounded-md bg-amber-500 hover:bg-amber-600 text-white transition"
                                            onClick={() => openModal(pesanan)}
                                        >
                                            Cek Detail Pesanan
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </LandingLayout>

            {showModal && selectedPesanan && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
                    onClick={() => setShowModal(false)} // klik backdrop tutup modal
                >
                    <div
                        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
                        onClick={e => e.stopPropagation()} // klik isi modal tidak menutup modal
                    >
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Detail Pemesanan</h2>

                        <div className="space-y-3 text-sm text-gray-700">
                            <div>
                                <p className="font-medium text-gray-600">Kode Pemesanan:</p>
                                <p>{selectedPesanan.id}</p>
                            </div>

                            <div>
                                <p className="font-medium text-gray-600">Tujuan:</p>
                                <p>Probolinggo - {selectedPesanan.tiket.tujuan}</p>
                            </div>

                            <div>
                                <p className="font-medium text-gray-600">Jadwal Keberangkatan:</p>
                                <p>{new Date(selectedPesanan.tiket.jadwal_keberangkatan).toLocaleString('id-ID', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}</p>
                            </div>

                            <div>
                                <p className="font-medium text-gray-600">Tanggal Pemesanan:</p>
                                <p>{new Date(selectedPesanan.tanggal_pemesanan).toLocaleString('id-ID')}</p>
                            </div>

                            <div>
                                <p className="font-medium text-gray-600">Jumlah Tiket:</p>
                                <p>{selectedPesanan.jumlah_tiket} orang</p>
                            </div>

                            <div>
                                <p className="font-medium text-gray-600">Total Harga:</p>
                                <p className="font-semibold text-blue-700 text-lg">Rp {parseInt(selectedPesanan.total_harga).toLocaleString()}</p>
                            </div>

                            <div>
                                <p className="font-medium text-gray-600">Status Pemesanan:</p>
                                <span className={`capitalize px-2 py-1 rounded text-xs inline-block mt-1 ${
                                    selectedPesanan.status_pemesanan === 'booked' ? 'bg-yellow-100 text-yellow-800' :
                                    selectedPesanan.status_pemesanan === 'paid' ? 'bg-green-100 text-green-800' :
                                    selectedPesanan.status_pemesanan === 'canceled' ? 'bg-red-100 text-red-800' :
                                    selectedPesanan.status_pemesanan === 'waiting confirmation' ? 'bg-blue-100 text-blue-800' :
                                    'bg-gray-100 text-gray-800'
                                }`}>
                                    {getStatusLabel(selectedPesanan.status_pemesanan)}
                                </span>
                            </div>

                            <div>
                                <p className="font-medium text-gray-600">Informasi Kendaraan:</p>
                                <p>{selectedPesanan.tiket.mobil?.tipe_mobil} — {selectedPesanan.tiket.mobil?.plat_nomor}</p>
                            </div>

                            <div className="pt-3 border-t">
                                <p className="font-medium text-gray-600 mb-2">Data Penumpang:</p>
                                {parsePenumpang(selectedPesanan.data_penumpang).map((penumpang, i) => (
                                    <div key={i} className="p-3 mb-2 bg-gray-100 rounded">
                                        <p><span className="font-medium">Nama:</span> {penumpang.nama}</p>
                                        <p><span className="font-medium">Kontak:</span> {penumpang.kontak}</p>
                                    </div>
                                ))}
                            </div>

                            {selectedPesanan.status_pemesanan === 'booked' && (
                                <form
                                    action={route('pembayaran.store')}
                                    method="POST"
                                    encType="multipart/form-data"
                                    className="mt-6 border-t pt-4"
                                >
                                    <input
                                        type="hidden"
                                        name="_token"
                                        value={document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')}
                                    />
                                    <input type="hidden" name="pemesanan_id" value={selectedPesanan.id} />

                                    <div className="mb-3">
                                        <label className="block mb-1 font-medium text-sm text-gray-700">Metode Pembayaran</label>
                                        <select
                                            name="metode_pembayaran"
                                            required
                                            className="w-full border rounded px-3 py-2"
                                        >
                                            <option value="">-- Pilih Metode --</option>
                                            <option value="transfer">Transfer</option>
                                            <option value="qris">QRIS</option>
                                            <option value="cash">Cash</option>
                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <label className="block mb-1 font-medium text-sm text-gray-700">Jumlah Pembayaran</label>
                                        <input
                                            type="number"
                                            name="jumlah_pembayaran"
                                            defaultValue={selectedPesanan.total_harga}
                                            className="w-full border rounded px-3 py-2"
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="block mb-1 font-medium text-sm text-gray-700">Upload Bukti Transfer (opsional)</label>
                                        <input
                                            type="file"
                                            name="bukti_transfer"
                                            accept="image/*,application/pdf"
                                            className="w-full"
                                        />
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            type="submit"
                                            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
                                        >
                                            Bayar Sekarang
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button
                                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
                                onClick={() => setShowModal(false)}
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}