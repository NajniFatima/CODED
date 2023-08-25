import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { isAuth } from '../util/auth';
import logo from '../asset/logo.svg';
import axios from 'axios';
import { toast } from 'react-toastify';

const LoginScreen = ({ history }) => {
	document.title = 'CODED register';

	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		email: '',
		password1: '',
		password2: '',
		active: false,
		button: 'Register',
	});

	const { email, password1, password2, button } = formData;

	const handleSubmit = (e) => {
		e.preventDefault();
		if (password1 === password2) {
			setFormData({ ...formData, button: '...' });
			axios
				.post(`${process.env.REACT_APP_SERVER}/api/auth/register`, {
					email,
					password: password1,
				})
				.then((res) => {
					toast.success(`Verification mail send to ${email}`);
					setFormData({
						...formData,
						email: '',
						password1: '',
						password2: '',
						button: 'Register',
					});
				})
				.catch((error) => {
					toast.error(error.response?.data.message);
					setFormData({
						...formData,
						email: '',
						password1: '',
						password2: '',
						button: 'Register',
					});
				});
		} else {
			toast.error('password doesnt match');
		}
	};

	return (
		<div className='px-auto transform translate-y-60 xs:w-80 sm:w-96 md:w-96 lg:w-96 xl:w-96 2xl:w-96 mx-auto'>
			{isAuth() ? history.push('/') : null}
			<img
				src={logo}
				alt='logo'
				className=''
				style={{ height: '12vh', margin: '-240px 0px 0px 0px' }}
			/>
			<div className='text-4xl font-bold my-3  text-gray-700'>
				Regis<span className='text-yellow-600'>ter!</span>
			</div>
			<form onSubmit={handleSubmit}>
				<input
					className='p-3.5 mt-6 block rounded w-full shadow-md'
					type='email'
					placeholder='email'
					value={email}
					onChange={(e) => setFormData({ ...formData, email: e.target.value })}
					required
				/>
				<div className='relative '>
					<div className='absolute inset-y-0 right-0'>
						<div onClick={(e) => setShowPassword(!showPassword)} className=''>
							{showPassword ? (
								<i className='fas fa-eye text-lg text-gray-600 w-12 text-center p-2 m-1 bg-gray-300 rounded cursor-pointer hover:text-yellow-600'></i>
							) : (
								<i className='fas fa-eye-slash text-lg text-gray-600 w-12 text-center p-2 m-1 bg-gray-300 rounded cursor-pointer hover:text-yellow-600'></i>
							)}
						</div>
					</div>
					<input
						className='p-3.5 pr-14 mt-6 block rounded w-full shadow-md'
						type={showPassword ? 'text' : 'password'}
						placeholder='password'
						value={password1}
						onChange={(e) =>
							setFormData({ ...formData, password1: e.target.value })
						}
						pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
						title='Password must contain at least one number, one uppercase and one lowercase letter, and must be 8 or more characters'
						required
					/>
				</div>
				<input
					className='p-3.5 mt-6 block rounded w-full shadow-md'
					type={showPassword ? 'text' : 'password'}
					placeholder='confirm password'
					value={password2}
					onChange={(e) =>
						setFormData({ ...formData, password2: e.target.value })
					}
					required
				/>
				<button
					className='p-3.5 mt-6 block rounded w-full text-white uppercase font-bold shadow-md bg-yellow-600 hover:bg-yellow-700'
					type='submit'
				>
					{button}
				</button>

				<div className='text-xxs p-3 text-gray-500 text-center uppercase font-bold'>
					By registering, you agree to Coded's{' '}
					<Link to={'#'} className='text-green-600 hover:text-green-700'>
						Terms of Service
					</Link>{' '}
					,
					<Link to={'#'} className='text-green-600 hover:text-green-700'>
						{' '}
						Code of Conduct
					</Link>{' '}
					, and{' '}
					<Link to={'#'} className='text-green-600 hover:text-green-700'>
						Privacy Policy
					</Link>{' '}
					.
				</div>
			</form>
			<hr className='border-black h-px mb-5' />
			<div className='p-5 block rounded w-full text-xs text-gray-300 font-semibold bg-gray-700 text-center shadow-md'>
				Already registered?{' '}
				<Link
					to={`/login`}
					className='uppercase underline font-semibold text-green-600 hover:text-green-700'
				>
					Log IN
				</Link>{' '}
				here.
			</div>
		</div>
	);
};

export default LoginScreen;
