import axios from 'axios';
import { toast } from 'react-toastify';

const changeId = (value) => ({
	type: 'CHANGE_ID',
	payload: value,
});

const changeLanguage = (value) => ({
	type: 'CHANGE_LANGUAGE',
	payload: value,
});

const changeInput = (value) => ({
	type: 'CHANGE_INPUT',
	payload: value,
});

const changeOutput = (value) => ({
	type: 'CHANGE_OUTPUT',
	payload: value,
});

const changeCode = (value) => ({
	type: 'CHANGE_CODE',
	payload: value,
});

const changeTitle = (value) => ({
	type: 'CHANGE_TITLE',
	payload: value,
});

const changeTags = (value) => ({
	type: 'CHANGE_TAGS',
	payload: value,
});

const changeUser = (value) => ({
	type: 'CHANGE_USER',
	payload: value,
});

const runEntry = (language, input, code) => (dispatch) => {
	// console.log(language);
	// console.log(input);
	// console.log(code);
	// console.log(process.env.REACT_APP_SERVER);
	if (!code) toast.error('Enter code');
	else if (language === 'language' || language === '')
		toast.error('Select Language');
	else {
		dispatch({ type: 'ENABLE_LOADING' });
		axios
			.post(`${process.env.REACT_APP_SERVER}/api/entry/run`, {
				language,
				input,
				code,
			})
			.then((entry) => {
				// console.log(entry);
				dispatch({ type: 'SET_OUTPUT', payload: entry.data });
			})
			.catch((error) => {
				dispatch({
					type: 'SET_OUTPUT_ERROR',
					payload:
						error.response && error.response.data.message
							? error.response.data.message
							: error.message,
				});
			});
		dispatch({ type: 'DISABLE_LOADING' });
	}
};

export {
	changeLanguage,
	runEntry,
	changeInput,
	changeCode,
	changeTitle,
	changeTags,
	changeId,
	changeOutput,
	changeUser,
};
