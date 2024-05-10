// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';



// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';


const Banner = () => {
    return (
        <div className="h-[700px] w-full bg-cover bg-no-repeat relative flex items-center justify-evenly " style={{ backgroundImage: "url('https://i.ibb.co/hVgv9bN/New-banner-image-2.jpg')" }}>
        {/* <div className="bg-red-500 h-[500px] "> */}
        <div className='bg-gray-500 h-[700px] w-full absolute opacity-30' >

        </div>
        <div className='flex flex-col gap-7 justify-center' >
            <h1 className='text-3xl font-bold text-white' >Explore Buying, Renting, Investing Opportunities!</h1>
            <h1 className='text-5xl font-bold text-white'>Hunt Your Dream Home</h1>
            <Link>
                <button className="rounded-lg border-2 border-sky-500 px-5 py-2 text-xl text-sky-500 duration-200 hover:bg-[#FF5400] hover:text-white">Login</button>
            </Link>
        </div>

        <Swiper
            // spaceBetween={30}
            centeredSlides={true}
            autoplay={{
                delay: 2000,
                disableOnInteraction: false,
            }}
            // pagination={{
            //     clickable: true,
            // }}
            // navigation={true}
            modules={[Autoplay]}
            // className="mySwiper w-[46%] h-[60%] absolute top-[20%] left-[22%] "
            className="mySwiper w-[46%] h-[60%] "
        >
            <SwiperSlide>
                <img src="https://i.ibb.co/ryVDcqF/folio-img7-1536x960.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
                <img src="https://i.ibb.co/ryVDcqF/folio-img7-1536x960.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
                <img src="https://i.ibb.co/ryVDcqF/folio-img7-1536x960.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
                <img src="https://i.ibb.co/ryVDcqF/folio-img7-1536x960.jpg" alt="" />
            </SwiperSlide>


        </Swiper>
    </div>
    );
};

export default Banner;