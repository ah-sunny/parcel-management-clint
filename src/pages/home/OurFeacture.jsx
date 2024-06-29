import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Helmet } from "react-helmet-async";
import icon1 from "../../assets/services/ics1.svg";
import icon2 from "../../assets/services/ics2.svg";
import icon3 from "../../assets/services/ics3.svg";
import img1 from "../../assets/services/sv1.webp";
import img2 from "../../assets/services/sv2.webp";
import img3 from "../../assets/services/sv3.webp";



const OurFeacture = () => {
    return (
        <div className="mt-24 mb-10">

            <Helmet>
                <title>Safety Move | Feactures</title>
            </Helmet>

            <h1 className="text-xl lg:text-4xl font-bold text-center py-5 border-y-2 border-dashed"> Wide Variety of Logistics Services</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-16 w-full lg:w-[80%] mx-auto ">

                {/*  */}
                <div>
                    <Card className="shadow-2xl">
                        <CardHeader>
                            <img className="h-52 rounded-xl" src={img1} alt="" />

                        </CardHeader>
                        <CardContent>
                            <img className=" py-5 px-2 mb-2 rounded-full border-2 border-gray-500" src={icon1} alt="" />
                            <CardTitle className="font-bold italic"> Maritime Transportation </CardTitle>

                        </CardContent>
                        <CardFooter className="flex flex-col" >
                            <p className="text-sm font-semibold text-gray-600"> We believe in we can save deliver your product save and fast... <br />
                                Stay With Us </p>

                            <p className="text-sm font-medium  text-left w-full mt-1 ">see more...</p>
                        </CardFooter>
                    </Card>

                </div>

                {/*  */}
                <div>
                    <Card className="shadow-2xl">
                        <CardHeader>
                            <img className="h-52 rounded-xl" src={img2} alt="" />

                        </CardHeader>
                        <CardContent>
                            <img className=" py-5 px-2 mb-2 rounded-full border-2 border-gray-500" src={icon2} alt="" />
                            <CardTitle className="font-bold italic ">Land-Freight Transport </CardTitle>

                        </CardContent>
                        <CardFooter className="flex flex-col">
                            <p className="text-sm font-semibold text-gray-600"> We believe in we can save deliver your product save and fast... <br />
                                Stay With Us </p>
                            <p className="text-sm font-medium  text-left w-full mt-1 ">see more...</p>
                        </CardFooter>
                    </Card>

                </div>

                {/*  */}
                <div>
                    <Card className="shadow-2xl">
                        <CardHeader>
                            <img className="h-52 rounded-xl" src={img3} alt="" />

                        </CardHeader>
                        <CardContent>
                            <img className=" py-5 px-2 mb-2 rounded-full border-2 border-gray-500" src={icon3} alt="" />
                            <CardTitle className="font-bold italic"> Intermodal Shipping</CardTitle>

                        </CardContent>
                        <CardFooter className="flex flex-col" >
                            <p className="text-sm font-semibold text-gray-600"> We believe in we can save deliver your product save and fast... <br />
                                Stay With Us </p>
                            <p className="text-sm font-medium  text-left w-full mt-1 ">see more...</p>
                        </CardFooter>
                    </Card>

                </div>


            </div>


        </div>
    );
};

export default OurFeacture;