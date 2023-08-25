import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import logo from '../asset/logo.svg';
import { isAuth } from '../util/auth';
import { toast } from 'react-toastify';

const ForgotpasswordScreen = () => {
	document.title = 'CODED forgot password';

	const history = useHistory();
	const [formData, setFormData] = useState({
		email: '',
		button: 'Submit',
	});
	const { email, button } = formData;
	const handleSubmit = (e) => {
		e.preventDefault();
		setFormData({ ...formData, button: '...' });
		axios
			.post(`${process.env.REACT_APP_SERVER}/api/auth/forgotpassword`, {
				email,
			})
			.then((response) => {
				toast.success('Check Your Email for Verification mail');
				setFormData({ ...formData, email: '', button: 'Submit' });
			})
			.catch((error) => {
				toast.error(error.response?.data.message);
				setFormData({ ...formData, email: '', button: 'Submit' });
			});
	};
	return (
		<div className='h-auto px-auto xs:w-80 sm:w-96 md:w-96 lg:w-96 xl:w-96 2xl:w-96 mx-auto'>
			{isAuth() ? history.push('/') : null}
			<img src={logo} alt='logo' className='' style={{ height: '12vh' }} />
			<div className='text-4xl font-bold my-3  text-gray-700'>
				Entry <span className='text-yellow-600'>Email!</span>
			</div>
			<form onSubmit={handleSubmit}>
				<input
					type='email'
					placeholder='email'
					className='p-3.5 mt-6 block rounded w-full shadow-md'
					onChange={(e) => setFormData({ ...formData, email: e.target.value })}
					value={email}
					required
				/>
				<button
					className='p-3.5 mt-4 block rounded w-full text-white uppercase font-bold shadow-md bg-yellow-600 hover:bg-yellow-700'
					type='submit'
				>
					{button}
				</button>
			</form>
			<hr className='border-black h-px m-5' />
			<div className='p-5 block rounded w-full text-xs text-gray-300 font-semibold bg-gray-700 text-center shadow-md'>
				Didn't remember the Email?{' '}
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

export default ForgotpasswordScreen;
