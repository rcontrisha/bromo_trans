import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Pagination from '@/Components/Pagination';

/**
 * Helper function untuk mengubah objek Date menjadi string YYYY-MM-DD
 * tanpa terpengaruh timezone (menghindari tanggal mundur).
 */
const toLocalDateString = (date) => {
    if (!date) return '';
    const adjustedDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60 * 1000));
    return adjustedDate.toISOString().split('T')[0];
};

/**
 * Helper function untuk mengubah string YYYY-MM-DD dari server
 * menjadi objek Date di timezone lokal browser.
 */
const parseDateFromFilter = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString + 'T00:00:00');
};

//                  👇 PERBAIKAN DILAKUKAN DI SINI 👇
export default function Laporan({ auth, laporans, reportTotals = { pendapatan: 0, penjualan: 0 }, filters, paymentMethods }) {
    const [startDate, setStartDate] = useState(parseDateFromFilter(filters.start_date));
    const [endDate, setEndDate] = useState(parseDateFromFilter(filters.end_date));
    const [quickFilter, setQuickFilter] = useState(filters.quick_filter || '');
    const [paymentMethod, setPaymentMethod] = useState(filters.payment_method || '');

    const handleFilter = () => {
        const currentQuickFilter = (startDate || endDate) ? '' : quickFilter;

        router.get(route('admin.laporan.index'), {
            quick_filter: currentQuickFilter,
            start_date: toLocalDateString(startDate),
            end_date: toLocalDateString(endDate),
            payment_method: paymentMethod,
        }, {
            preserveState: true,
            replace: true,
        });
    };
    
    const handleQuickFilter = (filter) => {
        setStartDate(null);
        setEndDate(null);
        setQuickFilter(filter);
    };

    const resetFilters = () => {
        setStartDate(null);
        setEndDate(null);
        setQuickFilter('');
        setPaymentMethod('');
        router.get(route('admin.laporan.index'));
    };

    useEffect(() => {
        if (quickFilter) {
            handleFilter();
        }
    }, [quickFilter]);

    const getPdfUrl = () => {
        const params = new URLSearchParams({
            quick_filter: quickFilter,
            start_date: toLocalDateString(startDate),
            end_date: toLocalDateString(endDate),
            payment_method: paymentMethod,
        });
        return `${route('admin.laporan.pdf')}?${params.toString()}`;
    };

    // Variabel ini sekarang aman karena reportTotals punya nilai default
    const totalPendapatan = reportTotals.pendapatan;
    const totalPenjualan = reportTotals.penjualan;

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Laporan Penjualan" />

            <div className="max-w-7xl mx-auto p-6 space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800">Laporan Penjualan</h1>
                    <a href={getPdfUrl()} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow transition">
                        Download PDF
                    </a>
                </div>

                {/* Filter Section */}
                <div className="p-4 bg-white rounded-lg shadow space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Filter Cepat</label>
                            <div className="flex space-x-2">
                                {['today', 'this_week', 'this_month'].map((filter) => (
                                    <button
                                        key={filter}
                                        onClick={() => handleQuickFilter(filter)}
                                        className={`px-3 py-2 text-sm rounded-md transition ${quickFilter === filter ? 'bg-indigo-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                                    >
                                        {filter === 'today' ? 'Hari Ini' : filter === 'this_week' ? 'Minggu Ini' : 'Bulan Ini'}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Dari Tanggal</label>
                                <DatePicker selected={startDate} onChange={(date) => { setStartDate(date); setQuickFilter(''); }} className="w-full border-gray-300 rounded-md shadow-sm" dateFormat="yyyy-MM-dd" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Sampai Tanggal</label>
                                <DatePicker selected={endDate} onChange={(date) => { setEndDate(date); setQuickFilter(''); }} className="w-full border-gray-300 rounded-md shadow-sm" dateFormat="yyyy-MM-dd" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="payment_method" className="block text-sm font-medium text-gray-700 mb-1">Metode Pembayaran</label>
                            <select
                                id="payment_method"
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="w-full border-gray-300 rounded-md shadow-sm"
                            >
                                <option value="">Semua</option>
                                {paymentMethods.map(method => (
                                    <option key={method} value={method}>{method}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex space-x-2">
                            <button onClick={handleFilter} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md shadow">
                                Terapkan Filter
                            </button>
                            <button onClick={resetFilters} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md shadow">
                                Reset
                            </button>
                        </div>
                    </div>
                </div>

                {/* Ringkasan Laporan */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold text-gray-600">Total Penjualan (Hasil Filter)</h3>
                        <p className="text-3xl font-bold text-gray-800">{totalPenjualan} Transaksi</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold text-gray-600">Total Pendapatan (Hasil Filter)</h3>
                        <p className="text-3xl font-bold text-gray-800">
                            Rp {Number(totalPendapatan).toLocaleString('id-ID')}
                        </p>
                    </div>
                </div>

                {/* Tabel Detail Laporan */}
                <div className="overflow-x-auto bg-white rounded shadow">
                    <table className="min-w-full text-sm text-left border">
                        <thead className="bg-gray-100 text-gray-700 font-semibold">
                            <tr>
                                <th className="p-3 border">Tanggal</th>
                                <th className="p-3 border">Kode Pemesanan</th>
                                <th className="p-3 border">Customer</th>
                                <th className="p-3 border">Metode Pembayaran</th>
                                <th className="p-3 border">Jumlah Tiket</th>
                                <th className="p-3 border">Total Harga</th>
                            </tr>
                        </thead>
                        <tbody>
                            {laporans.data.map((laporan) => (
                                <tr key={laporan.id} className="hover:bg-gray-50 transition">
                                    <td className="p-3 border">
                                        {parseDateFromFilter(laporan.tanggal_pemesanan)?.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </td>
                                    <td className="p-3 border">#{laporan.id}</td>
                                    <td className="p-3 border">{laporan.customer.nama}</td>
                                    <td className="p-3 border uppercase">{laporan.pembayaran?.metode_pembayaran || 'N/A'}</td>
                                    <td className="p-3 border">{laporan.jumlah_tiket}</td>
                                    <td className="p-3 border">
                                        Rp {parseFloat(laporan.total_harga).toLocaleString('id-ID')}
                                    </td>
                                </tr>
                            ))}
                            {laporans.data.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="text-center text-gray-500 p-4">
                                        Belum ada data penjualan yang sesuai dengan filter.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Komponen Pagination */}
                <Pagination links={laporans.links} />

            </div>
        </AuthenticatedLayout>
    );
}