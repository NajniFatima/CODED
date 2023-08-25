import React, { useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useResizeDetector } from 'react-resize-detector';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
	changeLanguage,
	changeInput,
	changeCode,
	changeTitle,
	changeTags,
	changeId,
	changeUser,
} from '../actions/entryActions';

const editorLanguage = {
	ada: 'ada',
	bash: 'bask',
	c: 'c',
	c99: 'c',
	cpp: 'cpp',
	cpp14: 'cpp',
	cpp17: 'cpp',
	csharp: 'C#',
	coffeescript: 'coffeescript',
	dart: 'dart',
	fsharp: 'fsharp',
	go: 'go',
	haskell: 'haskell',
	java: 'java',
	kotlin: 'kotlin',
	lua: 'lua',
	nodejs: 'nodejs',
	objc: 'objc',
	octave: 'octave',
	pascal: 'pascal',
	perl: 'perl',
	php: 'php',
	prolog: 'prolog',
	python2: 'python2',
	python3: 'python3',
	r: 'r',
	ruby: 'ruby',
	rust: 'rust',
	scala: 'scala',
	sql: 'sql',
	swift: 'swift',
	verilog: 'verilog',
};

const UserEntryScreen = ({ match }) => {
	document.title = 'CODED entry';

	const history = useHistory();
	const dispatch = useDispatch();
	const { width, height, ref } = useResizeDetector();

	const settingsInfo = useSelector((state) => state.settings);
	const entryInfo = useSelector((state) => state.entry);

	const {
		theme,
		minimap,
		scrollbar,
		showUnused,
		quickSuggestion,
		showFoldingControls,
		selectOnLineNumbers,
	} = settingsInfo;

	const { language, input, code, output } = entryInfo;

	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_SERVER}/api/entry/${match.params.id}`)
			.then((response) => {
				// console.log(response.data);
				dispatch(changeLanguage(response.data.language));
				dispatch(changeInput(response.data.input));
				dispatch(changeCode(response.data.code));
				dispatch(changeTitle(response.data.title));
				dispatch(changeTags(response.data.tags));
				dispatch(changeId(response.data._id));
				dispatch(changeUser(response.data.user));
				toast.info('Entry Fetched');
			})
			.catch((error) => {
				toast.error('Entry not found');
				history.push('/editor');
			});
	}, [dispatch, history, match.params.id]);

	return (
		<div className='z-0 bg-gray-200 dark:bg-gray-900'>
			<div
				className='mx-2 mb-2 shadow-md'
				style={{ height: '77.6vh', weight: '100vw' }}
				ref={ref}
			>
				<Editor
					height={height}
					width={width}
					language={editorLanguage[language]}
					theme={`vs-${theme}`}
					value={code}
					options={{
						minimap: { enabled: minimap },
						// fontSize: 20,
						showFoldingControls: showFoldingControls,
						selectOnLineNumbers: selectOnLineNumbers,
						scrollbar: scrollbar,
						quickSuggestions: quickSuggestion,
						showUnused: showUnused,
					}}
					onChange={(enteredCode, e) => dispatch(changeCode(enteredCode))}
				/>
			</div>
			<div className='grid xs:grid-cols-1 sm:grid-cols-2'>
				<textarea
					name='input'
					id='input'
					onChange={(e) => dispatch(changeInput(e.target.value))}
					value={input}
					rows='5'
					placeholder='input'
					className='m-2 p-2 rounded-md resize-none bg-white dark:bg-gray-800 shadow-md dark:text-white'
				/>
				<textarea
					name='output'
					id='output'
					value={output}
					rows='5'
					readOnly={true}
					placeholder='output'
					className='m-2 p-2 rounded-md resize-none cursor-not-allowed bg-gray-100 dark:bg-gray-900 shadow-md dark:text-white'
				/>
			</div>
		</div>
	);
};

export default UserEntryScreen;
