import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
const Galery = () => {
    return (
        <div>


            <Helmet>
                <title>RoomIntel || Galery</title>
            </Helmet>
            <div className="w-full py-[16px] rounded-2xl bg-[#1313130D] dark:text-gray-600  mb-8 text-center">
                <p className="dark:text-gray-600  font-bold text-[20px] lg:text-[28px] mb-6">Our Hotel Awesome Rooms</p>
                <p className="w-[70%] mx-auto">EExplore Our Hotels Gallery! Immerse yourself in the charm and elegance of our diverse range of rooms. From luxurious suites to cozy retreats, each image captures the essence of comfort and style.</p>
            </div>
            <section className="py-6 dark:bg-gray-100 dark:text-gray-900">
                <div className="container grid grid-cols-2 gap-4 p-4 mx-auto md:grid-cols-4">

                    <div className="diff  w-full transition  border-2 hover:border-[#23BE0A] h-full col-span-2 row-span-2 rounded shadow-sm min-h-96 md:col-start-3 md:row-start-1 dark:bg-gray-500 aspect-square">
                        <div className="diff-item-1">
                            <img alt="daisy" src="https://i.ibb.co/p00S6yS/villa-3-1.jpg" />
                        </div>
                        <div className="diff-item-2">
                            <img alt="daisy" className="blur " src="https://i.ibb.co/p00S6yS/villa-3-1.jpg" />
                        </div>
                        <div className="diff-resizer"></div>
                    </div>
                    {/* <img src="https://i.ibb.co/gzp3JYF/sincerely-media-CXYPfveiuis-unsplash.jpg" alt="" className="w-full transition hover:scale-105 border-2 hover:border-[#23BE0A] h-full col-span-2 row-span-2 rounded shadow-sm min-h-96 md:col-start-3 md:row-start-1 dark:bg-gray-500 aspect-square" /> */}

                    <img alt="" className="w-full transition hover:scale-105 border-2 hover:border-[#23BE0A] h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square" src="https://i.ibb.co/tbF7rxb/villa-3-2.jpg" />
                    <img alt="" className="w-full transition hover:scale-105 border-2 hover:border-[#23BE0A] h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square" src="https://i.ibb.co/4WcYWB2/villa-3-3.jpg" />
                    <img alt="" className="w-full transition hover:scale-105 border-2 hover:border-[#23BE0A] h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square" src="https://i.ibb.co/mvZkFVf/pexels-photo-164522.jpg" />
                    <img alt="" className="w-full transition hover:scale-105 border-2 hover:border-[#23BE0A] h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square" src="https://i.ibb.co/rQVkfWc/pexels-photo-259962.jpg" />
                    <img alt="" className="w-full transition hover:scale-105 border-2 hover:border-[#23BE0A] h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square" src="https://i.ibb.co/K9ZwbkX/pexels-photo-271624.webp" />
                    <img alt="" className="w-full transition hover:scale-105 border-2 hover:border-[#23BE0A] h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square" src="https://i.ibb.co/VTcbnf6/pexels-photo-1571463.jpg" />
                    <img alt="" className="w-full transition hover:scale-105 border-2 hover:border-[#23BE0A] h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square" src="https://i.ibb.co/NxKVK5M/pexels-photo-1643383.jpg" />
                    <img alt="" className="w-full transition hover:scale-105 border-2 hover:border-[#23BE0A] h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square" src="https://i.ibb.co/J5KpNfW/office-10-1.webp" />
                    <div className="diff aspect-[16/9] w-full transition border-2 hover:border-[#23BE0A] h-full col-span-2 row-span-2 rounded shadow-sm min-h-96 md:col-start-1 md:row-start-3 dark:bg-gray-500 ">
                        <div className="diff-item-1">
                            <img alt="daisy" src="https://i.ibb.co/J5KpNfW/office-10-1.webp" />
                        </div>
                        <div className="diff-item-2">
                            <img alt="daisy" className="blur " src="https://i.ibb.co/J5KpNfW/office-10-1.webp" />
                        </div>
                        <div className="diff-resizer"></div>
                    </div>
                    {/* <img src="https://i.ibb.co/G3b5XZs/morgan-housel-a-Z-Mm-Sm-Acjg-unsplash.jpg" alt="" className="w-full transition hover:scale-105 border-2 hover:border-[#23BE0A] h-full col-span-2 row-span-2 rounded shadow-sm min-h-96 md:col-start-1 md:row-start-3 dark:bg-gray-500 aspect-square" /> */}
                </div>

            </section>
        </div>
    );
};

export default Galery;











