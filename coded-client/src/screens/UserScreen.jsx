import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import ReactTooltip from 'react-tooltip';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Entry from '../components/Entry';
import { isAuth, getCookie } from '../util/auth';

const customStyles = {
	overlay: {
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '50%',
		background: '#aaa',
		transform: 'translate(-50%, -50%)',
		border: 'none',
	},
};

Modal.setAppElement('#root');

const UserScreen = ({ match }) => {
	const token = getCookie('token');

	const [editable, setEditable] = useState(false);
	const [loading, setLoading] = useState(true);

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		avatar: '',
		password1: '',
		password2: '',
		about: '',
		organization: '',
		position: '',
		website: '',
		linkedin: '',
		github: '',
		twitter: '',
		codepen: '',
		entries: [],
	});

	const {
		name,
		email,
		avatar,
		about,
		organization,
		position,
		website,
		linkedin,
		github,
		twitter,
		codepen,
		entries,
	} = formData;

	document.title = `${name} CODED`;

	let subtitle;
	const [modalIsOpen, setIsOpen] = React.useState(false);

	function openModal() {
		setIsOpen(true);
	}

	function afterOpenModal() {
		subtitle.style.color = '#333';
	}

	function closeModal() {
		setIsOpen(false);
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post(
				`${process.env.REACT_APP_SERVER}/api/user/update`,
				{
					name,
					about,
					organization,
					position,
					website,
					linkedin,
					github,
					twitter,
					codepen,
				},
				{
					headers: {
						authorization: `Bearer ${token}`,
					},
				}
			)
			.then((response) => {
				closeModal();
				toast.success('User Info updated');
			})
			.catch((error) => toast.error('Unable to Edit User Info'));
	};
	useEffect(() => {
		const id = match.params.id;
		if (isAuth() && isAuth()._id === id) setEditable(true);
		axios
			.get(`${process.env.REACT_APP_SERVER}/api/user/${id}`)
			.then((response) => {
				// console.log(response);
				setFormData({
					...formData,
					name: response.data.name ? response.data.name : '',
					email: response.data.email ? response.data.email : '',
					avatar: response.data.avatar ? response.data.avatar : '',
					about: response.data.about ? response.data.about : '',
					organization: response.data.organization
						? response.data.organization
						: '',
					position: response.data.position ? response.data.position : '',
					website: response.data.website ? response.data.website : '',
					linkedin: response.data.linkedin ? response.data.linkedin : '',
					github: response.data.github ? response.data.github : '',
					twitter: response.data.twitter ? response.data.twitter : '',
					codepen: response.data.codepen ? response.data.codepen : '',
					entries: response.data.entries,
				});
				setLoading(false);
			})
			.catch((error) => {
				// console.log('user not found');
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [match]);

	return (
		<div className='xs:mx-4 sm:mx-12 md:mx-32 lg:mx-48 xl:mx-56 2xl:mx-96'>
			<div
				className={
					'bg-white dark:bg-gray-800 shadow-md rounded-md p-3 flex space-x-3 -mx-2 ' +
					(loading ? 'animate-pulse' : '')
				}
				style={{ height: '220px' }}
			>
				<div className='overflow-visible'>
					<img className='rounded-lg shadow-lg' src={avatar} alt='' />
					<div className='text-center'>
						{twitter ? (
							<Link
								to={{ pathname: `https://${twitter}` }}
								target='_blank'
								rel='noreferrer'
								data-tip='twitter'
							>
								<i
									className='fab fa-twitter text-gray-700 p-1 bg-gray-200 rounded m-0.5 mt-2 transition duration-100 ease-in hover:bg-gray-300 hover:text-yellow-500'
									data-tip='twitter'
								></i>
							</Link>
						) : null}

						{linkedin ? (
							<Link
								to={{ pathname: `https://${linkedin}` }}
								target='_blank'
								rel='noreferrer'
								data-tip='linkedin'
							>
								<i className='fab fa-linkedin text-gray-700 p-1 bg-gray-200 rounded m-0.5 mt-2 transition duration-100 ease-in hover:bg-gray-300 hover:text-yellow-500'></i>
							</Link>
						) : null}
						{github ? (
							<Link
								to={{ pathname: `https://${github}` }}
								target='_blank'
								rel='noreferrer'
								data-tip='github'
							>
								<i className='fab fa-github text-gray-700 p-1 bg-gray-200 rounded m-0.5 mt-2 transition duration-100 ease-in hover:bg-gray-300 hover:text-yellow-500'></i>
							</Link>
						) : null}
						{codepen ? (
							<Link
								to={{ pathname: `https://${codepen}` }}
								target='_blank'
								rel='noreferrer'
								data-tip='codepen'
							>
								<i className='fab fa-codepen text-gray-700 p-1 bg-gray-200 rounded m-0.5 mt-2 transition duration-100 ease-in hover:bg-gray-300 hover:text-yellow-500'></i>
							</Link>
						) : null}
						{website ? (
							<Link
								to={{ pathname: `https://${website}` }}
								target='_blank'
								rel='noreferrer'
								data-tip='website'
							>
								<i className='fas fa-link text-gray-700 p-1 bg-gray-200 rounded m-0.5 mt-2 transition duration-100 ease-in hover:bg-gray-300 hover:text-yellow-500'></i>
							</Link>
						) : null}
					</div>
				</div>
				<div className='flex flex-col w-full'>
					<div className='flex justify-between items-start'>
						<h2 className='text-2xl font-bold text-yellow-600'>{name}</h2>
						{editable ? (
							<div
								onClick={openModal}
								className='bg-yellow-600 text-xs text-gray-200 font-bold rounded-sm px-2 py-1 cursor-pointer hover:bg-yellow-700 shadow-md uppercase'
							>
								Edit
							</div>
						) : null}
						<Modal
							isOpen={modalIsOpen}
							onAfterOpen={afterOpenModal}
							onRequestClose={closeModal}
							style={customStyles}
							contentLabel='Example Modal'
						>
							<h2
								className='font-bold text-xl text-center uppercase text-gray-600'
								ref={(_subtitle) => (subtitle = _subtitle)}
							>
								Update Profile
							</h2>
							<form onSubmit={handleSubmit}>
								<input
									type='text'
									placeholder='name'
									onChange={(e) =>
										setFormData({ ...formData, name: e.target.value })
									}
									className='p-3 my-3 xs:w-56 sm:w-56 md:w-96 rounded block shadow'
									value={name}
									required
								/>
								<input
									type='text'
									placeholder='organization'
									onChange={(e) =>
										setFormData({
											...formData,
											organization: e.target.value,
										})
									}
									className='p-3 my-3 xs:w-56 sm:w-56 md:w-96 rounded block shadow'
									value={organization}
									required
								/>
								<input
									type='text'
									placeholder='position'
									onChange={(e) =>
										setFormData({ ...formData, position: e.target.value })
									}
									className='p-3 my-3 xs:w-56 sm:w-56 md:w-96 rounded block shadow'
									value={position}
									required
								/>
								<textarea
									placeholder='about'
									rows='3'
									onChange={(e) =>
										setFormData({ ...formData, about: e.target.value })
									}
									className='p-3 my-3 xs:w-56 sm:w-56 md:w-96 rounded block shadow'
									value={about}
									required
								/>
								<input
									type='text'
									placeholder='webite'
									onChange={(e) =>
										setFormData({ ...formData, website: e.target.value })
									}
									className='p-3 my-3 xs:w-56 sm:w-56 md:w-96 rounded block shadow'
									value={website}
								/>
								<input
									type='text'
									placeholder='linkedin'
									onChange={(e) =>
										setFormData({ ...formData, linkedin: e.target.value })
									}
									className='p-3 my-3 xs:w-56 sm:w-56 md:w-96 rounded block shadow'
									value={linkedin}
								/>
								<input
									type='text'
									placeholder='github'
									onChange={(e) =>
										setFormData({ ...formData, github: e.target.value })
									}
									className='p-3 my-3 xs:w-56 sm:w-56 md:w-96 rounded block shadow'
									value={github}
								/>
								<input
									type='text'
									placeholder='twitter'
									onChange={(e) =>
										setFormData({ ...formData, twitter: e.target.value })
									}
									className='p-3 my-3 xs:w-56 sm:w-56 md:w-96 rounded block shadow'
									value={twitter}
								/>
								<input
									type='text'
									placeholder='codepen'
									onChange={(e) =>
										setFormData({ ...formData, codepen: e.target.value })
									}
									className='p-3 my-3 xs:w-56 sm:w-56 md:w-96 rounded block shadow'
									value={codepen}
								/>
								<button
									className='p-3 my-1.5 font-bold text-white uppercase bg-yellow-600 hover:bg-yellow-700 xs:w-56 sm:w-56 md:w-96 rounded'
									type='submit'
								>
									Submit
								</button>
							</form>
						</Modal>
					</div>
					<div>
						<div className='text-sm text-gray-400 dark:text-gray-500'>
							{email}
						</div>
						<div className='text-xs font-bold text-gray-600 dark:text-gray-300'>
							{organization}
						</div>
						<div className='text-xs font-bold text-gray-600 dark:text-gray-300'>
							{position}
						</div>
					</div>
					<p className='mt-2 text-gray-400 dark:text-gray-500 text-xs h-40 overflow-y-scroll'>
						{about}
					</p>
				</div>
			</div>
			<div
				className='z-0 overflow-y-auto mt-6 py-3'
				style={{ height: 'calc(100vh - 330px)' }}
			>
				{entries.map((entry) => (
					<Entry key={entry._id} entry={entry} editable={editable} />
				))}
			</div>
			<ReactTooltip place='bottom' type='dark' effect='solid' />
		</div>
	);
};

export default UserScreen;
