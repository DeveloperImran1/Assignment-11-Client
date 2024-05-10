import axios from "axios";
import RoomsCard from "./RoomsCard";
import { useEffect, useState } from "react";

const Rooms = () => {
    const [allRooms, setRooms] = useState([]);
    useEffect(() => {

        axios("http://localhost:5000/rooms")
            .then(res => {
                console.log(res.data)
                setRooms(res.data)
            })
    }, [])
    return (
        <div>
            <div className="grid grid-cols-3 gap-5" >
                {
                    allRooms.map(room => <RoomsCard key={room._id} room={room}  ></RoomsCard>)
                }
            </div>
        </div>
    );
};

export default Rooms;