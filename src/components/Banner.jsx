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
        <div className="h-[700px] w-full bg-cover bg-no-repeat relative flex flex-col lg:flex-row items-center justify-evenly " style={{ backgroundImage: "url('https://i.ibb.co/hVgv9bN/New-banner-image-2.jpg')" }}>

            <div className='flex flex-col mt-8 lg:mt-0 gap-7 space-y-6 z-10 justify-center ml-10' >
                <h1 className=' text-xl lg:text-2xl font-semibold text-white' >Explore Buying, Renting, Investing Opportunities!</h1>
                <h1 className='text-4xl lg:text-7xl font-bold text-white'>Hunt Your <br /> Dream Home</h1>
                <Link>
                    <button className="rounded-lg hover:rounded-full border-2 border-[#076aa5] px-8 py-2 text-xl text-sky-500 duration-200 bg-[#076aa5] hover:bg-[#029cfb] text-white">Login</button>
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
                className="mySwiper rounded-[16px] w-[80%] lg:w-[46%] h-[80%] lg:h-[60%] mt-[50px]"
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
            <div className='bg-[#17394e] h-[700px] w-full absolute opacity-30' >

            </div>
        </div>
    );
};

export default Banner;