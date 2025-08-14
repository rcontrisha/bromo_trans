import React from 'react';
import LandingPage from '@/Components/LandingPage';
import LandingNavbar from '@/Components/LandingNavbar';
import LandingLayout from '@/Layouts/LandingLayout';

export default function Welcome({ auth }) {
    return (
        <LandingLayout>
            <LandingNavbar user={auth.user} />
            <LandingPage />
        </LandingLayout>
    );
}