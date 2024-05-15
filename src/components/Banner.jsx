// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';





// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';

import { Typewriter } from 'react-simple-typewriter'

const Banner = () => {
    return (
        <div className="h-[700px] w-full bg-cover bg-no-repeat relative flex flex-col lg:flex-row items-center justify-evenly " style={{ backgroundImage: "url('https://i.ibb.co/hVgv9bN/New-banner-image-2.jpg')" }}>

            <div className='flex flex-col mt-8 lg:mt-0 gap-7 space-y-6 z-10 justify-center ml-10' >
           
                <h1 data-aos="fade-down" style={{ paddingTop: '5rem', margin: 'auto 0', fontWeight: 'normal' }}
                    className="text-xl lg:text-2xl font-semibold text-[#029cfb]">
                    {'Welcome!'}
                    <span style={{ color: 'white', fontWeight: 'bold' }}>
                        {/* Style will be inherited from the parent element */}
                        <Typewriter
                            words={['Explore Buying', 'Renting' , "Investing Opportunities!","in Our RoomIntel"]}
                            loop={5}
                            cursor
                            cursorStyle='_'
                            typeSpeed={70}
                            deleteSpeed={50}
                            delaySpeed={1000}

                        />
                    </span>
                </h1>
                <h1 className='text-4xl lg:text-7xl font-bold text-white'>Hunt Your <br /> Dream Home</h1>
                <Link to="/rooms" data-aos="fade-up" >
                    <button className="rounded-lg hover:rounded-full border-2 border-[#076aa5] px-8 py-2 text-xl text-sky-500 duration-200 bg-[#076aa5] hover:bg-[#029cfb] text-white">Get Started</button>
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
                    <img src="https://i.ibb.co/b7xDNYZ/florian-schmidinger-b-79n-Oqf95-I-unsplash.jpg" alt="" className='rounded-[16px]' />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://i.ibb.co/n67QY5p/frames-for-your-heart-m-R1-CIDdu-GLc-unsplash.jpg" alt="" className='rounded-[16px]' />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://i.ibb.co/Xyp9HmY/digital-marketing-agency-ntwrk-g39p1k-Djv-SY-unsplash.jpg" alt="" className='rounded-[16px]'  />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://i.ibb.co/p00S6yS/villa-3-1.jpg" alt="" className='rounded-[16px]'  />
                </SwiperSlide>


            </Swiper>
            <div className='bg-[#17394e] h-[700px] w-full absolute opacity-30' >

            </div>
        </div>
    );
};

export default Banner;