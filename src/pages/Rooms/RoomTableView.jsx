
const RoomTableView = ({ room }) => {


console.log("table room", room)


    return (
        <div>

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
                        // room?.map((room, i) => <tbody key={room._id}>
                        //     <tr className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
                        //         <th>{i + 1}</th>
                        //         <td className="p-3">
                        //             <img className="size-[80px] bg-slate-500 object-cover rounded-lg hover:blur-[2px] duration-500" src="https://source.unsplash.com/300x300/?profile" alt="avatar navigate ui" />

                        //         </td>

                        //         <td className="p-3">
                        //             <p>$ {room.PricePerNight}</p>

                        //         </td>
                        //         <td className="p-3">
                        //             <p>{room.bookingDate}</p>

                        //         </td>

                        //         <td className="">
                        //             <Link  >
                        //                 <button onClick={() => handleUpdate(room?._id)} className="btn btn-sm ml-2 bg-[#076aa5]"><MdOutlineUpdate /></button>
                        //             </Link>
                        //         </td>
                        //         <td className="">
                        //             <Link to={`/userReview/${room?.roomId}`}>
                        //                 <button onClick={() => setCurrentRoom(room)} className="btn btn-sm ml-2 bg-[#076aa5]"><FaRegEdit /></button>
                        //             </Link>
                        //         </td>
                        //         <td className="">
                        //             <button onClick={() => handleDelete(room)} className="btn btn-sm ml-2 btn-warning"> <MdDeleteForever /></button>
                        //         </td>
                        //     </tr>
                        // </tbody>)
                    }

                </table>
            </div>

        </div>
    );
};

export default RoomTableView;