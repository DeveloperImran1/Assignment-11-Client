import { NavLink } from "react-router-dom";

const Galery = () => {
    return (
        <div>
            <div className="w-full py-[16px] rounded-2xl bg-[#1313130D] text-[#131313B3] mb-8 text-center">
                <p className="text-[#131313]  font-bold text-[20px] lg:text-[28px] mb-6">Our Hotel Awesome Rooms</p>
                <p className="w-[70%] mx-auto">EExplore Our Hotels Gallery! Immerse yourself in the charm and elegance of our diverse range of rooms. From luxurious suites to cozy retreats, each image captures the essence of comfort and style.</p>
            </div>
            <section className="py-6 dark:bg-gray-100 dark:text-gray-900">
                    <div className="container grid grid-cols-2 gap-4 p-4 mx-auto md:grid-cols-4">

                    <div className="diff  w-full transition  border-2 hover:border-[#23BE0A] h-full col-span-2 row-span-2 rounded shadow-sm min-h-96 md:col-start-3 md:row-start-1 dark:bg-gray-500 aspect-square">
                            <div className="diff-item-1">
                                <img alt="daisy" src="https://img.daisyui.com/images/stock/photo-1560717789-0ac7c58ac90a.jpg" />
                            </div>
                            <div className="diff-item-2">
                                <img alt="daisy" className="blur " src="https://i.ibb.co/G3b5XZs/morgan-housel-a-Z-Mm-Sm-Acjg-unsplash.jpg" />
                            </div>
                            <div className="diff-resizer"></div>
                        </div>
                        {/* <img src="https://i.ibb.co/gzp3JYF/sincerely-media-CXYPfveiuis-unsplash.jpg" alt="" className="w-full transition hover:scale-105 border-2 hover:border-[#23BE0A] h-full col-span-2 row-span-2 rounded shadow-sm min-h-96 md:col-start-3 md:row-start-1 dark:bg-gray-500 aspect-square" /> */}

                        <img alt="" className="w-full transition hover:scale-105 border-2 hover:border-[#23BE0A] h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square" src="https://i.ibb.co/W0jZpyw/ashkan-forouzani-Gg-UOhg-Sk-Lc4-unsplash.jpg" />
                        <img alt="" className="w-full transition hover:scale-105 border-2 hover:border-[#23BE0A] h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square" src="https://i.ibb.co/FnpbGt6/rain-bennett-7-Nir5-XIRVM-unsplash.jpg" />
                        <img alt="" className="w-full transition hover:scale-105 border-2 hover:border-[#23BE0A] h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square" src="https://i.ibb.co/hFwN1QH/jeet-dhanoa-t-GHk-C5nt-UGc-unsplash.jpg" />
                        <img alt="" className="w-full transition hover:scale-105 border-2 hover:border-[#23BE0A] h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square" src="https://i.ibb.co/Svk4VLN/pngwing-1.png" />
                        <img alt="" className="w-full transition hover:scale-105 border-2 hover:border-[#23BE0A] h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square" src="https://i.ibb.co/JCDYP9y/aaron-burden-9zs-HNt5-Opq-E-unsplash.jpg" />
                        <img alt="" className="w-full transition hover:scale-105 border-2 hover:border-[#23BE0A] h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square" src="https://i.ibb.co/Qf5QCDY/surja-sen-das-raj-JIWPWc-Unh-Us-unsplash.jpg" />
                        <img alt="" className="w-full transition hover:scale-105 border-2 hover:border-[#23BE0A] h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square" src="https://i.ibb.co/fdmYs7S/ha-nguy-n-2s1c-B4-QRid4-unsplash.jpg" />
                        <img alt="" className="w-full transition hover:scale-105 border-2 hover:border-[#23BE0A] h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square" src="https://i.ibb.co/DLVc6zJ/studio-media-9-Da-OYUYn-Ols-unsplash.jpg" />
                        <div className="diff aspect-[16/9] w-full transition border-2 hover:border-[#23BE0A] h-full col-span-2 row-span-2 rounded shadow-sm min-h-96 md:col-start-1 md:row-start-3 dark:bg-gray-500 ">
                            <div className="diff-item-1">
                                <img alt="daisy" src="https://img.daisyui.com/images/stock/photo-1560717789-0ac7c58ac90a.jpg" />
                            </div>
                            <div className="diff-item-2">
                                <img alt="daisy" className="blur " src="https://i.ibb.co/G3b5XZs/morgan-housel-a-Z-Mm-Sm-Acjg-unsplash.jpg" />
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