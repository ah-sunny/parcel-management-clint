import { Helmet } from "react-helmet-async";
import OurFeacture from "./OurFeacture";
import Slider from "./Slider/Slider";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Safety Move | Home</title>
            </Helmet>


            <Slider></Slider>
            <OurFeacture></OurFeacture>
        </div>
    );
};

export default Home;