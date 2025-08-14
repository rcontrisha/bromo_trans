import React from 'react';
import { Head } from '@inertiajs/react';

export default function LandingPage() {
    return (
        <>
            <Head title="Bromo Trans Travel" />

            {/* Hero Section */}
            <div className="relative bg-cover bg-center h-[80vh] min-h-[500px] pt-16"
                 style={{ backgroundImage: "url('/images/banner.jpg')" }}>
                <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center text-center px-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-3" data-aos="fade-down">Jelajahi Bromo</h1>
                    <p className="text-xl md:text-2xl text-amber-300 font-medium mb-8" data-aos="fade-down" data-aos-delay="100">Eksklusif & Terpercaya</p>
                    <p className="text-white max-w-2xl mb-10" data-aos="fade-down" data-aos-delay="200">
                        Manjakan diri Anda dengan pengalaman tak terlupakan menjelajahi keindahan Bromo bersama layanan profesional kami
                    </p>
                    <button className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-full transition-all text-lg" data-aos="fade-up" data-aos-delay="300">
                        Pesan Sekarang
                    </button>
                </div>
            </div>

            {/* Layanan Kami */}
            <div className="py-8 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-8" data-aos="fade-up">Layanan Kami</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            { 
                                title: 'Paket Wisata Bromo', 
                                desc: 'Sunrise, Midnight, Full Day',
                                icon: '🌄'
                            },
                            { 
                                title: 'Sewa Jeep Wisata', 
                                desc: 'Armada 4x4 terawat',
                                icon: '🚙'
                            },
                            { 
                                title: 'Penjemputan & Antar', 
                                desc: 'Dari Probolinggo/Surabaya/Malang',
                                icon: '📍'
                            },
                            { 
                                title: 'Paket Custom', 
                                desc: 'Group, Family, Wisatawan Asing',
                                icon: '👨‍👩‍👧‍👦'
                            },
                            { 
                                title: 'Reservasi Online', 
                                desc: 'Fast Response 24 jam',
                                icon: '📱'
                            }
                        ].map((service, index) => (
                            <div 
                                key={index} 
                                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                            >
                                <div className="text-5xl mb-5 text-center">{service.icon}</div>
                                <h3 className="font-bold text-2xl text-gray-800 mb-3 text-center">{service.title}</h3>
                                <p className="text-gray-600 text-center">{service.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Destinasi Populer */}
            <div className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-16" data-aos="fade-up">Destinasi Populer</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {[
                            { 
                                name: 'Penanjakan 1', 
                                desc: 'Spot sunrise terbaik dengan panorama 3 gunung', 
                                image: '/images/image4.png',
                                feature: 'Sunrise Viewpoint'
                            },
                            { 
                                name: 'Kawah Bromo', 
                                desc: 'Pengalaman melihat kawah vulkanik aktif dari dekat', 
                                image: '/images/image3.png',
                                feature: 'Kawah Vulkanik'
                            },
                            { 
                                name: 'Pasir Berbisik', 
                                desc: 'Hamparan lautan pasir vulkanik nan eksotis', 
                                image: '/images/image2.png',
                                feature: 'Lautan Pasir'
                            }
                        ].map((destination, index) => (
                            <div 
                                key={index} 
                                className="relative rounded-2xl overflow-hidden"
                                data-aos="zoom-in"
                                data-aos-delay={index * 100}
                            >
                                <img 
                                    src={destination.image} 
                                    alt={destination.name} 
                                    className="w-full h-80 object-cover"
                                />
                                <div className="p-6">
                                    <div className="bg-amber-500 text-white px-4 py-1 rounded-full inline-block mb-3">
                                        {destination.feature}
                                    </div>
                                    <h3 className="font-bold text-2xl text-gray-800 mb-2">{destination.name}</h3>
                                    <p className="text-gray-600 mb-4">{destination.desc}</p>
                                    <button className="text-amber-600 font-bold hover:text-amber-700 flex items-center">
                                        Jelajahi
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tips Wisata Bromo */}
            <div className="py-16 bg-amber-500 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div data-aos="fade-right">
                            <h2 className="text-3xl font-bold mb-6">Tips Wisata Bromo</h2>
                            <p className="mb-8 text-amber-100 max-w-xl">
                                Pemandangan Bromo yang memukau perlu persiapan khusus untuk dinikmati sepenuhnya. Berikut tips dari kami:
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <ul className="space-y-4">
                                    {[
                                        'Waktu terbaik: April - Oktober (musim kemarau)',
                                        'Suhu pagi 5-10°C - bawa jaket tebal',
                                        'Gunakan kendaraan 4WD (Jeep) untuk akses terbaik',
                                        'Berangkat jam 02.00-03.00 untuk kejar sunrise'
                                    ].map((tip, index) => (
                                        <li 
                                            key={index} 
                                            className="flex items-start"
                                            data-aos="fade-right"
                                            data-aos-delay={index * 50}
                                        >
                                            <span className="bg-white text-amber-500 rounded-full w-7 h-7 flex items-center justify-center text-lg mr-3 flex-shrink-0">✓</span>
                                            <span className="pt-0.5">{tip}</span>
                                        </li>
                                    ))}
                                </ul>
                                <ul className="space-y-4">
                                    {[
                                        'Pesan tiket online untuk menghindari antrean',
                                        'Gunakan sepatu nyaman untuk trekking',
                                        'Bawa powerbank untuk perangkat elektronik',
                                        'Hindari weekend jika ingin suasana sepi'
                                    ].map((tip, index) => (
                                        <li 
                                            key={index} 
                                            className="flex items-start"
                                            data-aos="fade-right"
                                            data-aos-delay={(index + 4) * 50}
                                        >
                                            <span className="bg-white text-amber-500 rounded-full w-7 h-7 flex items-center justify-center text-lg mr-3 flex-shrink-0">✓</span>
                                            <span className="pt-0.5">{tip}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        
                        <div 
                            className="bg-white bg-opacity-20 rounded-2xl p-8"
                            data-aos="fade-left"
                            data-aos-delay="200"
                        >
                            <h3 className="text-2xl font-bold mb-4">Kenapa Memilih Kami?</h3>
                            <ul className="space-y-4">
                                {[
                                    'Lokasi strategis (10 menit ke pintu masuk Bromo)',
                                    'Harga kompetitif tanpa biaya tersembunyi',
                                    'Layanan profesional & fleksibel',
                                    'Armada bersih, aman, dan terawat',
                                    'Sopir berpengalaman dan ramah'
                                ].map((item, index) => (
                                    <li 
                                        key={index} 
                                        className="flex items-start"
                                        data-aos="fade-left"
                                        data-aos-delay={index * 50 + 200}
                                    >
                                        <span className="text-xl mr-3">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <div 
                                className="mt-8 pt-6 border-t border-amber-400"
                                data-aos="fade-up"
                                data-aos-delay="500"
                            >
                                <p className="italic">"Pengalaman terbaik menikmati keindahan Bromo dengan persiapan yang tepat"</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Testimoni */}
            <div className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-16" data-aos="fade-up">Testimoni Pelanggan</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {[
                            { 
                                name: 'Budi Santoso', 
                                comment: 'Tour guide sangat berpengalaman dan Jeep yang digunakan sangat nyaman. Sunrise di Penanjakan 1 spektakuler!',
                                rating: '★★★★★',
                                date: '2 Agustus 2025'
                            },
                            { 
                                name: 'Anita Rahmawati', 
                                comment: 'Paket midnight tour-nya worth it! Bisa melihat bintang-bintang sebelum sunrise. Pelayanan ramah dan profesional.',
                                rating: '★★★★★',
                                date: '25 Juli 2025'
                            },
                            { 
                                name: 'Rudi Hartono', 
                                comment: 'Armada Jeep terawat bersih dan sopir sangat menguasai medan. Pengalaman melihat kawah Bromo dari dekat tak terlupakan.',
                                rating: '★★★★☆',
                                date: '18 Juli 2025'
                            },
                            { 
                                name: 'Dewi Anggraini', 
                                comment: 'Reservasi online mudah dan respons cepat. Harga kompetitif tanpa biaya tambahan tersembunyi. Recommended!',
                                rating: '★★★★★',
                                date: '10 Juli 2025'
                            }
                        ].map((testi, index) => (
                            <div 
                                key={index} 
                                className="bg-white rounded-2xl p-8 shadow-md"
                                data-aos="flip-up"
                                data-aos-delay={index * 100}
                            >
                                <div className="flex items-center mb-5">
                                    <div className="bg-gray-200 border-2 border-dashed rounded-full w-16 h-16" />
                                    <div className="ml-4">
                                        <h4 className="font-bold text-xl text-gray-800">{testi.name}</h4>
                                        <div className="text-amber-500">{testi.rating}</div>
                                    </div>
                                </div>
                                <p className="text-gray-600 mb-4 italic">"{testi.comment}"</p>
                                <p className="text-gray-400 text-sm">{testi.date}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-16 bg-gradient-to-r from-gray-900 to-black text-white">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6" data-aos="fade-up">Siap Berpetualang di Bromo?</h2>
                    <p className="text-xl mb-10 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
                        Pesan sekarang dan dapatkan pengalaman tak terlupakan bersama Bromo Trans Travel
                    </p>
                    <button 
                        className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-12 rounded-full transition-all text-lg"
                        data-aos="fade-up" 
                        data-aos-delay="200"
                    >
                        Pesan Sekarang
                    </button>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                        <div className="md:col-span-2" data-aos="fade-right">
                            <h3 className="text-2xl font-bold mb-4">Bromo Trans Travel</h3>
                            <p className="mb-6 text-gray-300 max-w-lg">
                                Layanan transportasi dan wisata resmi di kawasan Bromo dengan armada Jeep 4x4 berstandar wisata dan sopir berpengalaman.
                            </p>
                            <div className="flex items-start mb-4">
                                <span className="mr-3 mt-1">📍</span>
                                <p className="text-gray-300">
                                    Jl. Raya Bromo No.2, Watulumpang, Sukapura, Probolinggo, Jawa Timur 67254
                                </p>
                            </div>
                        </div>
                        
                        <div data-aos="fade-up" data-aos-delay="100">
                            <h4 className="text-xl font-semibold mb-4">Hubungi Kami</h4>
                            <ul className="space-y-3">
                                <li className="flex items-center">
                                    <span className="mr-3">📱</span>
                                    <span>081336633950 (Fast Response)</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="mr-3">📧</span>
                                    <span>bromotrans.travel@gmail.com</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="mr-3">🌐</span>
                                    <a href="https://www.instagram.com/bromotranstravel" 
                                       className="text-amber-300 hover:underline">
                                        @bromotranstravel
                                    </a>
                                </li>
                            </ul>
                        </div>
                        
                        <div data-aos="fade-up" data-aos-delay="200">
                            <h4 className="text-xl font-semibold mb-4">Jam Operasional</h4>
                            <p className="mb-2">Setiap hari</p>
                            <p>06.00 - 22.00 WIB</p>
                            
                            <div className="mt-6">
                                <h4 className="text-lg font-medium mb-3">Metode Pembayaran</h4>
                                <div className="flex space-x-3">
                                    <div className="bg-gray-700 rounded-lg w-14 h-9"></div>
                                    <div className="bg-gray-700 rounded-lg w-14 h-9"></div>
                                    <div className="bg-gray-700 rounded-lg w-14 h-9"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div 
                        className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center"
                        data-aos="fade-up"
                    >
                        <div className="mb-4 md:mb-0">
                            <div className="text-xl font-bold">BROMO TRANS</div>
                            <div className="text-amber-500 font-medium">TRAVEL</div>
                            <div className="text-gray-400 text-sm mt-1">EST.2024</div>
                        </div>
                        
                        <div className="text-gray-400 text-sm">
                            © {new Date().getFullYear()} Bromo Trans Travel. All rights reserved.
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}