import Banner from "../../components/Banner";
import FeaturedRooms from "../FeaturedRooms/FeaturedRooms";
import NewsLetter from "../NewsLetter/NewsLetter";
import UserReview from "../UserReview/UserReview";
import SatisfiedClients from "./SatisfiedClients"



const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeaturedRooms></FeaturedRooms>
            <SatisfiedClients></SatisfiedClients>
            <NewsLetter></NewsLetter>
        </div>
    );
};

export default Home;

