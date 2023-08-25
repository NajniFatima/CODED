import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { authenticate, isAuth } from '../util/auth';
import logo from '../asset/logo.svg';
import axios from 'axios';
import { toast } from 'react-toastify';

const LoginScreen = () => {
	document.title = 'CODED login';

	const history = useHistory();

	const [showPassword, setShowPassword] = useState(false);

	// const [loading, setLoading] = useState(false);

	const [formData, setFormData] = useState({
		email: '',
		password: '',
		button: 'Log In',
	});

	const { email, password, button } = formData;

	const handleSubmit = (e) => {
		e.preventDefault();
		if (email && password) {
			// setLoading(true);
			setFormData({ ...formData, button: '...' });
			axios
				.post(`${process.env.REACT_APP_SERVER}/api/auth/login`, {
					email,
					password,
				})
				.then((res) => {
					// console.log({ res: res });
					authenticate(res, () => {
						setFormData({
							...formData,
							email: '',
							password: '',
							button: 'Log In',
						});
						if (isAuth()) history.push('/editor');
					});
				})
				.catch((error) => {
					toast.error(error.response?.data.message);
					setFormData({
						...formData,
						email: '',
						password: '',
						button: 'Log In',
					});
				});
			// setLoading(false);
		}
	};

	return (
		<div className='px-auto xs:w-80 sm:w-96 md:w-96 lg:w-96 xl:w-96 2xl:w-96 mx-auto'>
			{isAuth() ? history.push('/') : null}
			<img src={logo} alt='logo' className='' style={{ height: '12vh' }} />
			<div className='text-4xl font-bold my-3  text-gray-700'>
				Log <span className='text-yellow-600'>In!</span>
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
						<div onClick={(e) => setShowPassword(!showPassword)}>
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
						value={password}
						onChange={(e) =>
							setFormData({ ...formData, password: e.target.value })
						}
						pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
						title='Password must contain at least one number, one uppercase and one lowercase letter, and must be 8 or more characters'
						required
					/>
				</div>
				<Link
					to={`/user/password/forgot`}
					className='text-xs font-semibold text-green-600 hover:text-green-700 hover:underline'
				>
					Forgot Password?
				</Link>
				<button
					className='p-3.5 mt-4 block rounded w-full text-white uppercase font-bold shadow-md bg-yellow-600 hover:bg-yellow-700'
					type='submit'
				>
					{button}
				</button>
			</form>
			<hr className='border-black h-px m-5' />
			<div className='p-5 block rounded w-full text-xs text-gray-300 font-semibold bg-gray-700 text-center shadow-md'>
				Need an Account?{' '}
				<Link
					to={`/register`}
					className='uppercase underline font-semibold text-green-600 hover:text-green-700'
				>
					Register
				</Link>{' '}
				for one.
			</div>
		</div>
	);
};

export default LoginScreen;
