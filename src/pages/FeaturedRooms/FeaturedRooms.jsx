import axios from "axios";
import { useEffect, useState } from "react";
import RoomsCard from "../Rooms/RoomsCard";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Navigation } from 'swiper/modules';

const FeaturedRooms = () => {

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
            <h1 className='text-4xl text-center' >Featured Rooms</h1>

            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}

                navigation={true}
                className="mySwiper"
                modules={[Navigation]}
                slidesPerView={3}
            >
                {
                    allRooms.map(room => <SwiperSlide> <RoomsCard key={room._id} room={room}  ></RoomsCard>  </SwiperSlide>)
                }




            </Swiper>
        </div>
    );
};

export default FeaturedRooms;







{/* <Marquee>
            
{
    allRooms.map(room => <RoomsCard key={room._id} room={room}  ></RoomsCard>)
}

</Marquee> */}