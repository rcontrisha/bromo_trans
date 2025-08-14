import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Mobil({ auth, mobils }) {
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState(null);

    const { data, setData, reset, post, put, errors } = useForm({
        plat_nomor: '',
        tipe_mobil: '',
        kapasitas: '',
    });

    const openModal = (mobil = null) => {
        setEditing(mobil);
        if (mobil) {
            setData({
                plat_nomor: mobil.plat_nomor,
                tipe_mobil: mobil.tipe_mobil,
                kapasitas: mobil.kapasitas,
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
            put(route('admin.mobil.update', { mobil: editing.id }), {
                onSuccess: closeModal,
            });
        } else {
            post(route('admin.mobil.store'), {
                onSuccess: closeModal,
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Yakin mau hapus mobil ini?')) {
            router.delete(route('admin.mobil.destroy', { mobil: id }));
        }
    };

    return (
        <>
            <AuthenticatedLayout user={auth.user}>
                <Head title="Data Mobil" />

                <div className="max-w-6xl mx-auto p-6 space-y-6">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-gray-800">Data Mobil</h1>
                        <button
                            onClick={() => openModal()}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow transition"
                        >
                            + Tambah Mobil
                        </button>
                    </div>

                    <div className="overflow-x-auto bg-white rounded shadow">
                        <table className="min-w-full text-sm text-left border">
                            <thead className="bg-gray-100 text-gray-700 font-semibold">
                                <tr>
                                    <th className="p-3 border">No</th>
                                    <th className="p-3 border">Plat Nomor</th>
                                    <th className="p-3 border">Tipe</th>
                                    <th className="p-3 border">Kapasitas</th>
                                    <th className="p-3 border">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mobils.map((mobil, i) => (
                                    <tr
                                        key={mobil.id_mobil}
                                        className="hover:bg-gray-50 transition"
                                    >
                                        <td className="p-3 border">{i + 1}</td>
                                        <td className="p-3 border">{mobil.plat_nomor}</td>
                                        <td className="p-3 border">{mobil.tipe_mobil}</td>
                                        <td className="p-3 border">{mobil.kapasitas}</td>
                                        <td className="p-3 border space-x-2">
                                            <button
                                                onClick={() => openModal(mobil)}
                                                className="text-blue-600 hover:underline"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(mobil.id_mobil)}
                                                className="text-red-600 hover:underline"
                                            >
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {mobils.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="text-center text-gray-500 p-4">
                                            Belum ada data mobil.
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
                            {editing ? 'Edit Mobil' : 'Tambah Mobil'}
                        </h2>

                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium">Plat Nomor</label>
                                <input
                                    type="text"
                                    value={data.plat_nomor}
                                    onChange={(e) => setData('plat_nomor', e.target.value)}
                                    className="w-full border p-2 rounded"
                                    required
                                />
                                {errors.plat_nomor && (
                                    <p className="text-red-500 text-sm">{errors.plat_nomor}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium">Tipe Mobil</label>
                                <input
                                    type="text"
                                    value={data.tipe_mobil}
                                    onChange={(e) => setData('tipe_mobil', e.target.value)}
                                    className="w-full border p-2 rounded"
                                    required
                                />
                                {errors.tipe_mobil && (
                                    <p className="text-red-500 text-sm">{errors.tipe_mobil}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium">Kapasitas</label>
                                <input
                                    type="number"
                                    value={data.kapasitas}
                                    onChange={(e) => setData('kapasitas', e.target.value)}
                                    className="w-full border p-2 rounded"
                                    required
                                />
                                {errors.kapasitas && (
                                    <p className="text-red-500 text-sm">{errors.kapasitas}</p>
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
