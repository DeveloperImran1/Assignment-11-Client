import Banner from "../../components/Banner";
import ContactUs from "../ContactUs/ContactUs";
import FeaturedRooms from "../FeaturedRooms/FeaturedRooms";
import NewsLetter from "../NewsLetter/NewsLetter";
import UserReview from "../UserReview/UserReview";
import SatisfiedClients from "./SatisfiedClients"
import SeeAllProperty from "./SeeAllProperty";



const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeaturedRooms></FeaturedRooms>
            <SeeAllProperty></SeeAllProperty>
            <SatisfiedClients></SatisfiedClients>
            <NewsLetter></NewsLetter>
            <ContactUs></ContactUs>
        </div>
    );
};

export default Home;

