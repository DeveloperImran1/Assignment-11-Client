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

const MyBooking = () => {
    const { user, loading, setCurrentRoom } = useContext(AuthContext);
    const [myRoom, setMyRoom] = useState([])
    const [startDate, setStartDate] = useState(new Date());


    // const updateBookingDate = new Date(startDate).toLocaleDateString();
    const [updateBookingDate, setUpdateBookingDate] = useState("")
    console.log(updateBookingDate)


    useEffect(() => {

        axios.get(`http://localhost:5000/bookingRoom/${user?.email}`)
            .then(res => {
                console.log(res.data)
                setMyRoom(res.data)
            })
    }, [user])
    const { roomId, _id, Area, Location, PricePerNight, RoomImages, RoomTitle, Status, bookingDate, userEmail } = myRoom;
    const updateAvailability = { Availability: true };
    // delete spots 
    const handleDelete = room => {
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
                            if(res.data.deletedCount){
                                axios.put(`http://localhost:5000/rooms/${room.roomId}`, updateAvailability)
                                .then(res => {
                                    console.log(res.data)
                                    if (res.data.modifiedCount) {
                                        swal("Successfully Booked This Room", {
                                            icon: "success",
                                        });
                                    }
                                })
                            }
                        })

                
                } else {
                    swal("Your imaginary Post is safe!");
                }
            });

    }

    const handleUpdate = (id)=> {

        Swal.fire({
            title: "Borrow",
            html:
              '<label for="returnDate">Return Date:</label>' +
              '<input id="returnDate" class="swal2-input" type="date" placeholder="Return Date">',
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: "Submit",
            preConfirm: () => {
              const returnDate = Swal.getPopup().querySelector("#returnDate").value;
              if (!returnDate) {
                Swal.showValidationMessage("Return date is required");
              }
              return { returnDate: returnDate };
            },
          }).then((result) => {
            if (result.isConfirmed) {
              const returnDate = result.value.returnDate;
              // Handle submission, e.g., send returnDate to backend
              console.log("Borrowing with return date:", returnDate);
              setUpdateBookingDate(returnDate)

              axios.put(`http://localhost:5000/bookingRoom/${id}`, {updateBookingDate} )
              .then(res => {
                  if(res.data.modifiedCount){
                    swal({
                        title: "Updatd",
                        text: "Your Booking Date Updated",
                        icon: "success",
                        button: "Close",
                      });
                  }
              })
             
            }
          });
          


     
    }

    

    if (loading) {
        return "Loading......."
    }

    return (
        <div>

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
                        myRoom.map((room, i) => <tbody key={room._id}>
                            <tr className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
                                <th>{i + 1}</th>
                                <td className="p-3">
                                    <img className="size-[80px] bg-slate-500 object-cover rounded-lg hover:blur-[2px] duration-500" src="https://source.unsplash.com/300x300/?profile" alt="avatar navigate ui" />

                                </td>

                                <td className="p-3">
                                    <p>$ {room.PricePerNight}</p>

                                </td>
                                <td className="p-3">
                                    <p>{room.bookingDate}</p>

                                </td>

                                <td className="">
                                    <Link  >
                                        <button onClick={()=> handleUpdate(room?._id)} className="btn btn-sm ml-2 bg-[#FF5400]"><MdOutlineUpdate /></button>
                                    </Link>
                                </td>
                                <td className="">
                                    <Link to="/userReview">
                                        <button onClick={() => setCurrentRoom(room)} className="btn btn-sm ml-2 bg-[#FF5400]"><FaRegEdit /></button>
                                    </Link>
                                </td>
                                <td className="">
                                    <button onClick={() => handleDelete(room)} className="btn btn-sm ml-2 btn-warning"> <MdDeleteForever /></button>
                                </td>
                            </tr>
                        </tbody>)
                    }

                </table>
            </div>


        </div >
    );
};

export default MyBooking;

