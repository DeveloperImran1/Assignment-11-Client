import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaHandHoldingWater, FaMapMarkerAlt, FaWifi } from "react-icons/fa";
import swal from 'sweetalert';


import { MdBookmarkAdd } from "react-icons/md";



import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useNavigate, useParams } from "react-router-dom";
import { FcElectricity } from "react-icons/fc";


// react tab
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { AuthContext } from "../../AuthProvider/AuthProvider";


// react date picker
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useQuery } from "@tanstack/react-query";
import { removeHome, setHome } from "../../CustomHooks/LocasStorage";
import Marquee from "react-fast-marquee";
import SatisfiedClientCard from "../Home/SatisfiedClientCard";
import { BsEmojiHeartEyes } from "react-icons/bs";
import { Helmet } from "react-helmet-async";



const RoomDetails = () => {
    // const [room, setRoom] = useState({})
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [startDate, setStartDate] = useState(new Date());
    const bookingDate = new Date(startDate).toLocaleDateString();
    const [bookMark, setBookmark] = useState(false);
    const navigate = useNavigate();

    // user review
    const [clients, setClients] = useState([]);



    // react tostify
    const bookingError = () => {
        toast.error("Not Available This Room!")
    }
    const loginMessage = () => {
        toast.error("Please Login Before Booking!")
    }




    // tantak query dia fetch
    const { isPending, isError, error, data: room = {}, refetch } = useQuery({
        queryKey: ["singleRoom"],
        queryFn: async () => {
            // const res = await fetch(`https://assignment-eleven-server-delta.vercel.app/rooms/${id}`);
            const res = await fetch(`https://assignment-eleven-server-delta.vercel.app/rooms/${id}`);
            return res.json()
        }
    })


    const { _id, Area, Availability, Facilities, Location, PricePerNight, Reviews, RoomDescription, RoomImages
        , RoomSize, RoomTitle, SpecialOffers, Status, Utilities } = room;
    const userEmail = user?.email;
    console.log(room)

    const bookignData = { roomId: _id, Area, Location, PricePerNight, RoomImages, RoomTitle, Status, bookingDate, userEmail };
    const updateAvailability = { Availability: false };

    // get review for this room
    useEffect(() => {
        axios(`https://assignment-eleven-server-delta.vercel.app/review/${_id}`)
            .then(res => {
                console.log(res.data)
                setClients(res.data)
            })
    }, [])

    const handleHomeAddLocalStorage = (home) => {
        if (bookMark) {

            removeHome(home);
        }
        else {
            setHome(home)
        }


    }


    const handleBooking = (e) => {
        e.preventDefault()
        if (!user) {
            navigate("/login")
            return loginMessage()
        }

        if (!Availability) {
            return bookingError()
        }


        swal({
            title: "Are You Sure?",
            text: "This Room You Booking!",
            icon: "warning",
            button: "Confirm",
            content: {
                element: "div",
                attributes: {
                    innerHTML: `<p>${RoomTitle}</p><p>Your Booking Date: ${bookingDate}</p><p>Price Per Night: $ ${PricePerNight}</p>`
                },
            }
        })
            .then((willDelete) => {
                console.log(willDelete)
                if (willDelete) {
                    axios.post("https://assignment-eleven-server-delta.vercel.app/bookingRooms", bookignData)
                        .then(res => {
                            if (res.data.acknowledged) {
                                console.log("booking hoisa", res.data)
                                axios.put(`https://assignment-eleven-server-delta.vercel.app/rooms/${_id}`, updateAvailability)
                                    .then(res => {
                                        console.log(res.data)
                                        if (res.data.modifiedCount) {
                                            refetch();
                                            swal("Successfully Booked This Room", {
                                                icon: "success",
                                            });
                                        }
                                    })

                            }

                        })


                } else {
                    swal("You have cancle this Booking!");
                }
            });
    }

    // social icons
    const svgs = [
        { svg: (<svg width="25px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve" fill="#000000"><g strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><circle fill="#DC4373" cx="256" cy="256" r="256"></circle><path fill="#C13366" d="M358.334,151.376c-6.666,2.577-14.305,1.838-17.863-0.534 c-43.098-24.135-89.643-31.03-132.741-18.963c-61.693,18.227-86.893,86.635-86.73,150.494 c11.311,21.068,26.279,52.617,30.927,76.552l149.12,149.123C406.313,489.36,489.339,406.344,508.04,301.084L358.334,151.376z"></path><path fill="#F0F1F1" d="M255.997,109.654c-80.796,0-146.529,65.655-146.529,146.348s65.733,146.342,146.529,146.342 c80.799,0,146.535-65.646,146.535-146.342C402.532,175.309,336.796,109.654,255.997,109.654L255.997,109.654z M352.418,178.728 c16.715,20.716,26.872,46.878,27.341,75.386c-5.561-1.141-29.115-5.534-57.263-5.534c-9.082,0-18.641,0.455-28.224,1.639 c-0.809-1.967-1.619-3.927-2.469-5.906c-2.486-5.846-5.163-11.645-7.937-17.36C327.187,209.105,348.084,184.334,352.418,178.728 L352.418,178.728z M255.997,132.563c31.223,0,59.764,11.6,81.563,30.706c-3.451,4.708-22.166,28.101-63.938,43.884 c-19.335-35.344-40.498-64.61-45.535-71.406C237.063,133.668,246.405,132.563,255.997,132.563L255.997,132.563z M202.821,144.558 c4.268,5.879,25.464,35.459,45.296,70.518c-53.224,13.991-100.488,14.903-111.895,14.903h-1.212 C143.205,192.212,168.722,160.83,202.821,144.558L202.821,144.558z M132.201,256.195c0-1.019,0.017-2.038,0.05-3.051 c0.74,0.009,1.833,0.009,3.25,0.009c15.363,0,68.691-1.269,123.644-17.577c3.336,6.523,6.511,13.145,9.464,19.763 c-1.388,0.398-2.757,0.796-4.117,1.241c-61.874,19.983-95.884,72.888-101.117,81.536 C143.986,316.268,132.201,287.587,132.201,256.195L132.201,256.195z M255.997,379.818c-28.393,0-54.596-9.616-75.505-25.74 c3.537-6.934,29.206-53.15,97.013-76.75c0.041-0.017,0.086-0.033,0.136-0.045c17.003,44.265,24.204,81.417,26.179,92.931 C289.104,376.401,272.944,379.818,255.997,379.818L255.997,379.818z M326.115,358.026c-1.66-9.526-8.33-44.344-23.726-86.809 c8.635-1.343,17.036-1.874,24.914-1.874c25.874,0,46.115,5.665,50.817,7.102C372.529,310.167,353.223,339.349,326.115,358.026 L326.115,358.026z"></path><path fill="#D1D1D1" d="M255.997,109.654c-0.191,0-0.379,0.014-0.571,0.014v22.902c0.19,0,0.379-0.009,0.571-0.009 c31.223,0,59.764,11.6,81.563,30.706c-3.451,4.708-22.166,28.101-63.938,43.884c-6.07-11.097-12.321-21.594-18.196-30.984v60.478 c1.238-0.353,2.477-0.705,3.717-1.072c3.336,6.523,6.511,13.145,9.464,19.763c-1.388,0.398-2.757,0.796-4.117,1.239 c-3.098,1.002-6.106,2.105-9.064,3.26v26.614c6.811-3.281,14.145-6.359,22.078-9.121c0.041-0.017,0.086-0.033,0.136-0.045 c17.003,44.265,24.204,81.417,26.179,92.931c-14.714,6.187-30.873,9.604-47.823,9.604c-0.191,0-0.379-0.012-0.571-0.012v22.525 c0.191,0,0.379,0.014,0.571,0.014c80.799,0,146.535-65.646,146.535-146.342C402.532,175.309,336.796,109.654,255.997,109.654z M291.804,244.312c-2.486-5.846-5.163-11.645-7.937-17.36c43.32-17.848,64.217-42.618,68.551-48.225 c16.715,20.716,26.874,46.878,27.341,75.385c-5.561-1.141-29.115-5.534-57.261-5.534c-9.082,0-18.641,0.457-28.224,1.639 C293.462,248.251,292.654,246.291,291.804,244.312z M326.115,358.026c-1.66-9.526-8.33-44.344-23.726-86.809 c8.635-1.343,17.036-1.874,24.914-1.874c25.874,0,46.115,5.665,50.817,7.102C372.529,310.167,353.223,339.349,326.115,358.026z"></path></g></svg>) },
        { svg: (<svg width="25px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve" fill="#000000"><g strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><circle fill="#65A2D9" cx="256" cy="256" r="256"></circle><path fill="#3A7CA5" d="M393.014,139.326c-26.703,23.169-53.253,43.475-74.954,71.852 c-53.381,64.372-118.613,155.7-207.386,142.086l158.61,158.396c134.456-6.873,241.497-117.493,242.686-253.376L393.014,139.326z"></path><path fill="#FFFFFF" d="M397.872,162.471c-6.513,2.889-13.271,5.167-20.208,6.815c7.644-7.261,13.39-16.346,16.631-26.484 c0.926-2.893-2.219-5.398-4.832-3.848c-9.65,5.725-20.044,10.016-30.894,12.762c-0.628,0.16-1.276,0.24-1.929,0.24 c-1.979,0-3.896-0.733-5.411-2.065c-11.542-10.174-26.39-15.777-41.805-15.777c-6.672,0-13.405,1.04-20.016,3.091 c-20.487,6.353-36.295,23.254-41.257,44.103c-1.86,7.818-2.362,15.648-1.496,23.264c0.097,0.876-0.314,1.486-0.569,1.772 c-0.45,0.502-1.084,0.791-1.745,0.791c-0.072,0-0.15-0.003-0.224-0.01c-44.846-4.168-85.287-25.772-113.869-60.837 c-1.455-1.789-4.253-1.569-5.415,0.422c-5.596,9.606-8.554,20.589-8.554,31.766c0,17.127,6.884,33.27,18.837,45.039 c-5.027-1.193-9.893-3.07-14.414-5.582c-2.188-1.214-4.877,0.35-4.908,2.851c-0.31,25.445,14.588,48.087,36.905,58.282 c-0.45,0.01-0.9,0.014-1.35,0.014c-3.537,0-7.121-0.338-10.645-1.015c-2.463-0.467-4.532,1.867-3.768,4.253 c7.246,22.618,26.717,39.288,50.021,43.07c-19.339,12.983-41.863,19.83-65.302,19.83l-7.306-0.003c-2.255,0-4.16,1.469-4.73,3.65 c-0.565,2.145,0.474,4.413,2.396,5.53c26.412,15.372,56.541,23.495,87.138,23.495c26.784,0,51.838-5.313,74.466-15.798 c20.745-9.609,39.076-23.345,54.486-40.827c14.357-16.286,25.581-35.085,33.365-55.879c7.418-19.816,11.34-40.967,11.34-61.154 v-0.964c0-3.241,1.465-6.291,4.024-8.37c9.706-7.882,18.16-17.158,25.122-27.572C403.796,164.578,400.896,161.13,397.872,162.471 L397.872,162.471z"></path><path fill="#D1D1D1" d="M397.872,162.471c-6.515,2.889-13.271,5.167-20.208,6.815c7.644-7.261,13.39-16.346,16.632-26.484 c0.926-2.893-2.219-5.398-4.832-3.848c-9.65,5.725-20.044,10.016-30.894,12.762c-0.628,0.16-1.276,0.24-1.929,0.24 c-1.979,0-3.896-0.733-5.411-2.065c-11.542-10.174-26.39-15.777-41.805-15.777c-6.671,0-13.405,1.04-20.016,3.091 c-14.322,4.441-26.343,14.048-33.985,26.546v205.477c6.222-2.029,12.293-4.403,18.198-7.139 c20.745-9.609,39.076-23.345,54.486-40.827c14.357-16.287,25.581-35.085,33.365-55.879c7.418-19.816,11.34-40.967,11.34-61.154 v-0.964c0-3.241,1.465-6.291,4.024-8.37c9.706-7.882,18.16-17.158,25.122-27.572C403.796,164.578,400.896,161.13,397.872,162.471z"></path></g></svg>) },
        { svg: (<svg width="25px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve" fill="#000000"><g strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><circle fill="#6C27B3" cx="256" cy="256" r="256"></circle><path fill="#501A96" d="M374.71,132.922c-30.587,3.872-62.479,3.737-94.575,0.681 c-44.822-3.448-110.33-24.135-134.465,17.239c-38.772,66.236-19.649,151.035-10.614,226.078l134.737,134.708 c130.388-6.923,234.886-111.407,241.831-241.79L374.71,132.922z"></path><g><path fill="#FFFFFF" d="M315.227,109.468H196.772c-48.14,0-87.304,39.164-87.304,87.304v118.455 c0,48.138,39.164,87.305,87.305,87.305h118.455c48.138,0,87.305-39.165,87.305-87.305V196.772 C402.532,148.632,363.367,109.468,315.227,109.468L315.227,109.468z M373.05,315.228c0,31.934-25.888,57.822-57.822,57.822H196.773 c-31.934,0-57.822-25.888-57.822-57.822V196.773c0-31.934,25.888-57.823,57.822-57.823h118.455 c31.934,0,57.822,25.89,57.822,57.823V315.228z"></path><path fill="#FFFFFF" d="M256,180.202c-41.794,0-75.798,34.004-75.798,75.798c0,41.791,34.004,75.795,75.798,75.795 s75.795-34.001,75.795-75.795S297.794,180.202,256,180.202L256,180.202z M256,302.313c-25.579,0-46.316-20.733-46.316-46.313 s20.737-46.316,46.316-46.316s46.313,20.735,46.313,46.316C302.313,281.579,281.579,302.313,256,302.313L256,302.313z"></path></g><g><path fill="#D1D1D1" d="M350.103,180.774c0,10.03-8.132,18.163-18.163,18.163c-10.03,0-18.163-8.133-18.163-18.163 c0-10.031,8.133-18.163,18.163-18.163C341.973,162.611,350.103,170.741,350.103,180.774L350.103,180.774z"></path><path fill="#D1D1D1" d="M315.228,109.468h-59.802v29.482h59.802c31.934,0,57.822,25.89,57.822,57.823v118.455 c0,31.934-25.888,57.822-57.822,57.822h-59.802v29.482h59.802c48.138,0,87.304-39.165,87.304-87.305V196.772 C402.532,148.632,363.367,109.468,315.228,109.468z"></path><path fill="#D1D1D1" d="M256,180.202c-0.193,0-0.381,0.014-0.574,0.014v29.482c0.191-0.002,0.381-0.014,0.574-0.014 c25.579,0,46.313,20.735,46.313,46.316c0,25.579-20.733,46.313-46.313,46.313c-0.193,0-0.383-0.012-0.574-0.014v29.482 c0.193,0.002,0.381,0.014,0.574,0.014c41.794,0,75.795-34.002,75.795-75.795C331.795,214.206,297.794,180.202,256,180.202z"></path></g></g></svg>) },
        { svg: (<svg width="25px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve" fill="#000000"><g strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><circle fill="#D22215" cx="256" cy="256" r="256"></circle><path fill="#A81411" d="M384.857,170.339c-7.677,2.343-15.682,4.356-23.699,6.361 c-56.889,12.067-132.741-20.687-165.495,32.754c-27.317,42.494-35.942,95.668-67.017,133.663L294.629,509.1 c110.47-16.72,197.773-104.036,214.476-214.511L384.857,170.339z"></path><path fill="#FFFFFF" d="M341.649,152.333H170.351c-33.608,0-60.852,27.245-60.852,60.852v85.632 c0,33.608,27.245,60.852,60.852,60.852h171.298c33.608,0,60.852-27.245,60.852-60.852v-85.632 C402.501,179.578,375.256,152.333,341.649,152.333L341.649,152.333z M300.494,260.167l-80.12,38.212 c-2.136,1.019-4.603-0.536-4.603-2.901v-78.814c0-2.4,2.532-3.955,4.67-2.87l80.12,40.601 C302.947,255.602,302.904,259.019,300.494,260.167L300.494,260.167z"></path><path fill="#D1D1D1" d="M341.649,152.333h-87.373v78.605l46.287,23.455c2.384,1.208,2.341,4.624-0.069,5.773l-46.218,22.044 v77.459h87.373c33.608,0,60.852-27.245,60.852-60.852v-85.632C402.501,179.578,375.256,152.333,341.649,152.333z"></path></g></svg>) },
        { svg: (<svg width="25px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512.002 512.002" xmlSpace="preserve" fill="#000000"><g strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><circle fill="#4E598F" cx="256.001" cy="256" r="256"></circle><path fill="#364270" d="M511.596,241.7L391.019,121.085c-1.998,0.605-6.982-1.714-9.173-1.274 c-51.717,8.62-101.71,0-151.704,13.791c-24.135,6.896-25.859,36.202-34.478,55.165c-12.067,34.478-10.343,72.404-25.859,105.158 c-10.343,22.411-34.478,36.202-43.098,62.061c-2.875,10.785-2.705,24.379-5.956,34.69l120.98,120.922 c4.725,0.26,9.48,0.403,14.269,0.403c141.384,0,256-114.616,256-256C512.001,251.201,511.858,246.434,511.596,241.7z"></path><g><path fill="#FFFFFF" d="M363.043,109.466H148.958c-21.809,0-39.49,17.68-39.49,39.49v214.085 c0,21.811,17.68,39.49,39.49,39.49h105.584l0.183-104.722h-27.21c-3.536,0-6.406-2.86-6.418-6.396l-0.133-33.759 c-0.014-3.553,2.867-6.444,6.42-6.444h27.162v-32.618c0-37.852,23.118-58.463,56.884-58.463h27.71c3.543,0,6.42,2.874,6.42,6.42 v28.463c0,3.546-2.874,6.42-6.416,6.42l-17.006,0.01c-18.363,0-21.921,8.725-21.921,21.533v28.239h40.351 c3.848,0,6.83,3.358,6.375,7.173l-4.001,33.759c-0.381,3.232-3.122,5.665-6.375,5.665h-36.168l-0.183,104.726h62.826 c21.809,0,39.49-17.682,39.49-39.491v-214.09C402.533,127.147,384.852,109.466,363.043,109.466L363.043,109.466z"></path><polygon fill="#FFFFFF" points="254.542,402.53 254.725,297.808 254.277,297.808 254.277,402.53 "></polygon></g><path fill="#D1D1D1" d="M363.043,109.466H254.277v141.741h0.269V218.59c0-37.852,23.118-58.463,56.884-58.463h27.71 c3.543,0,6.42,2.874,6.42,6.42v28.463c0,3.546-2.874,6.42-6.416,6.42l-17.006,0.01c-18.363,0-21.921,8.725-21.921,21.533v28.238 h40.351c3.848,0,6.83,3.358,6.375,7.173l-4.001,33.759c-0.381,3.232-3.122,5.665-6.375,5.665h-36.168l-0.183,104.726h62.826 c21.809,0,39.49-17.682,39.49-39.491V148.956C402.533,127.147,384.852,109.466,363.043,109.466z"></path></g></svg>) }
    ]


    return (
        <div>

            <Helmet>
                <title>RoomIntel || Room Details</title>
            </Helmet>
            <div className="w-full lg:w-[90%] mx-auto flex  items-center justify-center p-5 border-2 rounded-2xl">
                <div className="flex flex-col gap-12 rounded-lg  w-full">
                    <div className=" space-y-2 flex  gap-5 lg:col-span-5">
                        <h3 className="text-2xl font-semibold sm:text-4xl ">{RoomTitle}</h3>
                        <button className="rounded-xl bg-[#0095FF] px-3 py-1 font-medium text-white duration-200 hover:bg-[#0095FF]/90">{`${Availability ? 'Available' : 'Unavailable'}`}</button>

                    </div>

                    <div className="text-[24px] font-semibold -my-10 flex items-center justify-between ">
                        <h3 className="text-2xl dark:text-gray-600 hover:underline flex gap-3 items-center ">
                            <FaMapMarkerAlt />
                            <span>{Location}</span>
                        </h3>
                        <p>Status: {Status}</p>
                    </div>
                    <div className="flex mt-4 -mb-4 gap-6">
                        <h3 className="text-2xl dark:text-gray-600 hover:underline flex gap-3 items-center ">Price: {PricePerNight}/Night </h3>
                        <div onClick={() => setBookmark(!bookMark)} className="bg-primary p-3  ml-5 mr-8 rounded-full hover:bg-opacity-30 bg-opacity-20 cursor-pointer hover:scale-105 overflow-hidden">
                            <MdBookmarkAdd size={20} onClick={() => handleHomeAddLocalStorage(room)} className="text-secondary"></MdBookmarkAdd>
                        </div>

                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full h-full" >
                      
                        <div className="diff aspect-[16/9] w-full  h-full lg:[200px]  rounded shadow-sm lg:col-span-2 lg:row-span-2  dark:bg-gray-500 ">
                            <div className="diff-item-1">
                                <img  alt="daisy" src={RoomImages?.[0]} />
                            </div>
                            <div className="diff-item-2 blur">
                                <img  alt="daisy" src={RoomImages?.[0]} />
                            </div>
                            <div className="diff-resizer"></div>
                        </div>

                        {/* <img alt="" className="w-full  h-full lg:[200px]  rounded shadow-sm lg:col-span-2 lg:row-span-2  dark:bg-gray-500 " src={`https://i.ibb.co/k3LwX3C/folio-img2-1-1536x960.jpg`} /> */}
                        <img alt="" className="w-full h-full lg:[200px] lg:row-span-1 rounded shadow-sm  dark:bg-gray-500 " src={RoomImages?.[1]} />
                        <img alt="" className="w-full  h-full lg:[200px] lg:row-span-1 rounded shadow-sm  dark:bg-gray-500 " src={RoomImages?.[2]} />

                    </div>

                    <div className="w-full ">

                        <div className="flex flex-col lg:flex-row gap-7" >
                            <div className="w-full lg:w-[60%] space-y-11 ">

                                <div className="flex flex-col gap-6 text-start">
                                    <p className="text-[24px] font-semibold">Utilities</p>
                                    <div className="flex  items-center gap-5" >
                                        <span className="flex gap-2 items-center bg-[#f3f4f6] p-2 rounded-2xl " >
                                            <FaWifi />
                                            <p>Electricity</p>
                                        </span>
                                        <span className="flex gap-2 items-center bg-[#f3f4f6] p-2 rounded-2xl " >
                                            <FaHandHoldingWater />
                                            <p>Water</p>
                                        </span>
                                        <span className="flex gap-2 items-center bg-[#f3f4f6] p-2 rounded-2xl " >
                                            <FcElectricity />
                                            <p>Electricity</p>
                                        </span>
                                    </div>
                                </div>
                                <p className="text-base my-6"><span className="text-[20px] font-semibold text-black" >Room Size: {RoomSize}</span> </p>

                                <div className="flex flex-col text-start">
                                    <p className="text-[24px] font-semibold">Facilites: </p>
                                    {
                                        Facilities?.map(facilite => <li> {facilite}</li>)
                                    }
                                </div>


                                <p className="text-base text-gray-500 dark:text-gray-400 my-6 "><span className="text-[20px] font-semibold text-black" >Description:</span> {RoomDescription} Discover the charm of this traditional Japanese ryokan nestled in a tranquil bamboo forest. Experience authentic hospitality and cultural immersion during your stay. </p>

                                {
                                    SpecialOffers ?
                                        <div className="group rounded-br-[16px] rounded-tl-[16px] hover:rounded-2xl relative mx-auto max-w-[350px] overflow-hidden bg-gradient-to-r from-[#3b99f1] via-[#4FB5FF] to-[#4FB5FF] px-6 py-6 text-white shadow">
                                            <span className="absolute left-[-40%] top-[30%] z-10 h-[200px] w-[200px] rounded-full bg-gradient-to-r from-[#0064c2] via-[#49aef7] to-[#c7e0f1] duration-300 group-hover:top-[-30%] group-hover:blur-sm"></span>
                                            <span className="absolute right-[-40%] top-[-40%] z-10 h-[200px] w-[200px] rounded-full bg-gradient-to-tr from-[#0064c2] via-[#4FB5FF] to-[#4FB5FF] duration-300 group-hover:top-[40%] group-hover:blur-sm"></span>
                                            <div className="absolute -right-[20px] -top-4 ">
                                                <div className="relative h-full w-full">
                                                    {/* svg  */}
                                                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" width="120" height="120" x="0" y="0" viewBox="0 0 512 512" style={{ enableBackground: 'new 0 0 512 512' }} xmlSpace="preserve"><defs><linearGradient id="skyGradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style={{ stopColor: '#0095FF', stopOpacity: 1 }} /><stop offset="100%" style={{ stopColor: '#87CEFA', stopOpacity: 1 }} /></linearGradient></defs><g><path d="M384 0H149.333c-41.237 0-74.667 33.429-74.667 74.667v426.667a10.668 10.668 0 0 0 6.592 9.856c1.291.538 2.676.813 4.075.811a10.663 10.663 0 0 0 7.552-3.115l120.448-120.619C260.48 434.795 325.44 499.2 332.416 507.136c3.261 4.906 9.882 6.24 14.788 2.979a10.67 10.67 0 0 0 3.964-4.835 6.53 6.53 0 0 0 .832-3.947v-448c0-17.673 14.327-32 32-32 5.891 0 10.667-4.776 10.667-10.667S389.891 0 384 0z" style={{ fill: 'url(#skyGradient)' }} /><path d="M394.667 0c23.564 0 42.667 19.103 42.667 42.667v32c0 5.891-4.776 10.667-10.667 10.667H352V42.667C352 19.103 371.103 0 394.667 0z" style={{ fill: '#1976d2' }} /></g></svg>
                                                    {/* Price  */}
                                                    <div className="absolute left-7 top-8 flex flex-col text-xl font-semibold text-white"><span><sub className="text-sm font-normal">$</sub><span>99</span></span><span className="text-xs font-normal">/night</span></div>
                                                </div>
                                            </div>
                                            <div className="relative z-20 space-y-6">
                                                <h1 className="text-2xl font-bold">30% OFFER</h1>
                                                <li className="flex items-center gap-2 text-sm font-semibold text-sky-900 dark:text-[#4BB3FF]">
                                                    <svg className="fill-[#0386FF] dark:fill-[#289DFF]" width={20} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="0"></g><g id="navigateui" strokeLinecap="round" strokeLinejoin="round"></g><g id="navigateui"><g id="tick"><g id="tick_2"><path id="navigateui" fillRule="evenodd" clipRule="evenodd" d="M43.8679 21.6919C44.6935 28.8058 41.6741 35.704 36.0728 39.952C35.6328 40.2857 35.0055 40.1995 34.6718 39.7595C34.338 39.3194 34.4242 38.6921 34.8643 38.3584C39.9074 34.5338 42.6244 28.3263 41.8812 21.9225C41.671 20.1113 41.1986 18.3944 40.5065 16.8051L26.1673 31.1443C25.5822 31.7294 24.7948 32.0363 23.9994 32.0271C23.1815 32.0363 22.3941 31.7294 21.809 31.1443L14.359 23.6943C13.9685 23.3038 13.9685 22.6706 14.359 22.2801C14.7496 21.8896 15.3827 21.8896 15.7733 22.2801L23.2233 29.7301C23.4197 29.9265 23.6865 30.0305 23.9994 30.0273C24.2898 30.0305 24.5566 29.9265 24.753 29.7301L39.5542 14.9289C36.0589 8.94407 29.2496 5.2706 21.924 6.12251C12.0492 7.27066 4.97548 16.2058 6.12186 26.0817C7.06163 34.1648 13.2925 40.5543 21.232 41.7937C21.4211 41.8262 21.7587 41.8766 22.187 41.9273C22.5257 41.9674 22.8658 42.0003 23.1985 42.0236C23.7495 42.0623 24.1647 42.5402 24.1261 43.0912C24.0875 43.6421 23.6095 44.0574 23.0586 44.0187C22.6921 43.993 22.3207 43.9571 21.9519 43.9134C21.4857 43.8582 21.1145 43.8028 20.9083 43.7672C12.1017 42.3926 5.17946 35.2942 4.13522 26.3125C2.86149 15.3394 10.7211 5.4116 21.693 4.13589C29.6475 3.21084 37.0542 7.08801 41.0117 13.4715L42.279 12.2041C42.6696 11.8136 43.3027 11.8136 43.6933 12.2041C44.0838 12.5946 44.0838 13.2278 43.6933 13.6183L42.0149 15.2967C42.9621 17.2572 43.6027 19.4071 43.8679 21.6919Z"></path></g></g></g></svg>{SpecialOffers}
                                                </li>

                                                <button className="bg-[#1b8efa] px-6 py-2">Understood</button>
                                            </div>
                                        </div> : <div className="group rounded-br-[16px] rounded-tl-[16px] hover:rounded-2xl relative mx-auto max-w-[350px] overflow-hidden bg-gradient-to-r from-[#3b99f1] via-[#4FB5FF] to-[#4FB5FF] px-6 py-6 text-white shadow">
                                            <span className="absolute left-[-40%] top-[30%] z-10 h-[200px] w-[200px] rounded-full bg-gradient-to-r from-[#0064c2] via-[#49aef7] to-[#c7e0f1] duration-300 group-hover:top-[-30%] group-hover:blur-sm"></span>
                                            <span className="absolute right-[-40%] top-[-40%] z-10 h-[200px] w-[200px] rounded-full bg-gradient-to-tr from-[#0064c2] via-[#4FB5FF] to-[#4FB5FF] duration-300 group-hover:top-[40%] group-hover:blur-sm"></span>
                                            <div className="absolute -right-[20px] -top-4 ">
                                                <div className="relative h-full w-full">
                                                    {/* svg  */}
                                                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" width="120" height="120" x="0" y="0" viewBox="0 0 512 512" style={{ enableBackground: 'new 0 0 512 512' }} xmlSpace="preserve"><defs><linearGradient id="skyGradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style={{ stopColor: '#0095FF', stopOpacity: 1 }} /><stop offset="100%" style={{ stopColor: '#87CEFA', stopOpacity: 1 }} /></linearGradient></defs><g><path d="M384 0H149.333c-41.237 0-74.667 33.429-74.667 74.667v426.667a10.668 10.668 0 0 0 6.592 9.856c1.291.538 2.676.813 4.075.811a10.663 10.663 0 0 0 7.552-3.115l120.448-120.619C260.48 434.795 325.44 499.2 332.416 507.136c3.261 4.906 9.882 6.24 14.788 2.979a10.67 10.67 0 0 0 3.964-4.835 6.53 6.53 0 0 0 .832-3.947v-448c0-17.673 14.327-32 32-32 5.891 0 10.667-4.776 10.667-10.667S389.891 0 384 0z" style={{ fill: 'url(#skyGradient)' }} /><path d="M394.667 0c23.564 0 42.667 19.103 42.667 42.667v32c0 5.891-4.776 10.667-10.667 10.667H352V42.667C352 19.103 371.103 0 394.667 0z" style={{ fill: '#1976d2' }} /></g></svg>
                                                    {/* Price  */}
                                                    <div className="absolute left-7 top-8 flex flex-col text-xl font-semibold text-white"><span><sub className="text-sm font-normal">$</sub><span>99</span></span><span className="text-xs font-normal">/night</span></div>
                                                </div>
                                            </div>
                                            <div className="relative z-20 space-y-6">
                                                <h1 className="text-2xl font-bold">Not Available OFFER</h1>
                                                <li className="flex items-center gap-2 text-sm font-semibold text-sky-900 dark:text-[#4BB3FF]">
                                                    <svg className="fill-[#0386FF] dark:fill-[#289DFF]" width={20} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="0"></g><g id="navigateui" strokeLinecap="round" strokeLinejoin="round"></g><g id="navigateui"><g id="tick"><g id="tick_2"><path id="navigateui" fillRule="evenodd" clipRule="evenodd" d="M43.8679 21.6919C44.6935 28.8058 41.6741 35.704 36.0728 39.952C35.6328 40.2857 35.0055 40.1995 34.6718 39.7595C34.338 39.3194 34.4242 38.6921 34.8643 38.3584C39.9074 34.5338 42.6244 28.3263 41.8812 21.9225C41.671 20.1113 41.1986 18.3944 40.5065 16.8051L26.1673 31.1443C25.5822 31.7294 24.7948 32.0363 23.9994 32.0271C23.1815 32.0363 22.3941 31.7294 21.809 31.1443L14.359 23.6943C13.9685 23.3038 13.9685 22.6706 14.359 22.2801C14.7496 21.8896 15.3827 21.8896 15.7733 22.2801L23.2233 29.7301C23.4197 29.9265 23.6865 30.0305 23.9994 30.0273C24.2898 30.0305 24.5566 29.9265 24.753 29.7301L39.5542 14.9289C36.0589 8.94407 29.2496 5.2706 21.924 6.12251C12.0492 7.27066 4.97548 16.2058 6.12186 26.0817C7.06163 34.1648 13.2925 40.5543 21.232 41.7937C21.4211 41.8262 21.7587 41.8766 22.187 41.9273C22.5257 41.9674 22.8658 42.0003 23.1985 42.0236C23.7495 42.0623 24.1647 42.5402 24.1261 43.0912C24.0875 43.6421 23.6095 44.0574 23.0586 44.0187C22.6921 43.993 22.3207 43.9571 21.9519 43.9134C21.4857 43.8582 21.1145 43.8028 20.9083 43.7672C12.1017 42.3926 5.17946 35.2942 4.13522 26.3125C2.86149 15.3394 10.7211 5.4116 21.693 4.13589C29.6475 3.21084 37.0542 7.08801 41.0117 13.4715L42.279 12.2041C42.6696 11.8136 43.3027 11.8136 43.6933 12.2041C44.0838 12.5946 44.0838 13.2278 43.6933 13.6183L42.0149 15.2967C42.9621 17.2572 43.6027 19.4071 43.8679 21.6919Z"></path></g></g></g></svg>Sorry! Currently Not Available Offer Of This Room
                                                </li>

                                                <button className="bg-[#1b8efa] px-6 py-2">Understood</button>
                                            </div>
                                        </div>
                                }
                            </div>

                            <div className="mb-[30px]" >
                                <Tabs>
                                    <TabList>
                                        <Tab>Booking Form</Tab>
                                        <Tab>Contact Us</Tab>
                                    </TabList>

                                    <TabPanel>
                                        <form onSubmit={handleBooking} className="flex flex-col px-6 py-8  space-y-6  w-full border-2 border-[#5A5A5D] rounded-[16px] ">
                                            <div>
                                                <img alt="" className="w-[500px] h-full  rounded shadow-sm col-span-2 row-span-2  dark:bg-gray-500 " src={RoomImages?.[0]} />
                                                <p className="text-[24px] font-semibold  text-center mt-5 ">Please Fillup This Form </p>
                                            </div>

                                            <div className="flex">
                                                <label className="block">
                                                    <span className="mb-1">Full name</span>
                                                    <input type="text" placeholder="Your name" value={user?.displayName} className="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 border border-[#5A5A5D] p-2 focus:dark:ring-violet-600 dark:bg-gray-100" />
                                                </label>

                                                <label className="block">
                                                    <span className="mb-1">Booking Date</span>
                                                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 border border-[#5A5A5D] p-2 focus:dark:ring-violet-600 dark:bg-gray-100" />
                                                </label>
                                            </div>
                                            <label className="block">
                                                <span className="mb-1">Email</span>
                                                <input type="text" placeholder="Your Email" value={user?.email} className="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 border border-[#5A5A5D] p-2 focus:dark:ring-violet-600 dark:bg-gray-100" />
                                            </label>

                                            <label className="block">
                                                <span className="mb-1">Room Name</span>
                                                <input type="text" placeholder="Your name" value={RoomTitle} className="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 border border-[#5A5A5D] p-2 focus:dark:ring-violet-600 dark:bg-gray-100" />
                                            </label>
                                            <label className="block">
                                                <span className="mb-1">Price Per Night </span>
                                                <input type="text" placeholder="Your name" value={`$ ${PricePerNight}`} className="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 border border-[#5A5A5D] p-2 focus:dark:ring-violet-600 dark:bg-gray-100" />
                                            </label>

                                            <button className="rounded-lg border-2 border-sky-500 px-8 py-3 text-xl text-sky-500 duration-200 hover:bg-[#199fff] hover:text-white">Book Now</button>



                                        </form>
                                    </TabPanel>
                                    <TabPanel>
                                        <div className="max-w-[400px] md:w-[450px] p-4 md:p-6  rounded-2xl space-y-3 lg:space-y-8  bg-base-200    shadow-lg group transition border-2  hover:scale-105 border-[] hover:border-[#076aa5] border-opacity-30 hover:no-underline focus:no-underline">
                                            {/* profile image & bg  */}
                                            <div className="relative">
                                                <img className="w-full h-[140px] rounded-2xl bg-gray-500" src="https://i.ibb.co/ChCGg3Z/404452958-2443244652516191-5414449848808334082-n.jpg" alt="card navigate ui" />

                                                <img className="w-[100px] h-[100px] absolute -bottom-10 left-1/2 -translate-x-1/2 rounded-full bg-gray-400 border border-white" src="https://i.ibb.co/zGd68Hw/409190995-2451672608340062-5052422953989411988-n.jpg" alt="card navigate ui" />
                                            </div>
                                            {/* profile name & role */}
                                            <div className="pt-8 text-center space-y-1">
                                                <a
                                                    data-tooltip-id="my-tooltip"
                                                    data-tooltip-content="Hey Broo.!"
                                                    data-tooltip-place="top" >

                                                    <h1 className="text-xl md:text-2xl">Md Imran</h1>
                                                </a>
                                                <p className="text-gray-400 text-sm">h9066588@gmail.com</p>
                                            </div>
                                            <div className="pt-3 text-center space-y-1">
                                                <h1 className="text-xl font-bold md:text-2xl">الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ </h1>

                                            </div>


                                            <div className="flex flex-wrap px-4  md:px-8 justify-between items-center">
                                                {/* social icons  */}
                                                <div className="flex w-full justify-between gap-4 py-2">
                                                    {svgs?.map((svg, idx) => (<div key={idx} className="rounded-full shadow-[0px_2px_8px_0px_rgba(99,99,99,0.4)]  duration-300 hover:scale-150">{svg?.svg}</div>))}
                                                </div>

                                            </div>
                                        </div>
                                    </TabPanel>
                                </Tabs>

                            </div>
                        </div>
                        {
                            user &&
                                clients?.length < 1 ? <h1 className="text-[40px] font-bold text-[#131313] text-center w-full flex justify-center items-center"><span>No Review This Room</span> <BsEmojiHeartEyes className="text-[#ff00ff]" size={30} />  </h1> : <section className="my-[40px]" >
                                <div className="container  mx-auto space-y-8">
                                    <div className="space-y-2 text-center">
                                        <h1
                                            data-aos="fade-down"
                                            className="text-[40px] font-bold text-[#131313] text-center w-full "> Our Satisfied Clients {clients?.length} </h1>
                                        <p
                                            data-aos="fade-down"
                                            className=" text-[16px] text-[#131313CC] text-center mb-12 w-full lg:w-[80%] mx-auto ">At Haven House, our residents satisfaction is our top priority. Dont just take our word for it hear what some of our happy residents have to say... </p>


                                        <Marquee className="w-full h-[470px]" autoFill="false" pauseOnHover="true" speed="100">


                                            {
                                                clients.map(client => <SatisfiedClientCard key={client} client={client} ></SatisfiedClientCard>)
                                            }
                                        </Marquee>
                                    </div>
                                </div>
                            </section>
                        }
                        {/* react leaflet */}
                        <div>
                            <div className="mt-14 mb-5">
                                {/* <p className="text-base my-6"><span className="text-[20px] font-semibold text-black" >Location:</span> </p> */}
                                <h3 className="text-2xl dark:text-gray-600 hover:underline flex gap-3 items-center ">
                                    <FaMapMarkerAlt />
                                    <span>{Location}</span>
                                </h3>

                            </div>
                            <MapContainer
                                center={[23.7104, 90.4074]}
                                zoom={11}
                                scrollWheelZoom={true}
                                className="h-[40vh] md:h-[50vh] lg:h-[70vh]"
                            >
                                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                <Marker position={[23.7104, 90.4074]}>
                                    <Popup>
                                        {location}
                                    </Popup>
                                </Marker>
                            </MapContainer>
                        </div>
                    </div>
                </div>


            </div>






        </div>
    );
};

export default RoomDetails;










