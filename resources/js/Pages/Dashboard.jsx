import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import LandingPage from '@/Components/LandingPage';
import LandingNavbar from '@/Components/LandingNavbar';
import LandingLayout from '@/Layouts/LandingLayout';

export default function Dashboard({ auth }) {
    const { user } = auth;
    const isAdmin = user.role === 'admin';

    if (isAdmin) {
        return (
            <AuthenticatedLayout
                user={auth.user}
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Admin Dashboard
                    </h2>
                }
            >
                <Head title="Admin Dashboard" />
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                <h3 className="text-lg font-medium mb-4">Selamat datang, Admin!</h3>
                                <p>Anda dapat mengelola data mobil, tiket, dan pembayaran melalui menu navigasi di atas.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }

    // Untuk customer tetap gunakan layout landing
    return (
        <LandingLayout>
            <LandingNavbar user={user} />
            <LandingPage />
        </LandingLayout>
    );
}