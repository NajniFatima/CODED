import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Tag from './Tag.jsx';
import { toast } from 'react-toastify';
import { getCookie } from '../util/auth';

const Entry = ({ entry, editable }) => {
	const history = useHistory();

	const token = getCookie('token');

	const handleDelete = (e) => {
		axios
			.delete(`${process.env.REACT_APP_SERVER}/api/entry/delete/${entry._id}`, {
				headers: { authorization: `Bearer ${token}` },
			})
			.then((response) => {
				toast.info('Entry Deleted');
				history.push(`/user/${entry.user}`);
			})
			.catch((error) => {
				// console.log(error);
				toast.error('Enable to delete the Entry');
			});
	};

	return (
		<div
			className='relative xs:mx-4 sm:mx-10 md:mx-20 lg:mx-24 xl:mx-28 2xl:mx-32 z-0 bg-gray-100 dark:bg-gray-800 dark:text-gray-50 border dark:border-gray-900 rounded-md transform hover:scale-110 transition duration-500 ease-in-out hover:z-50 shadow-md hover:shadow-xl hover:bg-white dark:hover:bg-gray-700 font-bold text-sm'
			style={{ height: '100px' }}
		>
			<div className='' style={{ width: 'calc(100% - 110px)' }}>
				<div
					className='overflow-y-scroll'
					style={{ height: '52px', margin: '8px 10px' }}
				>
					{entry.title}
				</div>
				<div
					className='overflow-scroll'
					style={{ height: '38px', margin: '0px 10px' }}
				>
					{entry.tags
						?.split(',')
						.map((tag) => (tag.length ? <Tag key={tag} tag={tag} /> : null))}
				</div>
			</div>
			<div className='absolute top-0 right-0' style={{ width: '100px' }}>
				<Link
					to={`/entry/${entry._id}`}
					className='bg-green-500 hover:bg-green-600 text-white p-2 m-2 text-center rounded block'
					// style={{ width: '25px' }}
				>
					OPEN
				</Link>
				{editable ? (
					<Link
						to={'#'}
						onClick={handleDelete}
						className='bg-red-500 hover:bg-red-600 text-white p-2 m-2 text-center rounded block'
					>
						DELETE
					</Link>
				) : null}
			</div>
		</div>
	);
};

export default Entry;
