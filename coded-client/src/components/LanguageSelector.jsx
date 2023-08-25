import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { changeLanguage } from '../actions/entryActions';

const LanguageSelector = () => {
	const dispatch = useDispatch();

	const Entry = useSelector((state) => state.entry);

	const { language } = Entry;
	return (
		<select
			name='language'
			id='language'
			value={language}
			onChange={(e) => dispatch(changeLanguage(e.target.value))}
			className='p-2 ml-4 rounded bg-gray-100 dark:bg-gray-700 focus:outline-none'
		>
			<option value='language'>Language</option>
			<option value='c'>C</option>
			<option value='c99'>C 99</option>
			<option value='cpp'>C++</option>
			<option value='cpp14'>C++ 14</option>
			<option value='cpp17'>C++ 17</option>
			<option value='csharp'>C#</option>
			{/* <option value='coffeescript'>CoffeeScript</option> */}
			{/* <option value='dart'>Dart</option> */}
			{/* <option value='fsharp'>F #</option> */}
			{/* <option value='go'>GO</option> */}
			<option value='java'>Java</option>
			{/* <option value='lua'>Lua</option> */}
			<option value='nodejs'>JavaScript</option>
			{/* <option value='objc'>Objective C</option> */}
			{/* <option value='pascal'>Pascal</option> */}
			{/* <option value='perl'>Perl</option> */}
			<option value='python2'>Python 2</option>
			<option value='python3'>Python 3</option>
			{/* <option value='r'>R</option> */}
			{/* <option value='ruby'>Ruby</option> */}
			{/* <option value='rust'>Rust</option> */}
			{/* <option value='scala'>Scala</option> */}
			{/* <option value='swift'>Swift</option> */}
			<option value='verilog'>Verilog</option>
		</select>
	);
};

export default LanguageSelector;
