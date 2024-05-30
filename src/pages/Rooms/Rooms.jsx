import axios from "axios";
import RoomsCard from "./RoomsCard";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { ButtonGroup, Button } from "@material-tailwind/react";
import { IoGrid } from "react-icons/io5";
import { FaTableList, FaWifi } from "react-icons/fa6";
import RoomTableView from "./RoomTableView";
import { Link, useLocation } from "react-router-dom";
import { FaHandHoldingWater } from "react-icons/fa";
import { FcElectricity } from "react-icons/fc";
import LoadingCard from "../../components/LoadingCard";
import EmptyData from "../../components/EmptyData";
import { Helmet } from "react-helmet-async";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



// react toast: 
const minimumPriceError = () => toast.error("Mustbe Added Minimum Price!");
const maximumPriceError = () => toast.error("Mustbe Added Maximum Price!");
const lowHighPriceError = () => toast.error("Must be Maximum Price Greaterthan Minimum Price!");


const Rooms = () => {

    // tantak query dia fetching

    const [on, setValue] = useState('off')
    const { pathname } = useLocation();
    const [availableRooms, setAvailableRooms] = useState([]);
    const [specialOffer, setSpecialOffers] = useState([]);
    const [sort, setSort] = useState("");
    const [from, setFrom] = useState(0)
    const [to, setTo] = useState(0)

    const handleShort = e => {
        e.preventDefault();
        setSort("")
        const sorting = e.target.value;
        setSort(sorting)
        console.log(sorting)
        setFrom(0);
        setTo(0)
    }


    const handleFilter = (e) => {
        e.preventDefault();
        const from = e.target.from.value;
        const to = e.target.to.value;
        if (!from) {
            return minimumPriceError()
        }
        if (!to) {
            return maximumPriceError()
        }
        if (parseInt(from) > parseInt(to)) {
            console.log("from boro howa jabena.")
            return lowHighPriceError()
        }
        setFrom(from)
        setTo(to)
        e.target.reset()

        // console.log(from, to)
    }

    const url = `https://assignment-eleven-server-delta.vercel.app/rooms?sort=${sort}&from=${from}&to=${to}`;
    // const url = `https://assignment-eleven-server-delta.vercel.app/rooms?sort=${sort}`;
    const { isPending, isError, error, data: allRooms = [], refetch } = useQuery({
        queryKey: ["rooms"],
        queryFn: async () => {
            const res = await fetch(url);
            return res.json()
        }
    })
    useEffect(() => {
        refetch()

    }, [pathname, sort, refetch, from, to])


    console.log(allRooms)
    useEffect(() => {

        // if (allRooms.length > 0) {
        const available = allRooms?.filter(room => room?.Availability === true);
        setAvailableRooms(available)
        const offers = allRooms?.filter(room => room?.SpecialOffers);
        setSpecialOffers(offers)

        // console.log("tantak er allRooms", allRooms, "available rooms", availableRooms, "specialOfer", specialOffer)

        // }

    }, [allRooms, availableRooms, specialOffer])
    // console.log("all Rooms latest", allRooms)

    if (isPending) {
        return <LoadingCard></LoadingCard>
    }




    return (
        <div>

            <Helmet>
                <title>RoomIntel || Rooms</title>
            </Helmet>
            {/* <div className="flex flex-col lg:flex-row justify-between mb-3" >
                <p></p> */}
            <div className="flex flex-col lg:flex-row justify-center lg:justify-end items-center lg:items-end mb-5 gap-6" >
                <div className="text-gray-700 " >
                    <form onSubmit={handleFilter} className="flex flex-col lg:flex-row gap-3" >
                        <input type="number" placeholder="Minimum Price" name="from" className="rounded-lg border border-[#1B8EF8] bg-transparent px-4 py-2 w-[160px] text-[#1B8EF8] ring-offset-1 duration-200 focus:outline-none focus:ring-2" />
                        <input type="number" placeholder="Maximum Price" name="to" className="rounded-lg border border-[#1B8EF8] bg-transparent px-4 py-2 w-[160px] text-[#1B8EF8] ring-offset-1 duration-200 focus:outline-none focus:ring-2" />
                        <button type="submit" className="rounded-lg hover:rounded-full w-[160px]  border-2 border-[#076aa5] px-8 py-2 text-xl text-sky-500 duration-200 bg-[#076aa5] hover:bg-[#029cfb] text-white">Search</button>

                    </form>
                </div>
                <div className="flex flex-col lg:flex-row justify-center items-center gap-4" >
                    <div className="text-gray-700" >
                        <select
                            onChange={handleShort}
                            value={sort}
                            name='sort'
                            id='sort'
                            className='border p-4 rounded-md'
                        >
                            <option value='' className="mb-6">Sort By Price</option>
                            <option value='dsc'>Descending Order</option>
                            <option value='asc'>Ascending Order</option>
                        </select>
                    </div>


                    <ButtonGroup className=" flex justify-center items-center">
                        <Button onClick={() => setValue(!on)} className={`${on ? "bg-[#23BE0A]" : "bg-[#59C6D2]"}`} ><IoGrid /></Button>
                        <Button onClick={() => setValue(!on)} className={`${on ? "bg-[#59C6D2]" : "bg-[#23BE0A]"}`} ><FaTableList /></Button>
                    </ButtonGroup>
                </div>
            </div>
            {/* </div> */}


            {
                on ? <Tabs>
                    <TabList>
                        <Tab>
                            <div className="relative mx-auto bg-white hover:bg-gray-200 p-2 rounded-md w-fit h-fit">
                                <p className="text-[15px] font-semibold" >All Rooms</p>
                                <span className="absolute -right-2 -top-2 flex h-[24px] w-[24px] items-center justify-center rounded-full bg-red-500 text-center text-[12px] text-white ">{allRooms?.length}</span>
                            </div>
                        </Tab>
                        <Tab>
                            <div className="relative mx-auto bg-white hover:bg-gray-200 p-2 rounded-md w-fit h-fit">
                                <p className="text-[15px] font-semibold" >Available Rooms</p>
                                <span className="absolute -right-2 -top-2 flex h-[24px] w-[24px] items-center justify-center rounded-full bg-red-500 text-center text-[12px] text-white ">{availableRooms?.length}</span>
                            </div>
                        </Tab>
                        <Tab>
                            <div className="relative mx-auto bg-white hover:bg-gray-200 p-2 rounded-md w-fit h-fit">
                                <p className="text-[15px] font-semibold" >Special Offer</p>
                                <span className="absolute -right-2 -top-2 flex h-[24px] w-[24px] items-center justify-center rounded-full bg-red-500 text-center text-[12px] text-white ">{specialOffer?.length}</span>
                            </div>
                        </Tab>
                    </TabList>

                    <TabPanel>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" >
                            {
                                allRooms && allRooms?.map(room => <RoomsCard key={room._id} room={room}  ></RoomsCard>)
                            }
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" >
                            {
                                allRooms && availableRooms?.map(room => <RoomsCard key={room?._id} room={room}  ></RoomsCard>)
                            }
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" >
                            {
                                specialOffer?.map(room => <RoomsCard key={room?._id} room={room}  ></RoomsCard>)
                            }
                        </div>
                    </TabPanel>
                </Tabs>

                    :
                    <Tabs>
                        <TabList>
                            <Tab>
                                <div className="relative mx-auto bg-white hover:bg-gray-200 p-2 rounded-md w-fit h-fit">
                                    <p className="text-[15px] font-semibold" >All Rooms</p>
                                    <span className="absolute -right-2 -top-2 flex h-[24px] w-[24px] items-center justify-center rounded-full bg-red-500 text-center text-[12px] text-white ">{allRooms?.length}</span>
                                </div>
                            </Tab>
                            <Tab>
                                <div className="relative mx-auto bg-white hover:bg-gray-200 p-2 rounded-md w-fit h-fit">
                                    <p className="text-[15px] font-semibold" >Available Rooms</p>
                                    <span className="absolute -right-2 -top-2 flex h-[24px] w-[24px] items-center justify-center rounded-full bg-red-500 text-center text-[12px] text-white ">{availableRooms?.length}</span>
                                </div>
                            </Tab>
                            <Tab>
                                <div className="relative mx-auto bg-white hover:bg-gray-200 p-2 rounded-md w-fit h-fit">
                                    <p className="text-[15px] font-semibold" >Special Offer</p>
                                    <span className="absolute -right-2 -top-2 flex h-[24px] w-[24px] items-center justify-center rounded-full bg-red-500 text-center text-[12px] text-white ">{specialOffer?.length}</span>
                                </div>
                            </Tab>
                        </TabList>

                        <TabPanel>

                            <div className="overflow-x-auto border w-full mx-auto bg-[#1313180D] rounded-xl border-black  ">
                                <table className="min-w-full text-[16px] font-semibold ">
                                    <thead className="dark:bg-gray-300 bg-slate-600 mt-10">
                                        <tr className="text-left  leading-none dark:text-gray-600">
                                            <th></th>
                                            <th className="p-3">Room</th>
                                            <th className="p-3">Name</th>
                                            <th className="p-3">Price Per Night</th>
                                            <th className="p-3">Room Utilitis</th>
                                            <th className="p-3">Availability</th>
                                            <th className="p-3">Details</th>

                                        </tr>
                                    </thead>
                                    {
                                        allRooms?.map((room, i) => <tbody key={room._id}>
                                            <tr className={`border-b text-sm font-normal border-opacity-20 dark:border-gray-300 dark:bg-gray-50 ${i % 2 === 0 ? 'bg-blue-100/60' : 'bg-pink-100/60'}`}>
                                                <th>{i + 1}</th>
                                                <td className="p-3">
                                                    <img className="size-[80px] bg-slate-500 object-cover rounded-lg hover:blur-[2px] duration-500" src={room?.RoomImages?.[0]} alt="avatar navigate ui" />

                                                </td>
                                                <td className="p-3">
                                                    <p>{room?.RoomTitle?.slice(0, 20)}</p>

                                                </td>
                                                <td className="p-3">
                                                    <p>$ {room?.PricePerNight}</p>

                                                </td>

                                                <td className="p-3">
                                                    <div className="flex  items-center gap-5" >
                                                        <span className="flex gap-2 items-center bg-[#f3f4f6] p-2 rounded-2xl " >
                                                            <FaWifi />
                                                            <p>Wifi</p>
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
                                                </td>

                                                <td className="p-3">
                                                    <p className="px-3 py-1 w-[130px] text-blue-500 rounded-full dark:bg-gray-800 bg-blue-100/60">{`${room?.Availability ? 'Available' : 'Unavailable'}`}</p>
                                                </td>


                                                <td className="">
                                                    <Link to={`/rooms/${room?._id}`} className="" >
                                                        <p className="px-3 py-1 w-[100px] flex justify-center items-center gap-2  text-pink-500 rounded-full dark:bg-gray-800 bg-pink-100/60"><span>Details</span>
                                                            <svg width={20} viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#0095FF"><g strokeWidth="0"></g><g strokeLinecap="round" strokeLinejoin="round"></g><g><title>male [#1364]</title> <desc>Created with Sketch.</desc> <defs> </defs><g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g transform="translate(-60.000000, -2079.000000)" fill="#0095FF"><g id="icons" transform="translate(56.000000, 160.000000)"><path d="M11,1937.005 C8.243,1937.005 6,1934.762 6,1932.005 C6,1929.248 8.243,1927.005 11,1927.005 C13.757,1927.005 16,1929.248 16,1932.005 C16,1934.762 13.757,1937.005 11,1937.005 L11,1937.005 Z M16,1919 L16,1921 L20.586,1921 L15.186,1926.402 C14.018,1925.527 12.572,1925.004 11,1925.004 C7.134,1925.004 4,1928.138 4,1932.004 C4,1935.87 7.134,1939.005 11,1939.005 C14.866,1939.005 18,1935.871 18,1932.005 C18,1930.433 17.475,1928.987 16.601,1927.818 L22,1922.419 L22,1927 L24,1927 L24,1919 L16,1919 Z" id="male-[#1364]"></path></g></g></g> </g></svg>
                                                        </p>
                                                    </Link>
                                                </td>

                                            </tr>
                                        </tbody>)
                                    }

                                </table>
                            </div>

                        </TabPanel>
                        <TabPanel>

                            <div className="overflow-x-auto border w-full mx-auto bg-[#1313180D] rounded-xl border-black  ">
                                <table className="min-w-full text-[16px] font-semibold ">
                                    <thead className="dark:bg-gray-300 bg-slate-600 mt-10">
                                        <tr className="text-left  leading-none dark:text-gray-600">
                                            <th></th>
                                            <th className="p-3">Room</th>
                                            <th className="p-3">Name</th>
                                            <th className="p-3">Price Per Night</th>
                                            <th className="p-3">Room Utilitis</th>
                                            <th className="p-3">Availability</th>
                                            <th className="p-3">Details</th>

                                        </tr>
                                    </thead>
                                    {

                                        availableRooms?.map((room, i) => <tbody key={room._id}>
                                            <tr className={`border-b text-sm font-normal border-opacity-20 dark:border-gray-300 dark:bg-gray-50 ${i % 2 === 0 ? 'bg-blue-100/60' : 'bg-pink-100/60'}`}>
                                                <th>{i + 1}</th>
                                                <td className="p-3">
                                                    <img className="size-[80px] bg-slate-500 object-cover rounded-lg hover:blur-[2px] duration-500" src={room?.RoomImages?.[0]} alt="avatar navigate ui" />

                                                </td>
                                                <td className="p-3">
                                                    <p>{room?.RoomTitle?.slice(0, 20)}</p>

                                                </td>
                                                <td className="p-3">
                                                    <p>$ {room?.PricePerNight}</p>

                                                </td>

                                                <td className="p-3">
                                                    <div className="flex  items-center gap-5" >
                                                        <span className="flex gap-2 items-center bg-[#f3f4f6] p-2 rounded-2xl " >
                                                            <FaWifi />
                                                            <p>Wifi</p>
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
                                                </td>

                                                <td className="p-3">
                                                    <p className="px-3 py-1 w-[130px] text-blue-500 rounded-full dark:bg-gray-800 bg-blue-100/60">{`${room?.Availability ? 'Available' : 'Unavailable'}`}</p>
                                                </td>


                                                <td className="">
                                                    <Link to={`/rooms/${room?._id}`} className="" >
                                                        <p className="px-3 py-1 w-[100px] flex justify-center items-center gap-2  text-pink-500 rounded-full dark:bg-gray-800 bg-pink-100/60"><span>Details</span>
                                                            <svg width={20} viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#0095FF"><g strokeWidth="0"></g><g strokeLinecap="round" strokeLinejoin="round"></g><g><title>male [#1364]</title> <desc>Created with Sketch.</desc> <defs> </defs><g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g transform="translate(-60.000000, -2079.000000)" fill="#0095FF"><g id="icons" transform="translate(56.000000, 160.000000)"><path d="M11,1937.005 C8.243,1937.005 6,1934.762 6,1932.005 C6,1929.248 8.243,1927.005 11,1927.005 C13.757,1927.005 16,1929.248 16,1932.005 C16,1934.762 13.757,1937.005 11,1937.005 L11,1937.005 Z M16,1919 L16,1921 L20.586,1921 L15.186,1926.402 C14.018,1925.527 12.572,1925.004 11,1925.004 C7.134,1925.004 4,1928.138 4,1932.004 C4,1935.87 7.134,1939.005 11,1939.005 C14.866,1939.005 18,1935.871 18,1932.005 C18,1930.433 17.475,1928.987 16.601,1927.818 L22,1922.419 L22,1927 L24,1927 L24,1919 L16,1919 Z" id="male-[#1364]"></path></g></g></g> </g></svg>
                                                        </p>
                                                    </Link>
                                                </td>

                                            </tr>
                                        </tbody>)
                                    }

                                </table>
                            </div>

                        </TabPanel>
                        <TabPanel>

                            <div className="overflow-x-auto border w-full mx-auto bg-[#1313180D] rounded-xl border-black  ">
                                <table className="min-w-full text-[16px] font-semibold ">
                                    <thead className="dark:bg-gray-300 bg-slate-600 mt-10">
                                        <tr className="text-left  leading-none dark:text-gray-600">
                                            <th></th>
                                            <th className="p-3">Room</th>
                                            <th className="p-3">Name</th>
                                            <th className="p-3">Price Per Night</th>
                                            <th className="p-3">Room Utilitis</th>
                                            <th className="p-3">Availability</th>
                                            <th className="p-3">Details</th>

                                        </tr>
                                    </thead>
                                    {

                                        specialOffer?.map((room, i) => <tbody key={room._id}>
                                            <tr className={`border-b text-sm font-normal border-opacity-20 dark:border-gray-300 dark:bg-gray-50 ${i % 2 === 0 ? 'bg-blue-100/60' : 'bg-pink-100/60'}`}>
                                                <th>{i + 1}</th>
                                                <td className="p-3">
                                                    <img className="size-[80px] bg-slate-500 object-cover rounded-lg hover:blur-[2px] duration-500" src={room?.RoomImages?.[0]} alt="avatar navigate ui" />

                                                </td>
                                                <td className="p-3">
                                                    <p>{room?.RoomTitle?.slice(0, 20)}</p>

                                                </td>
                                                <td className="p-3">
                                                    <p>$ {room?.PricePerNight}</p>

                                                </td>

                                                <td className="p-3">
                                                    <div className="flex  items-center gap-5" >
                                                        <span className="flex gap-2 items-center bg-[#f3f4f6] p-2 rounded-2xl " >
                                                            <FaWifi />
                                                            <p>Wifi</p>
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
                                                </td>

                                                <td className="p-3">
                                                    <p className="px-3 py-1 w-[130px] text-blue-500 rounded-full dark:bg-gray-800 bg-blue-100/60">{`${room?.Availability ? 'Available' : 'Unavailable'}`}</p>
                                                </td>


                                                <td className="">
                                                    <Link to={`/rooms/${room?._id}`} className="" >
                                                        <p className="px-3 py-1 w-[100px] flex justify-center items-center gap-2  text-pink-500 rounded-full dark:bg-gray-800 bg-pink-100/60"><span>Details</span>
                                                            <svg width={20} viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#0095FF"><g strokeWidth="0"></g><g strokeLinecap="round" strokeLinejoin="round"></g><g><title>male [#1364]</title> <desc>Created with Sketch.</desc> <defs> </defs><g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g transform="translate(-60.000000, -2079.000000)" fill="#0095FF"><g id="icons" transform="translate(56.000000, 160.000000)"><path d="M11,1937.005 C8.243,1937.005 6,1934.762 6,1932.005 C6,1929.248 8.243,1927.005 11,1927.005 C13.757,1927.005 16,1929.248 16,1932.005 C16,1934.762 13.757,1937.005 11,1937.005 L11,1937.005 Z M16,1919 L16,1921 L20.586,1921 L15.186,1926.402 C14.018,1925.527 12.572,1925.004 11,1925.004 C7.134,1925.004 4,1928.138 4,1932.004 C4,1935.87 7.134,1939.005 11,1939.005 C14.866,1939.005 18,1935.871 18,1932.005 C18,1930.433 17.475,1928.987 16.601,1927.818 L22,1922.419 L22,1927 L24,1927 L24,1919 L16,1919 Z" id="male-[#1364]"></path></g></g></g> </g></svg>
                                                        </p>
                                                    </Link>
                                                </td>

                                            </tr>
                                        </tbody>)
                                    }

                                </table>
                            </div>

                        </TabPanel>

                    </Tabs>

            }



        </div>
    );
};

export default Rooms;