import { Head } from '@inertiajs/react';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function LandingLayout({ children, title = 'Bromo Trans Travel' }) {
    useEffect(() => {
        // Inisialisasi AOS
        AOS.init({
            duration: 1000, // durasi animasi
            once: true, // animasi hanya sekali
            offset: 50, // offset (dalam px) dari elemen saat memicu animasi
        });

        // Hanya sembunyikan scrollbar visual, tanpa mengubah perilaku scroll
        const style = document.createElement('style');
        style.innerHTML = `
            ::-webkit-scrollbar {
                width: 0 !important;
                height: 0 !important;
                background: transparent !important;
            }
            body {
                -ms-overflow-style: none !important;
                scrollbar-width: none !important;
            }
        `;
        document.head.appendChild(style);
        
        return () => {
            document.head.removeChild(style);
            AOS.refresh();
        };
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <Head title={title} />
            {children}
        </div>
    );
}