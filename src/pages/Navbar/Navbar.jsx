import { useContext, useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'

// react tostify
import toast from "react-hot-toast";
import { AuthContext } from '../../AuthProvider/AuthProvider';





const Navbar = () => {

    const [dropDownState, setDropDownState] = useState(false);
    const dropDownMenuRef = useRef();
    const { user, logOut } = useContext(AuthContext)
    const error = () => toast.error("Please Before Login !");
    console.log(user)
    const navigate = useNavigate()

    // Initialize state variables
    const [theme, setTheme] = useState(() => {
        // Retrieve theme from localStorage on component mount
        const locatTheme = localStorage.getItem("theme");
        // If no theme is found in localStorage, default to dark theme
        // return locatTheme === "dark" ? true : false;
        return locatTheme === "light" ? true : false;
    });

    // Function to toggle theme
    const toggleTheme = () => {
        setTheme(prevTheme => !prevTheme);
    }

    useEffect(() => {
        // Store current theme in localStorage
        // localStorage.setItem("theme", theme ? "dark" : "light");
        localStorage.setItem("theme", theme ? "light" : "dark");

        // Apply theme to HTML element
        // document.querySelector('html').setAttribute('data-theme', theme ? "dark" : "light");
        document.querySelector('html').setAttribute('data-theme', theme ? "light" : "dark");
    }, [theme]); // Re-run effect when theme changes

    const successfullyLogOut = () => {
        Swal.fire({
            title: "Logged Out Successfully!",
            text: "Goodbye for Now !",
            icon: "success"
        });
        navigate("/login")
    }
    useEffect(() => {
        const closeDropDown = (e) => {
            if (!dropDownMenuRef?.current?.contains(e?.target)) {
                setDropDownState(false);
            }
        };

        document.addEventListener('mousedown', closeDropDown);

        return () => {
            document.removeEventListener('mousedown', closeDropDown);
        };
    }, []);

    const handleLogout = () => {
        if (user) {
            logOut()
                .then(res => {
                    successfullyLogOut()

                })
                .catch(err => console.log(err))

        }
        else {
            error()
        }

    }



    return (
        <div>
            <nav className="flex items-center justify-between  px-4 py-2 leading-none dark:text-white pt-[30px] dark:bg-black  font-bold ">
                {/* <nav className="flex items-center justify-between bg-gradient-to-t from-[#487497] to-[#004e81]  px-4 py-2 text-black pt-[30px]  "> */}
                <NavLink to="/"  >
                    <div className="scale-100 cursor-pointer rounded-2xl px-3 py-2 text-xl flex justify-center items-center font-semibold leading-none dark:text-white transition-all duration-200 hover:scale-110">
                        <img src="https://i.ibb.co/MNmyYSr/Group-40071-2.png" alt="Logo" />
                        <h2 className='text-[30px] font-bold hidden lg:flex leading-none dark:text-white' >Travels<span className='text-[#FF5400]' >Book</span></h2>
                    </div>
                </NavLink>
                <ul className="hidden items-center justify-between gap-10 lg:flex">
                    <NavLink to="/" className={({ isActive }) => isActive ? 'text-[#FF5400]' : 'leading-none dark:text-white'} >
                        <li className="group flex cursor-pointer flex-col">
                            Home<span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
                        </li>
                    </NavLink>
                    <NavLink to="/rooms" className={({ isActive }) => isActive ? 'text-[#FF5400]' : 'leading-none dark:text-white'}  >
                        <li className="group flex  cursor-pointer flex-col">
                            Rooms<span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
                        </li>
                    </NavLink>

                    {
                        user && <>

                            <NavLink to="/myBooking" className={({ isActive }) => isActive ? 'text-[#FF5400]' : 'leading-none dark:text-white'}  >
                                <li className="group flex  cursor-pointer flex-col  ">
                                    My Booking<span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
                                </li>
                            </NavLink>
                            <NavLink to="/bookmarks" className={({ isActive }) => isActive ? 'text-[#FF5400]' : 'leading-none dark:text-white'}  >
                                <li className="group flex  cursor-pointer flex-col  ">
                                    Bookmarks<span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
                                </li>
                            </NavLink>

                            <NavLink to="/userProfile" className={({ isActive }) => isActive ? 'text-[#FF5400]' : 'leading-none dark:text-white'}  >
                                <li className="group flex  cursor-pointer flex-col  ">
                                    Profile<span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
                                </li>
                            </NavLink>
                        </>
                    }


                </ul>

                <div ref={dropDownMenuRef} onClick={() => setDropDownState(!dropDownState)} className=" relative flex justify-center items-center gap-3 transition-transform lg:hidden">
                    <div className='' >
                        {/* Theme switcher */}
                        <label className="swap swap-rotate">
                            {/* Hidden checkbox to control theme */}
                            <input type="checkbox" onClick={toggleTheme} checked={theme} className={`theme-controller`} />
                            {/* Sun icon for light theme */}
                            <svg className="swap-off fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
                            {/* Moon icon for dark theme */}
                            <svg className="swap-on fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>
                        </label>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer" > <line x1="4" x2="20" y1="12" y2="12" /> <line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /> </svg>
                    {dropDownState && (
                        <ul className=" z-10 py-[20px] gap-2  bg-[#393E46]  absolute right-0 top-11 flex w-[200px] flex-col  rounded-lg   text-base ">

                            <NavLink to="/" className={({ isActive }) => isActive ? 'text-[#FF5400] ' : ' text-white hover:bg-[#FF5400]'} >
                                <li className="group flex cursor-pointer flex-col pl-[20px] ">
                                    Home
                                </li>
                            </NavLink>
                            <NavLink to="/rooms" className={({ isActive }) => isActive ? 'text-[#FF5400] ' : ' text-white hover:bg-[#FF5400]'} >
                                <li className="group flex cursor-pointer flex-col pl-[20px]">
                                    Rooms
                                </li>
                            </NavLink>
                            {
                                user ? <>

                                    <NavLink to="/myBooking" className={({ isActive }) => isActive ? 'text-[#FF5400] ' : ' text-white hover:bg-[#FF5400]'} >
                                        <li className="group flex cursor-pointer flex-col pl-[20px]">
                                            My Booking
                                        </li>
                                    </NavLink>
                                    <NavLink to="/bookmarks" className={({ isActive }) => isActive ? 'text-[#FF5400] ' : ' text-white hover:bg-[#FF5400]'} >
                                        <li className="group flex cursor-pointer flex-col pl-[20px]">
                                           Bookmark
                                        </li>
                                    </NavLink>
                                    <NavLink to="/userProfile" className={({ isActive }) => isActive ? 'text-[#FF5400] ' : ' text-white hover:bg-[#FF5400]'} >
                                        <li className="group flex cursor-pointer flex-col pl-[20px]">
                                            Profile
                                        </li>
                                    </NavLink>
                                    <NavLink onClick={handleLogout} className={({ isActive }) => isActive ? 'text-[#ffffff] ' : ' text-white hover:bg-[#FF5400]'} >
                                        <li className="group flex cursor-pointer flex-col pl-[20px]">
                                            Log Out
                                        </li>
                                    </NavLink>
                                </> : <>
                                    <NavLink to="/login" className={({ isActive }) => isActive ? 'text-[#FF5400] ' : ' text-white hover:bg-[#FF5400]'} >
                                        <li className="group flex cursor-pointer flex-col pl-[20px]">
                                            Login
                                        </li>
                                    </NavLink>
                                    <NavLink to="/register" className={({ isActive }) => isActive ? 'text-[#FF5400] ' : ' text-white hover:bg-[#FF5400]'} >
                                        <li className="group flex cursor-pointer flex-col pl-[20px]">
                                            Register
                                        </li>
                                    </NavLink>
                                </>
                            }

                        </ul>


                    )}
                </div>






                <div className='hidden lg:flex' >
                    {
                        user ? <div className='flex items-center justify-center gap-4'>
                            <div>
                                {/* Theme switcher */}
                                <label className="swap swap-rotate">
                                    {/* Hidden checkbox to control theme */}
                                    <input type="checkbox" onClick={toggleTheme} checked={theme} className={`theme-controller`} />
                                    {/* Sun icon for light theme */}
                                    <svg className="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
                                    {/* Moon icon for dark theme */}
                                    <svg className="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>
                                </label>
                            </div>

                            <div
                                data-tooltip-id="my-tooltip"
                                data-tooltip-content={user.displayName}
                                data-tooltip-place="top"
                                className="relative group">
                                <Link to="/userProfile" >

                                    <img className="size-[55px]  bg-slate-500 object-cover rounded-full" src={user.photoURL || "https://source.unsplash.com/300x300/?profile"} alt="avatar navigate ui" />
                                </Link>
                                <span className="size-4 bg-green-500 absolute rounded-full bottom-2 right-0 border-[3px] border-white"></span>
                                <span className="size-4 bg-green-500 absolute rounded-full bottom-2 right-0 animate-ping"></span>
                                <Tooltip id="my-tooltip" />
                            </div>

                            <button onClick={handleLogout} className="rounded-lg border-2 border-sky-500 px-5 py-2 text-xl text-sky-500 duration-200 hover:bg-[#FF5400] hover:text-white">Logout</button>


                        </div> : <div className='flex justify-center items-center gap-2' >
                            <div>
                                {/* Theme switcher */}
                                <label className="swap swap-rotate">
                                    {/* Hidden checkbox to control theme */}
                                    <input type="checkbox" onClick={toggleTheme} checked={theme} className={`theme-controller`} />
                                    {/* Sun icon for light theme */}
                                    <svg className="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
                                    {/* Moon icon for dark theme */}
                                    <svg className="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>
                                </label>
                            </div>
                            <Link to="/login">
                                <button className="rounded-lg border-2 border-sky-500 px-5 py-2 text-xl text-sky-500 duration-200 hover:bg-[#FF5400] hover:text-white">Login</button>
                            </Link>
                            <Link to="/register">
                                <button className="rounded-lg border-2 border-sky-500 px-5 py-2 text-xl text-sky-500 duration-200 hover:bg-[#FF5400] hover:text-white">Register</button>
                            </Link>
                        </div>
                    }

                </div>
            </nav>






        </div>
    );
};

export default Navbar;

