import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import LandingLayout from '@/Layouts/LandingLayout';
import LandingNavbar from '@/Components/LandingNavbar';

// Fungsi untuk menentukan harga tiket masuk
function getHargaTiketMasuk(dateStr) {
    const date = new Date(dateStr);
    const day = date.getDay(); // 0 = Minggu, 6 = Sabtu
    // Hari libur: Sabtu (6) & Minggu (0)
    return (day === 0 || day === 6) ? 89000 : 64000;
}

export default function Jadwal({ auth, tikets, customer }) {
    const [showModal, setShowModal] = useState(false);
    const [selectedTiket, setSelectedTiket] = useState(null);
    const [jumlahTiket, setJumlahTiket] = useState(1);
    const [penumpangs, setPenumpangs] = useState([{ nama: '', kontak: '' }]);
    const [errorMessage, setErrorMessage] = useState('');

    const openModal = (tiket) => {
        setSelectedTiket(tiket);
        setJumlahTiket(1);
        setPenumpangs([
            {
                nama: customer?.nama ?? '',
                kontak: customer?.no_hp ?? '',
            }
        ]);
        setErrorMessage('');
        setShowModal(true);
    };

    const handleJumlahTiketChange = (e) => {
        let value = parseInt(e.target.value);
        if (isNaN(value) || value < 1) value = 1;
        if (value > selectedTiket.kursi_tersedia) value = selectedTiket.kursi_tersedia;

        setJumlahTiket(value);

        if (value > selectedTiket.kursi_tersedia) {
            setErrorMessage(`Jumlah tiket melebihi kursi tersedia (${selectedTiket.kursi_tersedia})`);
        } else {
            setErrorMessage('');
        }

        const updatedPenumpangs = Array.from({ length: value }, (_, i) => penumpangs[i] || { nama: '', kontak: '' });
        setPenumpangs(updatedPenumpangs);
    };

    const handlePenumpangInput = (index, field, value) => {
        const updated = [...penumpangs];
        updated[index][field] = value;
        setPenumpangs(updated);
    };

    const handlePesan = () => {
        if (jumlahTiket > selectedTiket.kursi_tersedia) return;

        // Validasi basic sebelum submit
        for (let p of penumpangs) {
            if (!p.nama || !p.kontak) {
                setErrorMessage('Semua data penumpang harus diisi!');
                return;
            }
        }

        router.post('/pemesanan', {
            tiket_id: selectedTiket.id,
            jumlah_tiket: jumlahTiket,
            penumpangs: penumpangs,
        }, {
            onSuccess: () => {
                setShowModal(false);
            }
        });
    };

    // Tambahkan variabel harga tiket masuk & total harga
    const hargaTiketMasuk = selectedTiket ? getHargaTiketMasuk(selectedTiket.jadwal_keberangkatan) : 0;
    const totalHarga = selectedTiket
        ? (parseInt(selectedTiket.harga_tiket) + hargaTiketMasuk) * jumlahTiket
        : 0;

    return (
        <>
            <Head title="Jadwal Keberangkatan" />
            <LandingLayout>
                {/* Force navbar dalam keadaan scrolled */}
                <LandingNavbar user={auth.user} forceScrolled={true} />
                <div className="max-w-7xl mx-auto px-4 py-8 pt-24">
                    <h1 className="text-2xl font-bold mb-6 text-gray-800">Jadwal Keberangkatan</h1>

                    {tikets.length === 0 ? (
                        <div className="text-center text-gray-500">Belum ada jadwal tersedia.</div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {tikets.map((tiket) => (
                                <div key={tiket.id} className="bg-white rounded-xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition flex flex-col h-full">
                                    <div className="mb-3">
                                        <h2 className="text-xl font-semibold text-grey-700">Probolinggo - {tiket.tujuan}</h2>
                                        <p className="text-sm text-gray-500">
                                            {new Date(tiket.jadwal_keberangkatan).toLocaleDateString('id-ID', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </p>
                                    </div>

                                    <div className="text-sm text-gray-700 space-y-1 flex-grow">
                                        <p><span className="font-medium">Mobil:</span> {tiket.mobil?.tipe_mobil}</p>
                                        <p><span className="font-medium">Plat:</span> {tiket.mobil?.plat_nomor}</p>
                                        <p><span className="font-medium">Harga:</span> Rp {parseInt(tiket.harga_tiket).toLocaleString()}</p>
                                        <p><span className="font-medium">Kursi Tersedia:</span> {tiket.kursi_tersedia}</p>
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            className={`w-full py-2 px-4 rounded-md text-white transition ${
                                                tiket.kursi_tersedia === 0 
                                                    ? 'bg-gray-400 cursor-not-allowed' 
                                                    : 'bg-amber-500 hover:bg-amber-600'
                                            }`}
                                            onClick={() => openModal(tiket)}
                                            disabled={tiket.kursi_tersedia === 0}
                                        >
                                            {tiket.kursi_tersedia === 0 ? 'Penuh' : 'Pesan Sekarang'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </LandingLayout>

            {showModal && selectedTiket && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
                    onClick={() => setShowModal(false)}
                >
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
                        onClick={e => e.stopPropagation()}
                    >
                        <h2 className="text-xl font-bold mb-4">Pesan Tiket</h2>
                        <p className="mb-2">Tujuan: <strong>{selectedTiket.tujuan}</strong></p>
                        <p className="mb-2">Harga Tiket per Orang: <strong>Rp {parseInt(selectedTiket.harga_tiket).toLocaleString()}</strong></p>
                        <p className="mb-2">Harga Tiket Masuk Kawasan: <strong>Rp {hargaTiketMasuk.toLocaleString()}</strong></p>
                        <p className="mb-2 font-semibold">
                            Total Harga: Rp {totalHarga.toLocaleString()}
                        </p>

                        <label className="block mb-2 text-sm font-medium">Jumlah Tiket (orang)</label>
                        <input
                            type="number"
                            min="1"
                            max={selectedTiket.kursi_tersedia}
                            value={jumlahTiket}
                            onChange={handleJumlahTiketChange}
                            className="w-full border border-gray-300 rounded-md p-2 mb-4"
                        />

                        {penumpangs.map((penumpang, index) => (
                            <div key={index} className="mb-4 border p-3 rounded bg-gray-50">
                                <p className="font-semibold mb-2">Penumpang {index + 1}</p>
                                <input
                                    type="text"
                                    placeholder="Nama"
                                    value={penumpang.nama}
                                    onChange={(e) => handlePenumpangInput(index, 'nama', e.target.value)}
                                    className="w-full mb-2 border border-gray-300 rounded-md p-2"
                                />
                                <input
                                    type="text"
                                    placeholder="Kontak (HP/WA)"
                                    value={penumpang.kontak}
                                    onChange={(e) => handlePenumpangInput(index, 'kontak', e.target.value)}
                                    className="w-full border border-gray-300 rounded-md p-2"
                                />
                            </div>
                        ))}

                        {errorMessage && (
                            <p className="text-red-600 text-sm mb-2">{errorMessage}</p>
                        )}

                        <div className="flex justify-end space-x-2">
                            <button
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                onClick={() => setShowModal(false)}
                            >
                                Batal
                            </button>
                            <button
                                className={`px-4 py-2 rounded text-white ${errorMessage ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                                disabled={!!errorMessage}
                                onClick={handlePesan}
                            >
                                Pesan
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}