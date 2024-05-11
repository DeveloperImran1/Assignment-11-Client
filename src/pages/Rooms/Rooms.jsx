import axios from "axios";
import RoomsCard from "./RoomsCard";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { ButtonGroup, Button } from "@material-tailwind/react";
import { IoGrid } from "react-icons/io5";
import { FaTableList } from "react-icons/fa6";

const Rooms = () => {
    // const [allRooms, setRooms] = useState([]);
    // normal fetch 
    // useEffect(() => {

    //     axios("http://localhost:5000/rooms")
    //         .then(res => {
    //             console.log(res.data)
    //             setRooms(res.data)
    //         })
    // }, [])

    // tantak query dia fetching

    const [on, setValue] = useState('off')


    const { isPending, isError, error, data: allRooms = [], refetch } = useQuery({
        queryKey: ["rooms"],
        queryFn: async () => {
            const res = await fetch("http://localhost:5000/rooms");
            return res.json()
        }
    })
    console.log("tantak er users", allRooms)
    if (isPending) {
        return <p>loading .....</p>
    }

    return (
        <div>
            <div className="flex justify-between" >
                <p>Alaaljjfdskjf</p>
                <ButtonGroup className=" flex justify-center items-center">
                    <Button onClick={() => setValue(!on)} className={`${on ? "bg-[#23BE0A]" : "bg-[#59C6D2]"}`} ><IoGrid /></Button>
                    <Button onClick={() => setValue(!on)} className={`${on ? "bg-[#59C6D2]" : "bg-[#23BE0A]"}`} ><FaTableList /></Button>
                </ButtonGroup>
            </div>


            {
                on ? <Tabs>
                    <TabList>
                        <Tab>
                            <div className="relative mx-auto bg-white hover:bg-gray-200 p-2 rounded-md w-fit h-fit">
                                <p className="text-[15px] font-semibold" >All Rooms</p>
                                <span className="absolute -right-2 -top-2 flex h-[24px] w-[24px] items-center justify-center rounded-full bg-red-500 text-center text-[12px] text-white ">{allRooms.length}</span>
                            </div>
                        </Tab>
                        <Tab>
                            <div className="relative mx-auto bg-white hover:bg-gray-200 p-2 rounded-md w-fit h-fit">
                                <p className="text-[15px] font-semibold" >Available Rooms</p>
                                <span className="absolute -right-2 -top-2 flex h-[24px] w-[24px] items-center justify-center rounded-full bg-red-500 text-center text-[12px] text-white ">{allRooms?.filter(room => room?.Availability === true).length}</span>
                            </div>
                        </Tab>
                    </TabList>

                    <TabPanel>
                        <div className="grid grid-cols-3 gap-5" >
                            {
                                allRooms.map(room => <RoomsCard key={room._id} room={room}  ></RoomsCard>)
                            }
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="grid grid-cols-3 gap-5" >
                            {
                                allRooms?.filter(room => room?.Availability === true)?.map(room => <RoomsCard key={room?._id} room={room}  ></RoomsCard>)
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
                                    <span className="absolute -right-2 -top-2 flex h-[24px] w-[24px] items-center justify-center rounded-full bg-red-500 text-center text-[12px] text-white ">{allRooms.length}</span>
                                </div>
                            </Tab>
                            <Tab>
                                <div className="relative mx-auto bg-white hover:bg-gray-200 p-2 rounded-md w-fit h-fit">
                                    <p className="text-[15px] font-semibold" >Available Rooms</p>
                                    <span className="absolute -right-2 -top-2 flex h-[24px] w-[24px] items-center justify-center rounded-full bg-red-500 text-center text-[12px] text-white ">{allRooms?.filter(room => room?.Availability === true).length}</span>
                                </div>
                            </Tab>
                        </TabList>

                        <TabPanel>
                                {
                                    allRooms.map(room => <RoomsCard key={room._id} room={room}  ></RoomsCard>)
                                }
                         
                        </TabPanel>
                        <TabPanel>
                            <div className="grid grid-cols-3 gap-5" >
                                {
                                    allRooms?.filter(room => room?.Availability === true)?.map(room => <RoomsCard key={room?._id} room={room}  ></RoomsCard>)
                                }
                            </div>
                        </TabPanel>
                    </Tabs>

            }



        </div>
    );
};

export default Rooms;