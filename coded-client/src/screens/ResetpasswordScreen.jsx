import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from '../asset/logo.svg';
import { isAuth } from '../util/auth';

const ResetpasswordScreen = ({ match }) => {
	document.title = 'CODED reset password';

	const history = useHistory();

	const [showPassword, setShowPassword] = useState(false);

	const [formData, setFormData] = useState({
		password1: '',
		password2: '',
		token: '',
		button: 'Update',
	});

	const { password1, password2, token, button } = formData;

	const handleSubmit = (e) => {
		e.preventDefault();
		if (password1 && password2) {
			if (password1 === password2) {
				setFormData({ ...formData, button: '...' });
				axios
					.post(`${process.env.REACT_APP_SERVER}/api/auth/resetpassword`, {
						newPassword: password1,
						resetPasswordLink: token,
					})
					.then((response) => {
						history.push('/login');
					})
					.catch((error) => {
						toast.error('token expired or incorect please try again');
						history.push('/user/password/forgot');
					});
			} else {
				toast.error('password doesnt matches');
			}
		} else {
			toast.error('enter new password');
		}
		setFormData({
			...formData,
			password1: '',
			password2: '',
			button: 'Update',
		});
	};

	useEffect(() => {
		let token = match.params.token;
		if (token) setFormData({ ...formData, token });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div className='px-auto xs:w-80 sm:w-96 md:w-96 lg:w-96 xl:w-96 2xl:w-96 mx-auto'>
			{isAuth() ? history.push('/') : null}
			<img src={logo} alt='logo' className='' style={{ height: '12vh' }} />
			<div className='text-4xl font-bold my-3  text-gray-700'>
				Passw<span className='text-yellow-600'>ord!</span>
			</div>
			<div>
				<form onSubmit={handleSubmit}>
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
				</form>
				<hr className='border-black h-px m-5' />
				<div className='p-5 block rounded w-full text-xs text-gray-300 font-semibold bg-gray-700 text-center shadow-md'>
					Remembered your Password?{' '}
					<Link
						to={`/login`}
						className='uppercase underline font-semibold text-green-600 hover:text-green-700'
					>
						Log In
					</Link>{' '}
					here.
				</div>
			</div>
		</div>
	);
};

export default ResetpasswordScreen;
