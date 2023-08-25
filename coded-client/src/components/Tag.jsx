import React from 'react';

const Tag = ({ tag }) => {
	return (
		<div
			className='rounded-md border-2 border-yellow-600 inline-block px-2 mx-1 text-xxs uppercase font-semibold text-gray-700 dark:text-gray-200'
			style={{ height: '21px' }}
		>
			{tag}
		</div>
	);
};

export default Tag;
