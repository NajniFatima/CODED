const INITIAL_STATE = {
	_id: '',
	title: '',
	tags: '',
	language: 'c',
	user: '',
	input: '',
	output: '',
	code: '',
	commandLineArguements: '',
	loading: false,
};

const entryReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'CHANGE_ID':
			return { ...state, _id: action.payload };
		case 'CHANGE_LANGUAGE':
			return { ...state, language: action.payload };
		case 'CHANGE_INPUT':
			return { ...state, input: action.payload };
		case 'CHANGE_CODE':
			return { ...state, code: action.payload };
		case 'CHANGE_TITLE':
			return { ...state, title: action.payload };
		case 'CHANGE_TAGS':
			return { ...state, tags: action.payload };
		case 'CHANGE_OUTPUT':
			return { ...state, output: action.payload };
		case 'CHANGE_USER':
			return { ...state, user: action.payload };
		case 'ENABLE_LOADING':
			return { ...state, output: 'Processing...' };
		case 'SET_OUTPUT':
			return { ...state, output: action.payload.output };
		case 'SET_OUTPUT_ERROR':
			return {
				...state,
				output: 'error occured while processing the program please try again',
			};
		case 'ENTRY_DETAILS_REQUEST':
			return { ...state, loading: true };
		case 'ENTRY_DETAILS_SUCCESS':
			return {
				loading: false,
				_id: action.payload._id,
				code: action.payload.code,
			};
		case 'ENTRY_DETAILS_FAIL':
			return { loading: false, output: action.payload };
		case 'DISABLE_LOADING':
			return { ...state, loading: false };
		default:
			return state;
	}
};

export default entryReducer;
