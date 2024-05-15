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

        axios("https://assignment-eleven-server-delta.vercel.app/rooms")
            .then(res => {
                console.log(res.data)
                setRooms(res.data)
            })
    }, [])


    return (
        <div id="featuredId" className="mt-[40px] mb-12 " >
            <div className="space-y-2 text-center mb-[19px]">
                        <h1 
                        // data-aos="fade-right"
                        // data-aos-offset="300"
                        // data-aos-easing="ease-in-sine"
                         className="text-[40px] font-bold dark:text-gray-600 text-center w-full ">Featured Rooms</h1>
                        <p
                        // data-aos="fade-left"
                        // data-aos-offset="300"
                        // data-aos-easing="ease-in-sine"
                         className=" text-[16px] dark:text-gray-600 text-center mb-12 w-full lg:w-[80%] mx-auto ">Discover our Featured Rooms! From cozy retreats to luxurious suites, explore a curated selection of exceptional accommodations tailored to elevate your stay.... </p>

                    </div>

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
                slidesPerView={1}
                breakpoints={{
                    // When window width is <= 640px
                    640: {
                      slidesPerView: 1,
                    },
                    // When window width is <= 768px
                    768: {
                      slidesPerView: 2,
                    },
                    // When window width is <= 1024px
                    1024: {
                      slidesPerView: 3,
                    },
                  }}
            >
                {
                    allRooms.map(room => <SwiperSlide  key={room._id}> <RoomsCard room={room}  ></RoomsCard>  </SwiperSlide>)
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