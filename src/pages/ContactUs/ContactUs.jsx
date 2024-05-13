import { FaMapMarkerAlt } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { MdEmail } from "react-icons/md";


import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";



const ContactUs = () => {
    return (
        <div>
          
            <h1
                data-aos="fade-down"
                data-aos-easing="linear"
                data-aos-duration="1500"
                className="text-xl mt-11 md:text-2xl lg:text-3xl font-bold text-center leading-none dark:text-gray-600 mb-3  lg:mt-[70px]">Contact Us</h1>
            <div className="flex flex-col items-center justify-center" >
                <p
                    data-aos="fade-down"
                    data-aos-easing="linear"
                    data-aos-duration="1000"
                    className="text-center leading-none dark:text-gray-600 w-[90%] lg:w-[75%] mb-6 " >Questions or feedback? Were here to help! Contact our friendly team for assistance with bookings, inquiries, or support. Reach us via phone, email, or through our online form.</p>

            </div>
            <div className="flex mb-[40px] flex-col lg:flex-row justify-between gap-6 items-start" >
                <div className="grid grid-cols-1 lg:grid-cols-2 justify-items-center  w-full gap-4  " >
                    <div
                        data-aos="fade-up"
                        data-aos-anchor-placement="center-bottom"
                        data-aos-delay="50"
                        data-aos-duration="1000"
                        className="border/10 mx-auto lg:col-span-2  w-full rounded-2xl bg-white p-5 shadow-lg dark:bg-[#18181B] md:p-8 border ">
                        <div className="flex flex-col items-center justify-center space-y-5">
                            <FaMapMarkerAlt size={70} className="border-[1px] border-[#076aa5] border-dotted rounded-full p-2 text-[#076aa5] " />
                            <h6 className="text-center font-semibold text-slate-700 text-2xl dark:text-white/80">Our Address</h6>
                            <h6 className="text-center font-medium text-[#5A5A5D] dark:text-white/80">Panchbibi, Joypurhat</h6>

                        </div>
                    </div>

                    {/* <div className="grid grid-cols-2" > */}
                    <div
                        data-aos="fade-up"
                        data-aos-anchor-placement="center-bottom"
                        data-aos-delay="50"
                        data-aos-duration="1000"
                        className="border/10 mx-auto w-full lg:w-[300px] rounded-2xl bg-white p-5 shadow-lg dark:bg-[#18181B] md:p-8 border">
                        <div className="flex flex-col items-center justify-center space-y-5">
                            <MdEmail size={70} className="border-[1px] border-[#076aa5] border-dotted rounded-full p-2 text-[#076aa5] " />
                            <h6 className="text-center font-semibold text-slate-700 text-2xl dark:text-white/80">Email Us</h6>
                            <h6 className="text-center font-medium text-[#5A5A5D] dark:text-white/80">ih9066588@gmail.com</h6>
                            <h6 className="text-center font-normal text-xs text-[#5A5A5D] dark:text-white/80">abdulquddus01925251187@gmail.com</h6>
                        </div>
                    </div>
                    <div
                        data-aos="fade-up"
                        data-aos-anchor-placement="center-bottom"
                        data-aos-delay="50"
                        data-aos-duration="1000"
                        className="border/10 mx-auto w-full lg:w-[300px] rounded-2xl bg-white p-5 shadow-lg dark:bg-[#18181B] md:p-8 border">
                        <div className="flex flex-col items-center justify-center space-y-5">
                            <IoCall size={70} className="border-[1px] border-[#076aa5] border-dotted rounded-full p-2 text-[#076aa5] " />
                            <h6 className="text-center font-semibold text-slate-700 text-2xl dark:text-white/80">Call Us</h6>
                            <h6 className="text-center font-medium text-[#5A5A5D] dark:text-white/80">+8801311710894</h6>
                            <h6 className="text-center font-medium text-[#5A5A5D] dark:text-white/80">+8801989187382</h6>
                        </div>
                    </div>

                    {/* </div> */}
                </div>

                <div
                    data-aos="fade-up"
                    data-aos-anchor-placement="center-bottom"
                    data-aos-delay="50"
                    data-aos-duration="1000"
                    className="w-full lg:w-[70%]" >
                    <form noValidate="" className="flex flex-col px-6 py-8  space-y-6  w-full border-2 border-[#5A5A5D] rounded-[16px] ">
                        <div className="flex justify-between items-center" >
                            <label className="block">
                                <span className="mb-1">Full name</span>
                                <input type="text" placeholder="Your name" className="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 border border-[#5A5A5D] p-2 focus:dark:ring-violet-600 dark:bg-gray-100" />
                            </label>
                            <label className="block">
                                <span className="mb-1">Email</span>
                                <input type="text" placeholder="Your Email" className="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 border border-[#5A5A5D] p-2 focus:dark:ring-violet-600 dark:bg-gray-100" />
                            </label>
                        </div>
                        <label className="block">
                            <span className="mb-1">Full name</span>
                            <input type="text" placeholder="Your name" className="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 border border-[#5A5A5D] p-2 focus:dark:ring-violet-600 dark:bg-gray-100" />
                        </label>
                        <label className="block">
                            <span className="mb-1">Message</span>
                            <textarea type="text" placeholder="Text Area" className=" h-[160px] block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 border border-[#5A5A5D] p-2 focus:dark:ring-violet-600 dark:bg-gray-100"></textarea>
                        </label>
                        <button type="button" className="border border-[#5A5A5D]   self-center px-8 py-3 text-lg rounded focus:ring hover:ring focus:ring-opacity-75 dark:bg-violet-600 dark:text-gray-50 focus:dark:ring-violet-600 hover:dark:ring-violet-600">Submit</button>
                    </form>
                </div>
            </div>
            <div className="flex items-center justify-center" >
                <MapContainer
                    center={[23.7104, 90.4074]}
                    zoom={11}
                    scrollWheelZoom={true}
                    className="w-[80%] h-[40vh] md:h-[50vh] lg:h-[80vh]"
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={[23.7104, 90.4074]}>
                        <Popup>
                            This is Our Hotel <br /> We wait fou You.
                        </Popup>
                    </Marker>
                </MapContainer>

            </div>

        </div>

    );
};

export default ContactUs;

