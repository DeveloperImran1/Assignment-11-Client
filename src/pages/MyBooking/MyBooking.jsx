import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever, MdOutlineUpdate } from "react-icons/md";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import swal from "sweetalert";
// react date picker
import DatePicker from "react-datepicker";
import React from 'react';
import Swal from "sweetalert2";
import useAxiosSecure from "../../CustomHooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from "react-helmet-async";
// for material ur dialog

import {
    Button,
    Dialog,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
} from "@material-tailwind/react";

const deleteError = () => {
    toast.error("Sorry! One Day Before Not Delete Rooms")
}

const MyBooking = () => {
    const { user, loading, setCurrentRoom } = useContext(AuthContext);
    // const [myRoom, setMyRoom] = useState([])
    const [startDate, setStartDate] = useState(new Date());
    const [currentId, setCurrentId] = useState(0)

    const updateBookingDate = startDate;
    console.log("Modaler date", updateBookingDate)


    // for modal materialui
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen((cur) => !cur);


    const axiosSecure = useAxiosSecure();
    const url = `/bookingRoom/${user?.email}`


    //----------------------------->>> tantak query and axiosSecure

    const { data: myRoom = [], isLoading, refetch, isError, error } = useQuery({
        queryFn: () => getData(),
        queryKey: ['rooms', user?.email]   // 2nd index a jodi dependency dita pari. mane user?.email asle abar refetch hobe. ex:  queryKey: ['rooms', user?.email] 
    })
    console.log(myRoom)
    const getData = async () => {
        const { data } = await axiosSecure(url)
        return data;
    }

    // data update korar jonno useMutation function use korbo
    const { mutateAsync } = useMutation({
        mutationFn: async (room) => {
            const { data } = await axios.put(`http://localhost:5000/rooms/${room.roomId}`, updateAvailability)
            console.log(data)
        },
        onSuccess: () => {
            swal("Successfully Booked This Room", {
                icon: "success",
            });
            refetch();
        }
    })


    const { roomId, _id, Area, Location, PricePerNight, RoomImages, RoomTitle, Status, bookingDate, userEmail } = myRoom;
    const updateAvailability = { Availability: true };


    // delete spots 
    const handleDelete = (room, date) => {
        const bookDate = new Date(date).getTime();
        const todayDate = new Date().getTime();
        const compareDate = bookDate - todayDate;
        if (compareDate < 86400000) {
            return deleteError()
        }


        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary Post!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.delete(`http://localhost:5000/bookingRoom/${room._id}`)
                        .then(res => {
                            if (res.data.deletedCount) {
                                console.log(res.data)
                                mutateAsync(room)

                            }
                        })


                } else {
                    swal("Your imaginary Post is safe!");
                }
            });

    }
    // update er jonno
    const modalOpen = (thisId) => {
        handleOpen()
        setCurrentId(thisId)
    }
    const handleUpdate = () => {
        console.log("dialog theke asa id", currentId)
        axios.put(`http://localhost:5000/bookingRoom/${currentId}`, { updateBookingDate })
            .then(res => {
                if (res.data.modifiedCount) {
                    console.log(res.data)
                    refetch();
                    swal({
                        title: "Updatd",
                        text: "Your Booking Date Updated",
                        icon: "success",
                        button: "Close",
                    });
                }
            })
    }


    // if (loading) {
    //     return "Loading......."
    // }
    if (isLoading) {
        return <div className="max-w-[700px] w-full bg-white animate-pulse flex justify-center flex-col items-start mx-auto p-6 rounded-md shadow-xl">
            {/* User profile  Skeleton */}
            <div className="w-full flex gap-2 items-center">
                <div className="w-16 h-16 rounded-full bg-gray-300 animate-pulse"></div>
                <div className="w-[80%]">
                    <div className="w-[30%] rounded-full bg-gray-300 h-[15px] mb-3"></div>
                    <div className="w-[40%] rounded-full bg-gray-300 h-[15px]"></div>
                </div>
            </div>
            {/* user post skeleton */}
            <div className="mt-8 w-full">
                <div className="w-full rounded-full bg-gray-300 h-[15px] mb-3"></div>
                <div className="w-[90%] rounded-full bg-gray-300 h-[15px]"></div>
            </div>
        </div>
    }

    return (
        <div>


            <Helmet>
                <title>RoomIntel || My Booking</title>
            </Helmet>

            <h1 className="text-xl mg:text-2xl lg:text-3xl font-bold text-center leading-none dark:text-gray-600 mb-3 ">My added List</h1>

            <div className="flex flex-col items-center justify-center" >
                <p className="text-center leading-none dark:text-gray-600 w-[75%] mt-3 mb-11 " >In This Section You see All Post Informaion . You Added This post. If you nedd Post Update or Delete. You do Click in Update and Delete Button.</p>

            </div>

            <div className="overflow-x-auto border w-full mx-auto bg-[#1313180D] rounded-xl border-black  ">
                <table className="min-w-full text-[16px] font-semibold ">
                    <thead className="dark:bg-gray-300 bg-slate-600 mt-10">
                        <tr className="text-left  leading-none dark:text-gray-600">
                            <th></th>
                            <th className="p-3">Tourist </th>
                            <th className="p-3">Price</th>
                            <th className="p-3">Booking Date</th>
                            <th className="p-3">Update</th>
                            <th className="p-3">Review</th>
                            <th className="p-3">Cancle</th>

                        </tr>
                    </thead>
                    {
                        myRoom.map((room, i) => <tbody key={room?._id}>
                            <tr className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
                                <th>{i + 1}</th>
                                <td className="p-3">
                                    <img className="size-[80px] bg-slate-500 object-cover rounded-lg hover:blur-[2px] duration-500" src={`${room?.RoomImages?.[0] || "https://i.ibb.co/k3LwX3C/folio-img2-1-1536x960.jpg"}`} alt="avatar navigate ui" />

                                </td>

                                <td className="p-3">
                                    <p>$ {room?.PricePerNight}</p>

                                </td>
                                <td className="p-3">
                                    <p>{new Date(room?.bookingDate).toLocaleDateString()}</p>

                                </td>

                                <td className="">
                                    <Link  >

                                        <button onClick={() => modalOpen(room?._id)} className="btn btn-sm ml-2 bg-[#076aa5]"><MdOutlineUpdate /></button>
                                    </Link>
                                </td>
                                <td className="">
                                    <Link to={`/userReview/${room?.roomId}`}>
                                        <button onClick={() => setCurrentRoom(room)} className="btn btn-sm ml-2 bg-[#076aa5]"><FaRegEdit /></button>
                                    </Link>
                                </td>
                                <td className="">
                                    <button onClick={() => handleDelete(room, room?.bookingDate)} className="btn btn-sm ml-2 btn-warning"> <MdDeleteForever /></button>
                                </td>
                            </tr>

                            <Dialog
                                size="xs"
                                open={open}
                                // handler={handleOpen}
                                className="bg-transparent shadow-none"
                            >
                                <Card className="mx-auto w-full max-w-[24rem]">
                                    <CardBody className="flex flex-col gap-4">

                                        <Typography className="-mb-2" variant="h6">
                                            Pick a Update Date
                                        </Typography>
                                        <Typography className="-mb-2" variant="h6">
                                            Aitar id: {currentId}
                                        </Typography>
                                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 border border-[#5A5A5D] p-2 focus:dark:ring-violet-600 dark:bg-gray-100" />
                                        <div>
                                            <img src={`${room?.RoomImages?.[0] || "https://i.ibb.co/k3LwX3C/folio-img2-1-1536x960.jpg"}`} alt="" />
                                        </div>
                                        <div className="-ml-2.5 -mt-3">
                                            <Checkbox required label="Remember Me" />
                                        </div>
                                    </CardBody>
                                    <CardFooter onClick={handleUpdate} className="pt-0">
                                        <Button variant="gradient" onClick={handleOpen} fullWidth>
                                            Update
                                        </Button>

                                    </CardFooter>
                                </Card>
                            </Dialog>

                        </tbody>)
                    }

                </table>
            </div>


        </div >
    );
};

export default MyBooking;


