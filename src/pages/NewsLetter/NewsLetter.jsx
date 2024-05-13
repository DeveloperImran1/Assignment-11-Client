

const NewsLetter = () => {
    return (
    
        <div className="bg-fixed bg-no-repeat bg-cover text-white" style={{ backgroundImage: "url('https://img.freepik.com/premium-photo/simple-little-house-model-one-story-village-building-3d-rendering_187882-1562.jpg')" }} >
            <div className=" px-4 xs:px-10 xl:px-0 py-14 sm:py-20 ml-[40px] max-w-7xl mx-auto"><h3 className="text-2xl sm:text-3xl font-semibold max-w-96 sm:leading-10">Subscribe our news letter for get our exiting offer!</h3>
                <div className="flex item-center mt-5 ">
                    <div className="relative">

                        <input name="email" type="email" placeholder="Email address" className=" py-2 md:py-3 px-5 rounded-l-md border-2 border-white  text-primary-light w-full outline-none font-semibold rounded-r-none" required="" />
                    </div>
                    <button className=" border-2 border-white border-l-2 hover:border-l-primary-light py-2 md:py-3 px-3 md:px-5 rounded-r-md rounded-l-none bg-primary-light hover:bg-[#029cfb]  transition-all font-semibold hover:text-primary-light  ">Subscribe</button>
                </div>
            </div>
        </div>
    )
};

export default NewsLetter;


