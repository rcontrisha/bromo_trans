import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Tiket({ auth, tikets, mobils, tiketStatus }) {
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState(null);

    const { data, setData, reset, post, put, errors } = useForm({
        tujuan: '',
        jadwal_keberangkatan: '',
        harga_tiket: '',
        mobil_id: '',
    });

    const openModal = (tiket = null) => {
        setEditing(tiket);
        if (tiket) {
            setData({
                tujuan: tiket.tujuan,
                jadwal_keberangkatan: tiket.jadwal_keberangkatan,
                harga_tiket: tiket.harga_tiket,
                mobil_id: tiket.mobil_id,
            });
        } else {
            reset();
        }
        setShowModal(true);
    };

    const closeModal = () => {
        reset();
        setShowModal(false);
    };

    const submit = (e) => {
        e.preventDefault();
        if (editing) {
            put(route('admin.tiket.update', { tiket: editing.id }), {
                onSuccess: closeModal,
            });
        } else {
            post(route('admin.tiket.store'), {
                onSuccess: closeModal,
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Yakin mau hapus tiket ini?')) {
            router.delete(route('admin.tiket.destroy', { tiket: id }));
        }
    };

    function formatJadwal(datetime) {
        if (!datetime) return '-';
        const hari = [
            'Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'
        ];
        const bulan = [
            'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
        ];
        const dateObj = new Date(datetime);
        const namaHari = hari[dateObj.getDay()];
        const tanggal = dateObj.getDate();
        const namaBulan = bulan[dateObj.getMonth()];
        const tahun = dateObj.getFullYear();
        const jam = dateObj.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false });
        return `${namaHari}, ${tanggal} ${namaBulan} ${tahun}, ${jam}`;
    }

    return (
        <>
            <AuthenticatedLayout user={auth.user}>
                <Head title="Data Tiket" />
                <div className="max-w-6xl mx-auto p-6 space-y-6">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-gray-800">Data Tiket</h1>
                        <button
                            onClick={() => openModal()}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow transition"
                        >
                            + Tambah Tiket
                        </button>
                    </div>

                    <div className="overflow-x-auto bg-white rounded shadow">
                        <table className="min-w-full text-sm text-left border">
                            <thead className="bg-gray-100 text-gray-700 font-semibold">
                                <tr>
                                    <th className="p-3 border">No</th>
                                    <th className="p-3 border">Tujuan</th>
                                    <th className="p-3 border">Jadwal</th>
                                    <th className="p-3 border">Harga</th>
                                    <th className="p-3 border">Mobil</th>
                                    <th className="p-3 border">Status</th> {/* Tambah kolom Status */}
                                    <th className="p-3 border">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tikets.map((tiket, i) => (
                                    <tr key={tiket.id} className="hover:bg-gray-50 transition">
                                        <td className="p-3 border">{i + 1}</td>
                                        <td className="p-3 border">{tiket.tujuan}</td>
                                        <td className="p-3 border">{formatJadwal(tiket.jadwal_keberangkatan)}</td>
                                        <td className="p-3 border">Rp {parseInt(tiket.harga_tiket).toLocaleString()}</td>
                                        <td className="p-3 border">
                                            {tiket.mobil
                                                ? `${tiket.mobil.tipe_mobil} | ${tiket.mobil.plat_nomor} | ${tiket.mobil.kapasitas} org`
                                                : '-'}
                                        </td>
                                        <td className="p-3 border">
                                            {tiketStatus && tiketStatus[tiket.id]
                                                ? `${tiketStatus[tiket.id].tersedia} / ${tiketStatus[tiket.id].kapasitas} tersedia`
                                                : '-'}
                                        </td>
                                        <td className="p-3 border space-x-2">
                                            <button
                                                onClick={() => openModal(tiket)}
                                                className="text-blue-600 hover:underline"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(tiket.id)}
                                                className="text-red-600 hover:underline"
                                            >
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {tikets.length === 0 && (
                                    <tr>
                                        <td colSpan="7" className="text-center text-gray-500 p-4">
                                            Belum ada data tiket.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </AuthenticatedLayout>

            {/* Modal diletakkan di luar layout */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-lg font-semibold mb-4">
                            {editing ? 'Edit Tiket' : 'Tambah Tiket'}
                        </h2>

                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium">Tujuan</label>
                                <input
                                    type="text"
                                    value={data.tujuan}
                                    onChange={(e) => setData('tujuan', e.target.value)}
                                    className="w-full border p-2 rounded"
                                    required
                                />
                                {errors.tujuan && (
                                    <p className="text-red-500 text-sm">{errors.tujuan}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium">Jadwal Keberangkatan</label>
                                <input
                                    type="datetime-local"
                                    value={data.jadwal_keberangkatan}
                                    onChange={(e) => setData('jadwal_keberangkatan', e.target.value)}
                                    className="w-full border p-2 rounded"
                                    required
                                />
                                {errors.jadwal_keberangkatan && (
                                    <p className="text-red-500 text-sm">{errors.jadwal_keberangkatan}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium">Harga Tiket</label>
                                <input
                                    type="number"
                                    value={data.harga_tiket}
                                    onChange={(e) => setData('harga_tiket', e.target.value)}
                                    className="w-full border p-2 rounded"
                                    required
                                />
                                {errors.harga_tiket && (
                                    <p className="text-red-500 text-sm">{errors.harga_tiket}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium">Pilih Mobil</label>
                                <select
                                    value={data.mobil_id}
                                    onChange={(e) => setData('mobil_id', e.target.value)}
                                    className="w-full border p-2 rounded"
                                    required
                                >
                                    <option value="">-- Pilih Mobil --</option>
                                    {mobils.map((mobil) => (
                                        <option key={mobil.id} value={mobil.id}>
                                            {mobil.plat_nomor} - {mobil.tipe_mobil}
                                        </option>
                                    ))}
                                </select>
                                {errors.mobil_id && (
                                    <p className="text-red-500 text-sm">{errors.mobil_id}</p>
                                )}
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    {editing ? 'Update' : 'Simpan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
