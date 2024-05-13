import { Link } from "react-router-dom";

const SeeAllProperty = () => {
    return (
        <div className=" bg-cover relative bg-no-repeat bg-fixed w-full h-[340px]" style={{ backgroundImage: "url('https://i.ibb.co/hVgv9bN/New-banner-image-2.jpg')" }} >
            {/* <div className='bg-gradient-to-r from-black via-gray-900 to-transparent h-[200px] w-full absolute' > */}

            {/* </div> */}
            <div className=" h-[340px]  flex flex-col justify-center space-y-2  text-left z-10 text-white bg-gradient-to-r from-black via-gray-900 to-transparent">
                <h1
                    // data-aos="fade-right"
                    // data-aos-offset="300"
                    // data-aos-easing="ease-in-sine"
                    className="text-[40px] ml-10  font-bold text-left w-[90%] lg:w-full ">Sell Your Property With Confidence</h1>
                <p
                    // data-aos="fade-left"
                    // data-aos-offset="300"
                    // data-aos-easing="ease-in-sine"
                    className=" text-[16px] ml-10  text-left  w-[70%] lg:w-[50%]">Are you curious about the precise value of your home or its potential selling price? Benefit from our extensive expertise in the luxury home market. </p>

                <Link to="/rooms" >
                    <button className="rounded-lg ml-10 hover:rounded-full border-2 border-[#076aa5] px-8 py-2 text-xl text-sky-500 duration-200 bg-[#076aa5] hover:bg-[#029cfb] text-white">See All Rooms</button>
                </Link>

            </div>


        </div>
    );
};

export default SeeAllProperty;