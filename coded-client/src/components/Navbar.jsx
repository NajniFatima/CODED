import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import axios from 'axios';
import { useLocation, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { ToastContainer, toast } from 'react-toastify';
import ReactTooltip from 'react-tooltip';
import Draggable from 'react-draggable';
import {
	EmailShareButton,
	FacebookShareButton,
	LinkedinShareButton,
	TelegramShareButton,
	TwitterShareButton,
	WhatsappShareButton,
} from 'react-share';

import { isAuth, getCookie, signout } from '../util/auth';
import LanguageSelector from '../components/LanguageSelector';

import backicon from '../asset/previous.png';
import darkicon from '../asset/day-and-night.png';
import minimapicon from '../asset/map.png';
import lineselecticon from '../asset/select.png';
// import scrollbaricon from '../asset/scroll.png';
import suggestionicon from '../asset/chat.png';
// import foldingicon from '../asset/office-material.png';
import login from '../asset/enter.png';
import register from '../asset/add.png';
import logout from '../asset/logout.png';
import settings from '../asset/admin.png';
import dashboard from '../asset/dashboard.png';
import logo from '../asset/logo.svg';
import logosmall from '../asset/logosmall.svg';

import 'react-toastify/dist/ReactToastify.css';

import { runEntry, changeTitle, changeTags } from '../actions/entryActions';

import {
	setTheme,
	setMinimap,
	// setShowUnused,
	// setShowFoldingControls,
	setSelectOnLineNumber,
	// setScrollbar,
	setQuickSuggestion,
} from '../actions/settingsActions';

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

const Navbar = () => {
	const location = useLocation();
	const history = useHistory();

	const token = getCookie('token');

	const Entry = useSelector((state) => state.entry);

	const [button, setButton] = useState('Submit');

	const { _id, language, input, code, title, tags, user } = Entry;

	const dispatch = useDispatch();

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
		setButton('...');
		if (location.pathname === '/editor') {
			axios
				.post(
					`${process.env.REACT_APP_SERVER}/api/entry/save`,
					{
						title,
						tags,
						code,
						input,
						language,
					},
					{
						headers: {
							authorization: `Bearer ${token}`,
						},
					}
				)
				.then((response) => {
					closeModal();
					toast.success('Entry Saved');
					history.push(`/entry/${response.data._id}`);
					setButton('Submit');
				})
				.catch((error) => {
					toast.error('Unable to save Entry');
					setButton('Submit');
				});
		} else {
			axios
				.post(
					`${process.env.REACT_APP_SERVER}/api/entry/save/${_id}`,
					{
						title,
						tags,
						code,
						input,
						language,
					},
					{
						headers: {
							authorization: `Bearer ${token}`,
						},
					}
				)
				.then((response) => {
					closeModal();
					toast.success('Entry Updated');
					setButton('Submit');
				})
				.catch((error) => {
					toast.error('Unable to save Entry');
					setButton('Submit');
				});
		}
	};

	return (
		<nav className='mx-auto flex justify-between items-center relative z-100'>
			<div>
				{location.pathname === '/editor' ||
				location.pathname.substr(0, 6) === '/entry' ? (
					<LanguageSelector />
				) : null}
				<div className='relative h-0 shadow-xl'>
					<div className='abslute top-56 left-0'>
						<Draggable handle='#handle'>
							<div className='w-14 rounded text-center'>
								<div
									id='handle'
									className='text-gray-600 bg-white rounded mb-1 text-xs font-bold'
								>
									::<span className='uppercase text-xxs font-bold'>drag</span>
									::
								</div>
								<EmailShareButton url={window.location.href} className='px-2'>
									<i className='fas fa-envelope-open-text text-xl p-1 focus:outline-none text-red-600'></i>
								</EmailShareButton>
								<TwitterShareButton url={window.location.href} className='px-2'>
									<i className='fab fa-twitter text-xl p-1 focus:outline-none text-blue-500'></i>
								</TwitterShareButton>
								<LinkedinShareButton
									url={window.location.href}
									className='px-2'
								>
									<i className='fab fa-linkedin text-xl p-1 focus:outline-none text-blue-700'></i>
								</LinkedinShareButton>
								<FacebookShareButton
									url={window.location.href}
									className='px-2'
								>
									<i className='fab fa-facebook text-xl p-1 focus:outline-none text-blue-800'></i>
								</FacebookShareButton>
								<TelegramShareButton
									url={window.location.href}
									className='px-2'
								>
									<i className='fab fa-telegram text-xl p-1 focus:outline-none text-blue-600'></i>
								</TelegramShareButton>
								<WhatsappShareButton
									url={window.location.href}
									className='px-2'
								>
									<i className='fab fa-whatsapp text-xl p-1 focus:outline-none text-green-600'></i>
								</WhatsappShareButton>
							</div>
						</Draggable>
					</div>
				</div>
			</div>
			<ToastContainer
				position='top-center'
				autoClose={5000}
				hideProgressBar
				newestOnTop
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable={false}
				pauseOnHover
			/>
			<div className='items-center'>
				<div className='flex flex-row mx-3'>
					{/* {console.log(window.innerWidth)} */}
					{window.innerWidth > 500 ? (
						<Link
							to={'/'}
							className='relative bg-white my-2 rounded-full h-10 w-32 shadow-md inline-block hover:shadow-lg transform hover:scale-125 transition duration-500 ease-in-out cursor-pointer z-20 hover:z-20'
						>
							<img
								src={logo}
								alt='coded'
								width='117'
								className='-mt-20 inline'
							/>
						</Link>
					) : (
						<Link
							to={'/'}
							className='relative bg-white my-2 rounded-full h-10 w-10 shadow-md inline-block hover:shadow-lg transform hover:scale-125 transition duration-500 ease-in-out cursor-pointer z-20 hover:z-20'
						>
							<img src={logosmall} alt='coded' width='28' className='m-1.5' />
						</Link>
					)}
					{isAuth() &&
					// window.innerWidth > 500 &&
					(location.pathname === '/editor' ||
						(location.pathname.substr(0, 6) === '/entry' &&
							isAuth()._id === user)) ? (
						<div
							className='nav-button z-10 hover:scale-125'
							onClick={openModal}
							data-tip='save code'
						>
							<i className='fas fa-save text-3xl my-0.5 mx-1.5 text-blue-700 animate-wiggle'></i>
						</div>
					) : null}
					<Modal
						isOpen={modalIsOpen}
						onAfterOpen={afterOpenModal}
						onRequestClose={closeModal}
						style={customStyles}
						contentLabel='Example Modal'
					>
						<h2 ref={(_subtitle) => (subtitle = _subtitle)}>Entry Info:</h2>
						<form onSubmit={handleSubmit}>
							<input
								type='text'
								placeholder='title'
								onChange={(e) => dispatch(changeTitle(e.target.value))}
								value={title}
								className='p-3 my-3 xs:w-56 sm:w-56 md:w-96 rounded block shadow'
								required
							/>
							<textarea
								placeholder='tags [comma separated]'
								onChange={(e) => dispatch(changeTags(e.target.value))}
								value={tags}
								className='p-3 my-3 xs:w-56 sm:w-56 md:w-96 rounded block shadow'
								required
							/>

							<button
								className='p-3 my-1.5 font-bold text-white uppercase bg-yellow-600 hover:bg-yellow-700 xs:w-56 sm:w-56 md:w-96 rounded'
								type='submit'
							>
								{button}
							</button>
						</form>
					</Modal>
					{location.pathname === '/editor' ||
					location.pathname.substr(0, 6) === '/entry' ? (
						<div
							className='nav-button z-10 hover:scale-125'
							onClick={(e) => dispatch(runEntry(language, input, code))}
							data-tip='run code'
						>
							<i className='fas fa-check-circle text-3xl my-0.5 mx-1.5 text-green-500 animate-wiggle'></i>
						</div>
					) : null}
					<div className='text-white font-bold'>
						<Dropdown
							icon={
								<div className='nav-button z-10 hover:bg-gray-200 dark:hover:bg-gray-600'>
									<i className='fas fa-user-alt text-2xl my-0.5 mx-2 animate-wiggle text-black'></i>
								</div>
							}
						>
							<DropdownMenu></DropdownMenu>
						</Dropdown>
					</div>
				</div>
			</div>
			<ReactTooltip place='bottom' type='dark' effect='solid' />
		</nav>
	);
};

function Dropdown(props) {
	const [open, setOpen] = useState(false);

	return (
		<React.Fragment>
			<div onClick={() => setOpen(!open)}>{props.icon}</div>

			{open && props.children}
		</React.Fragment>
	);
}

function DropdownMenu() {
	const history = useHistory();

	const settingsInfo = useSelector((state) => state.settings);

	const dispatch = useDispatch();

	const {
		theme,
		minimap,
		// showUnused,
		// showFoldingControls,
		selectOnLineNumbers,
		// scrollbar,
		quickSuggestion,
	} = settingsInfo;

	const [currTheme, setCurrTheme] = useState(theme === 'dark');
	// const [currScrollbar, setCurrScrollbar] = useState(scrollbar);
	const [currSelectOnLineNumbers, setCurrSelectOnLineNumbers] =
		useState(selectOnLineNumbers);
	const [currMinimap, setCurrMinimap] = useState(minimap);
	// const [currShowUnused, setCurrShowUnused] = useState(showUnused);
	const [currQuickSuggestion, setCurrQuickSuggestion] =
		useState(quickSuggestion);
	// const [currShowFoldingControls, setCurrShowFoldingControls] =
	// useState(showFoldingControls);

	useEffect(() => {
		dispatch(setTheme(currTheme ? 'dark' : 'light'));
	}, [dispatch, currTheme]);

	useEffect(() => {
		dispatch(setMinimap(currMinimap));
	}, [dispatch, currMinimap]);

	// useEffect(() => {
	// 	dispatch(setShowUnused(currShowUnused));
	// }, [dispatch, currShowUnused]);

	useEffect(() => {
		dispatch(setSelectOnLineNumber(currSelectOnLineNumbers));
	}, [dispatch, currSelectOnLineNumbers]);

	// useEffect(() => {
	// 	dispatch(setScrollbar(currScrollbar));
	// }, [dispatch, currScrollbar]);

	useEffect(() => {
		dispatch(setQuickSuggestion(currQuickSuggestion));
	}, [dispatch, currQuickSuggestion]);

	// useEffect(() => {
	// 	dispatch(setShowFoldingControls(currShowFoldingControls));
	// }, [dispatch, currShowFoldingControls]);

	// const location = useLocation();

	const [activeMenu, setActiveMenu] = useState('main');
	const [menuHeight, setMenuHeight] = useState(null);
	const dropdownRef = useRef(null);

	useEffect(() => {
		setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
	}, []);

	function calcHeight(ele) {
		const height = ele.offsetHeight;
		setMenuHeight(height);
	}

	function DropdownItem(props) {
		return (
			<Link
				to={props.link}
				className='menu-item'
				onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
			>
				<span className='icon-button'>{props.leftIcon}</span>
				{props.children}
				<span className='icon-right'>{props.rightIcon}</span>
			</Link>
		);
	}

	return (
		<div className='dropdown ' style={{ height: menuHeight }} ref={dropdownRef}>
			<CSSTransition
				in={activeMenu === 'main'}
				timeout={500}
				classNames='menu-primary'
				unmountOnExit
				onEnter={calcHeight}
			>
				<div className='menu'>
					{isAuth() ? (
						<DropdownItem
							link={`/user/${isAuth()?._id}`}
							leftIcon={<img src={dashboard} alt='' />}
						>
							Dashboard
						</DropdownItem>
					) : null}
					<DropdownItem
						link={'#'}
						leftIcon={<img src={settings} alt='' />}
						goToMenu='settings'
					>
						Settings
					</DropdownItem>
					{isAuth() ? null : (
						<DropdownItem
							link={'/login'}
							leftIcon={<img src={login} alt='' />}
							rightIcon={<i></i>}
						>
							Log in
						</DropdownItem>
					)}
					{isAuth() ? null : (
						<DropdownItem
							link={'/register'}
							leftIcon={<img src={register} alt='' />}
							rightIcon={<i></i>}
						>
							Register
						</DropdownItem>
					)}
					{isAuth() ? (
						<div onClick={() => signout((e) => history.push('/login'))}>
							<DropdownItem
								link={'/login'}
								leftIcon={<img src={logout} alt='' />}
								rightIcon={<i></i>}
							>
								Log Out
							</DropdownItem>
						</div>
					) : null}
					<div className='p-2 text-center text-xs font-extrabold text-gray-600'>
						<hr className='-mt-2 mb-1 border-gray-700' />
						<span className='text-xxs uppercase'>
							made with
							<i className='fab fa-react text-blue-500 text-sm pl-1'></i>,
							<i className='fab fa-node-js text-green-500 text-sm pl-1'></i> &
							<i className='fas fa-heart text-red-500 text-sm px-1'></i> by
							{': '}
						</span>
						<Link
							to={{
								pathname:
									'https://www.linkedin.com/in/md-musibul-islam-4a1117165/',
							}}
							target='_blank'
							className='hover:text-yellow-600'
							rel='noreferrer'
						>
							@mdmusibul
						</Link>
					</div>
				</div>
			</CSSTransition>

			<CSSTransition
				in={activeMenu === 'settings'}
				timeout={500}
				classNames='menu-secondary'
				unmountOnExit
				onEnter={calcHeight}
			>
				<div className='menu'>
					<DropdownItem
						link={'#'}
						goToMenu='main'
						leftIcon={<img src={backicon} alt='' />}
					>
						<h2>Back</h2>
					</DropdownItem>
					<div onClick={() => setCurrTheme(!currTheme)}>
						<DropdownItem
							link={'#'}
							leftIcon={<img src={darkicon} alt='' />}
							rightIcon={
								<i
									className={
										'fas fa-circle ' +
										(currTheme ? 'text-green-500' : 'text-red-500')
									}
								></i>
							}
						>
							Dark Mode
						</DropdownItem>
					</div>
					<div onClick={() => setCurrMinimap(!currMinimap)}>
						<DropdownItem
							link={'#'}
							leftIcon={<img src={minimapicon} alt='' />}
							rightIcon={
								<i
									className={
										'fas fa-circle ' +
										(currMinimap ? 'text-green-500' : 'text-red-500')
									}
								></i>
							}
						>
							Editor Minimap
						</DropdownItem>
					</div>
					<div
						onClick={() => setCurrSelectOnLineNumbers(!currSelectOnLineNumbers)}
					>
						<DropdownItem
							link={'#'}
							leftIcon={<img src={lineselecticon} alt='' />}
							rightIcon={
								<i
									className={
										'fas fa-circle ' +
										(currSelectOnLineNumbers
											? 'text-green-500'
											: 'text-red-500')
									}
								></i>
							}
						>
							Select on Line Number
						</DropdownItem>
					</div>
					{/* <div onClick={() => setCurrScrollbar(!currScrollbar)}>
						<DropdownItem
							leftIcon={<img src={scrollbaricon} alt='' />} rightIcon={<i className={'fas fa-circle '+(currScrollbar? 'text-green-500': 'text-red'-500)}></i>} 
						>
							Editor Scrollbar
						</DropdownItem>
					</div> */}
					{/* <div onClick={() => setCurrShowUnused(!currShowUnused)}>
						<DropdownItem
							leftIcon={<img src={backicon} alt='' />} rightIcon={<i className={'fas fa-circle '+(currShowUnused? 'text-green-500': 'text-red'-500)}></i>} 
						>
							Show Unused
						</DropdownItem>
					</div> */}
					<div onClick={() => setCurrQuickSuggestion(!currQuickSuggestion)}>
						<DropdownItem
							link={'#'}
							leftIcon={<img src={suggestionicon} alt='' />}
							rightIcon={
								<i
									className={
										'fas fa-circle ' +
										(currQuickSuggestion ? 'text-green-500' : 'text-red-500')
									}
								></i>
							}
						>
							Quick Suggestion
						</DropdownItem>
					</div>
					{/* <div
						onClick={() => setCurrShowFoldingControls(!currShowFoldingControls)}
					>
						<DropdownItem
							leftIcon={<img src={foldingicon} alt='' />} rightIcon={<i className={'fas fa-circle '+(currShowFoldingControls? 'text-green-500': 'text-red'-500)}></i>} 
						>
							Folding Controls
						</DropdownItem>
					</div> */}
				</div>
			</CSSTransition>
		</div>
	);
}

export default Navbar;
