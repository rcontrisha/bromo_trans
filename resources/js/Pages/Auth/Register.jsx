import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        no_hp: '',
        alamat: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit} className="space-y-4">
                <h1 className="text-2xl font-bold">Register Akun Customer</h1>

                {/* Nama */}
                <div>
                    <InputLabel htmlFor="name" value="Nama" />
                    <TextInput id="name" name="name" value={data.name} className="mt-1 block w-full" autoComplete="name" isFocused={true} onChange={(e) => setData('name', e.target.value)} required />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                {/* Email */}
                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput id="email" type="email" name="email" value={data.email} className="mt-1 block w-full" autoComplete="email" onChange={(e) => setData('email', e.target.value)} required />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                {/* No HP */}
                <div>
                    <InputLabel htmlFor="no_hp" value="Nomor HP" />
                    <TextInput id="no_hp" name="no_hp" value={data.no_hp} className="mt-1 block w-full" onChange={(e) => setData('no_hp', e.target.value)} required />
                    <InputError message={errors.no_hp} className="mt-2" />
                </div>

                {/* Alamat */}
                <div>
                    <InputLabel htmlFor="alamat" value="Alamat" />
                    <textarea id="alamat" name="alamat" value={data.alamat} className="mt-1 block w-full rounded border-gray-300 focus:border-indigo-500 focus:ring-indigo-500" onChange={(e) => setData('alamat', e.target.value)} required />
                    <InputError message={errors.alamat} className="mt-2" />
                </div>
                
                {/* Password */}
                <div>
                    <InputLabel htmlFor="password" value="Password" />
                    <TextInput id="password" type="password" name="password" value={data.password} className="mt-1 block w-full" autoComplete="new-password" onChange={(e) => setData('password', e.target.value)} required />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                {/* Konfirmasi Password */}
                <div>
                    <InputLabel htmlFor="password_confirmation" value="Konfirmasi Password" />
                    <TextInput id="password_confirmation" type="password" name="password_confirmation" value={data.password_confirmation} className="mt-1 block w-full" autoComplete="new-password" onChange={(e) => setData('password_confirmation', e.target.value)} required />
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end mt-4">
                    <Link href={route('login')} className="text-sm text-gray-600 underline hover:text-gray-900">Sudah punya akun?</Link>

                    <PrimaryButton className="ml-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
