import React from 'react';

export default function ApplicationLogo(props) {
    return (
        <div {...props}>
            {/* Logo sebagai gambar */}
            <img 
                src="/images/logo.png" 
                alt="Bromo Trans Travel Logo"
                className="h-full w-auto" // Menjaga aspek rasio
            />
            
            {/* Atau alternatif teks jika gambar tidak ada */}
            {/* <div className="font-bold text-xl text-gray-800">
                <div>BROMO TRANS</div>
                <div className="text-amber-600">TRAVEL</div>
                <div className="text-xs text-gray-500 mt-1">EST.2024</div>
            </div> */}
        </div>
    );
}