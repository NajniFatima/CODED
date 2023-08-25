import React, { useState } from 'react';
import axios from 'axios';
// import JWT from 'jsonwebtoken';
import { useHistory } from 'react-router-dom';
import { isAuth } from '../util/auth.js';
import logo from '../asset/logo.svg';
import { toast } from 'react-toastify';

const VerificationScreen = ({ match }) => {
	document.title = 'CODED verify account';

	const history = useHistory();
	const [formData, setFormData] = useState({
		name: '',
		about: '',
		organization: '',
		position: '',
		website: '',
		twitter: '',
		codepen: '',
		linkedin: '',
		github: '',
		button: 'Verify',
	});
	const {
		name,
		about,
		organization,
		position,
		website,
		twitter,
		codepen,
		linkedin,
		github,
		button,
	} = formData;
	const token = match.params.token;
	const handleSubmit = (e) => {
		e.preventDefault();
		setFormData({ ...formData, button: '...' });
		axios
			.post(`${process.env.REACT_APP_SERVER}/api/auth/verify`, {
				token,
				name,
				about,
				organization,
				position,
				website,
				twitter,
				codepen,
				linkedin,
				github,
			})
			.then((response) => {
				history.push('/login');
			})
			.catch((error) => {
				toast.error('token expired please register again');
				history.push('/register');
			});
	};
	return (
		<div
			className='px-auto xs:w-80 sm:w-96 md:w-96 lg:w-96 xl:w-96 2xl:w-96 mx-auto'
			// style={{ height: '100vh' }}
		>
			{isAuth() ? history.push('/') : null}
			<img
				src={logo}
				alt='logo'
				className=''
				style={{ height: '12vh', margin: '-70px 0px 0px 0px' }}
			/>
			<div className='text-4xl font-bold my-3  text-gray-700'>
				Veri<span className='text-yellow-600'>fy!</span>
			</div>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					placeholder='name [required]'
					className='p-3 mt-4 block rounded w-full shadow-md'
					onChange={(e) => setFormData({ ...formData, name: e.target.value })}
					value={name}
					required
				/>
				<input
					type='text'
					placeholder='organization [required]'
					className='p-3 mt-4 block rounded w-full shadow-md'
					onChange={(e) =>
						setFormData({ ...formData, organization: e.target.value })
					}
					value={organization}
					required
				/>
				<input
					type='text'
					placeholder='position [required]'
					className='p-3 mt-4 block rounded w-full shadow-md'
					onChange={(e) =>
						setFormData({ ...formData, position: e.target.value })
					}
					value={position}
					required
				/>
				<input
					type='url'
					placeholder='website'
					className='p-3 mt-4 block rounded w-full shadow-md'
					onChange={(e) =>
						setFormData({ ...formData, website: e.target.value })
					}
					value={website}
				/>
				<input
					type='url'
					placeholder='linkedin'
					className='p-3 mt-4 block rounded w-full shadow-md'
					onChange={(e) =>
						setFormData({ ...formData, linkedin: e.target.value })
					}
					value={linkedin}
				/>
				<input
					type='url'
					placeholder='github'
					className='p-3 mt-4 block rounded w-full shadow-md'
					onChange={(e) => setFormData({ ...formData, github: e.target.value })}
					value={github}
				/>
				<input
					type='url'
					placeholder='codepen'
					className='p-3 mt-4 block rounded w-full shadow-md'
					onChange={(e) =>
						setFormData({ ...formData, codepen: e.target.value })
					}
					value={codepen}
				/>
				<input
					type='url'
					placeholder='twitter'
					className='p-3 mt-4 block rounded w-full shadow-md'
					onChange={(e) =>
						setFormData({ ...formData, twitter: e.target.value })
					}
					value={twitter}
				/>
				<textarea
					maxLength='300'
					placeholder='about [required]'
					className='p-3 mt-4 block rounded w-full shadow-md'
					onChange={(e) => setFormData({ ...formData, about: e.target.value })}
					value={about}
					required
				/>
				<button
					className='p-3.5 mt-6 block rounded w-full text-white uppercase font-bold shadow-md bg-yellow-600 hover:bg-yellow-700'
					type='submit'
				>
					{button}
				</button>
			</form>
		</div>
	);
};

export default VerificationScreen;
