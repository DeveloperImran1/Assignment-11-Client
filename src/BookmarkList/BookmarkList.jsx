import { MdDeleteForever } from "react-icons/md";


const BookmarkList = ({ estate, handleRemoveEstate }) => {

const { _id, Area, Availability, Facilities, Location, PricePerNight, Reviews, RoomDescription, RoomImages
    , RoomSize, RoomTitle, SpecialOffers, Status, Utilities } = estate;

    return (
        <div>

    

            <div className=" space-y-4 flex flex-col relative  p-6 shadow-lg w-full h-[480px] max-w-sm mx-auto group transition border-2 rounded-xl hover:scale-105 border-primary hover:border-secondary border-opacity-30 hover:no-underline focus:no-underline ">
                <div className="relative">
                    <img alt="card navigate ui" className="w-[330px] h-[230px] object-cover  rounded-xl " src={RoomImages?.[0] || 'https://i.ibb.co/k3LwX3C/folio-img2-1-1536x960.jpg'} />
                    <div className="bg-blue-400 absolute text-[25px] font-normal text-center right-0 top-4 w-[85px] h-[35px] rounded-l-full text-black  ">{Status}</div>
                </div>
                <div className="grid gap-2 justify-start text-start">
                    <h1 className="text-[20px] font-semibold dark:text-gray-600  ">{RoomTitle}</h1>
                    <p className="text-base  dark:text-gray-600  ">{RoomDescription?.slice(0, 70)}</p>
                    <hr className="border border-dashed dark:text-gray-600  my-2 " />

                    <div className=" flex text-base dark:text-gray-600  font-medium justify-between ">
                        <p>$ {PricePerNight}</p>
                        <p>{Area}</p>
                    </div>

                </div>

                <div
                    onClick={() => handleRemoveEstate(estate)}
                    className='bg-primary p-3 ml-5 rounded-full absolute  -top-5 -right-5 hover:bg-secondary group   cursor-pointer hover:scale-105 '>
                    <MdDeleteForever size={20} className='text-secondary group hover:text-primary' />
                </div>



            </div>
        </div>
    );
};

export default BookmarkList;