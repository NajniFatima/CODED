import cookie from 'js-cookie';

const setCookie = (key, value) => {
	if (window !== 'undefined') cookie.set(key, value, { expires: 1 });
};

const removeCookie = (key) => {
	if (window !== 'undefined') cookie.remove(key, { expires: 1 });
};

const getCookie = (key) => {
	if (window !== 'undefined') return cookie.get(key);
};

const setLocalStorage = (key, value) => {
	if (window !== 'undefined') localStorage.setItem(key, JSON.stringify(value));
};

const removeLocalStorage = (key) => {
	if (window !== 'undefined') localStorage.removeItem(key);
};

const authenticate = (response, next) => {
	// console.log('AUTHENTICATE HELPER ON SIGNIN RESPONSE', response);
	setCookie('token', response.data.token);
	setLocalStorage('user', response.data.user);
	next();
};

const isAuth = () => {
	if (window !== 'undefined') {
		const cookieChecked = getCookie('token');
		if (cookieChecked) {
			if (localStorage.getItem('user'))
				return JSON.parse(localStorage.getItem('user'));
			else return false;
		}
	}
};

const signout = (next) => {
	removeCookie('token');
	removeLocalStorage('user');
	next();
};

const updateUser = (response, next) => {
	// console.log('UPDATE USER IN LOCALSTORAGE HELPER', response);
	if (typeof window !== 'undefined') {
		let auth = JSON.parse(localStorage.getItem('user'));
		auth = response.data;
		localStorage.setItem('user', JSON.stringify(auth));
	}
};

export {
	setCookie,
	removeCookie,
	getCookie,
	setLocalStorage,
	removeLocalStorage,
	authenticate,
	isAuth,
	signout,
	updateUser,
};
