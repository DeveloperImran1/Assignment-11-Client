import Banner from "../../components/Banner";
import FeaturedRooms from "../FeaturedRooms/FeaturedRooms";
import NewsLetter from "../NewsLetter/NewsLetter";
import UserReview from "../UserReview/UserReview";



const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeaturedRooms></FeaturedRooms>
            <UserReview></UserReview>
            <NewsLetter></NewsLetter>
        </div>
    );
};

export default Home;

