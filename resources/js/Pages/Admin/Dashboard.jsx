import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { FaMoneyBillWave, FaShoppingCart, FaUsers, FaTicketAlt } from 'react-icons/fa';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Komponen kecil untuk Kartu Statistik
const StatCard = ({ icon, title, value, color }) => (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
        <div className={`text-3xl p-3 rounded-full ${color}`}>
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
    </div>
);

export default function Dashboard({ auth, stats, salesChart, recentOrders }) {
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Pendapatan per Bulan (12 Bulan Terakhir)',
                font: { size: 16 }
            },
        },
        scales: {
            y: {
                ticks: {
                    callback: function (value) {
                        return 'Rp ' + new Intl.NumberFormat('id-ID').format(value);
                    }
                }
            }
        }
    };

    const chartData = {
        labels: salesChart.labels,
        datasets: [
            {
                label: 'Pendapatan',
                data: salesChart.data,
                backgroundColor: 'rgba(59, 130, 246, 0.7)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Admin Dashboard" />

            <div className="max-w-7xl mx-auto p-6 space-y-6">
                {/* Bagian Stat Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard 
                        icon={<FaMoneyBillWave />} 
                        title="Total Pendapatan" 
                        value={`Rp ${Number(stats.pendapatan).toLocaleString('id-ID')}`}
                        color="bg-green-100 text-green-600"
                    />
                    <StatCard 
                        icon={<FaShoppingCart />} 
                        title="Transaksi Berhasil" 
                        value={`${stats.pemesanan} Pesanan`}
                        color="bg-blue-100 text-blue-600"
                    />
                    <StatCard 
                        icon={<FaUsers />} 
                        title="Total Pelanggan" 
                        value={`${stats.customer} Orang`}
                        color="bg-yellow-100 text-yellow-600"
                    />
                    <StatCard 
                        icon={<FaTicketAlt />} 
                        title="Tiket Terjual" 
                        value={`${stats.tiket} Tiket`}
                        color="bg-red-100 text-red-600"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Bagian Grafik */}
                    <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
                        <Bar options={chartOptions} data={chartData} />
                    </div>

                    {/* Bagian Pesanan Terbaru */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Pesanan Terbaru</h3>
                        <div className="space-y-4">
                            {recentOrders.map(order => (
                                <div key={order.id} className="flex justify-between items-center border-b pb-2">
                                    <div>
                                        <p className="font-semibold text-gray-700">{order.customer.nama}</p>
                                        <p className="text-xs text-gray-500">
                                            {new Date(order.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}
                                        </p>
                                    </div>
                                    <p className="font-bold text-green-600">
                                        Rp {Number(order.total_harga).toLocaleString('id-ID')}
                                    </p>
                                </div>
                            ))}
                             {recentOrders.length === 0 && (
                                <p className="text-sm text-gray-500">Belum ada pesanan.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}