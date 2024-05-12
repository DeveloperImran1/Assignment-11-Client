import { FaStar } from "react-icons/fa";

const SatisfiedClientCard = ({ client }) => {
    const { email, message, photoURL, date, rating, userName } = client;

    return (
        <div>
            <article className="flex flex-col w-[250px] lg:w-[300px] mr-9 p-4 transition border-2 rounded-xl hover:scale-105 border-sky-500  border-opacity-30 hover:border-opacity-100 hover:no-underline focus:no-underline ">
                <div className="w-full h-52 rounded-xl bg-gray-100 flex justify-center items-center ">
                    <img className="size-[130px] bg-slate-500 object-cover rounded-full hover:blur-[2px] duration-500" src={photoURL || 'https://source.unsplash.com/200x200/?fashion?2'} alt="avatar navigate ui" />
                </div>
                <div className="flex flex-col flex-1 py-6">
                    <a rel="noopener noreferrer" aria-label="Te nulla oportere reprimique his dolorum"></a>
                    <div className="flex items-center justify-between">
                        <p rel="noopener noreferrer" className="text-[20px] font-semibold tracking-wider uppercase hover:underline ">{userName}</p>
                        <div className="flex items-center justify-center space-x-2 dark:text-yellow-700">

                            <FaStar size={25} className='text-[#f2b00a]' />
                            <span className="text-xl font-bold">{`${rating || 5}`}</span>
                        </div>
                    </div>
                    <h3 className="flex-1 py-2 text-lg text-left font-normal leading-snug">{message?.slice(0, 37)}</h3>
                    <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs ">
                        <span>{new Date(date).toLocaleDateString()}</span>
                        <span>{email}</span>

                    </div>
                </div>
            </article>
        </div>
    );
};

export default SatisfiedClientCard;