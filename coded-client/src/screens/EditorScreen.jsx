import React, { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import { useDispatch, useSelector } from 'react-redux';
import { useResizeDetector } from 'react-resize-detector';
import {
	changeId,
	changeTitle,
	changeTags,
	changeLanguage,
	changeOutput,
	changeInput,
	changeCode,
} from '../actions/entryActions';

const editorLanguage = {
	language: 'language',
	c: 'c',
	c99: 'c',
	cpp: 'cpp',
	cpp14: 'cpp',
	cpp17: 'cpp',
	csharp: 'csharp',
	coffeescript: 'coffeescript',
	dart: 'dart',
	fsharp: 'fsharp',
	go: 'go',
	java: 'java',
	lua: 'lua',
	nodejs: 'javascript',
	objc: 'objective-c',
	pascal: 'pascal',
	perl: 'perl',
	python2: 'python',
	python3: 'python',
	r: 'r',
	ruby: 'ruby',
	rust: 'rust',
	scala: 'scala',
	swift: 'swift',
	verilog: 'verilog',
};

const EditorScreen = () => {
	document.title = 'CODED editor';

	const dispatch = useDispatch();
	const [fontsize, setFontsize] = useState(24);
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

	const { language, input, output, code } = entryInfo;

	useEffect(() => {
		var size = window.innerWidth < 500 ? 12 : 24;
		setFontsize(size);
		dispatch(changeId(''));
		dispatch(changeTitle(''));
		dispatch(changeTags(''));
		dispatch(changeInput(''));
		dispatch(changeCode(''));
		dispatch(changeLanguage(''));
		dispatch(changeOutput(''));
	}, [dispatch]);

	return (
		<div className='z-0'>
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
						fontSize: { fontsize },
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
					className='m-2 p-2 rounded-md whitespace-nowrap resize-none bg-white dark:bg-gray-800 shadow-md dark:text-white'
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

export default EditorScreen;
