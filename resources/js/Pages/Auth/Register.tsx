import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Register() {
	const { data, setData, post, processing, errors, reset } = useForm({
		name: '',
		email: '',
		password: '',
		password_confirmation: '',
	});

	const submit: FormEventHandler = (e) => {
		e.preventDefault();

		post(route('register'), {
			onFinish: () => reset('password', 'password_confirmation'),
		});
	};

	return (
		<GuestLayout>
			<Head title="Register" />

			<form onSubmit={submit} className="w-full h-full flex flex-col gap-8 mx-auto mt-10">
				<div>
					<InputLabel htmlFor="name" value="Name" />

					<TextInput
						id="name"
						name="name"
						value={data.name}
						className="block w-full h-12 mt-2"
						autoComplete="name"
						isFocused={true}
						onChange={(e) => setData('name', e.target.value)}
						required
					/>

					<InputError message={errors.name} className="mt-2" />
				</div>

				<div>
					<InputLabel htmlFor="email" value="Email" />

					<TextInput
						id="email"
						type="email"
						name="email"
						value={data.email}
						className="block w-full h-12"
						autoComplete="username"
						onChange={(e) => setData('email', e.target.value)}
						required
					/>

					<InputError message={errors.email} className="mt-2" />
				</div>

				<div className="">
					<InputLabel htmlFor="password" value="Password" />

					<TextInput
						id="password"
						type="password"
						name="password"
						value={data.password}
						className="pl-2 block w-full h-12"
						autoComplete="new-password"
						onChange={(e) => setData('password', e.target.value)}
						required
					/>

					<InputError message={errors.password} className="mt-2" />
				</div>

				<div className="">
					<InputLabel htmlFor="password_confirmation" value="Confirm Password" />

					<TextInput
						id="password_confirmation"
						type="password"
						name="password_confirmation"
						value={data.password_confirmation}
						className="block w-full h-12"
						autoComplete="new-password"
						onChange={(e) => setData('password_confirmation', e.target.value)}
						required
					/>

					<InputError message={errors.password_confirmation} className="mt-2" />
				</div>

				<div className=" flex items-end justify-between mt-4 gap-4">
					<PrimaryButton className="bg-orange-600" disabled={processing}>
						Register
					</PrimaryButton>
					<Link
						href={route('login')}
						className="rounded-md text-sm md:text-base text-gray-800 underline hover:text-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
					>
						Already registered?
					</Link>
				</div>
			</form>
		</GuestLayout>
	);
}
