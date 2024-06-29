import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

import img1 from "../../../assets/navbar/img1.jpg";
import img3 from "../../../assets/navbar/img11.avif";
import img2 from "../../../assets/navbar/img3.jpg";
import img4 from "../../../assets/navbar/img9.jpg";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";



const Slider = () => {

    const [sliderRef] = useKeenSlider(
        {
            loop: true,
        },

        [
            (slider) => {
                let timeout
                let mouseOver = false
                function clearNextTimeout() {
                    clearTimeout(timeout)
                }
                function nextTimeout() {
                    clearTimeout(timeout)
                    if (mouseOver) return
                    timeout = setTimeout(() => {
                        slider.next()
                    }, 10000)
                }
                slider.on("created", () => {
                    slider.container.addEventListener("mouseover", () => {
                        mouseOver = true
                        clearNextTimeout()
                    })
                    slider.container.addEventListener("mouseout", () => {
                        mouseOver = false
                        nextTimeout()
                    })
                    nextTimeout()
                })
                slider.on("dragStarted", clearNextTimeout)
                slider.on("animationEnded", nextTimeout)
                slider.on("updated", nextTimeout)
            },
        ]

    )


    return (
        <>
            <div className="navigation-wrapper mt-4">
                <div ref={sliderRef} className="keen-slider h-auto lg:h-[480px]  ">
                    <div className="keen-slider__slide number-slide1 relative">
                        <div className="absolute w-full bg-black rounded-md bg-opacity-20 h-full text-white flex flex-col items-start justify-center pl-2 lg:pl-20 ">
                            <div className="space-y-1 lg:space-y-3 lg:w-[70%]">
                                <h1 className="lg:text-4xl pl-2 capitalize">Integrate your logistics, Accelerate Your Business</h1>
                                <p className="lg:text-4xl bg-slate-700 bg-opacity-55 p-3 rounded-md mt-2 hidden lg:block  ">Break down barries, optimize every touchpoint, and <br />
                                    achieve operational excellence with interconnected expertise.</p>
                                <div className="flex w-full max-w-52 lg:max-w-md items-center space-x-0 ">
                                    <Input className="rounded-r-none text-xs" type="text" placeholder="search" />
                                    <Button className="rounded-l-none text-xs" type="submit">SEARCH</Button>
                                </div>
                            </div>
                        </div>

                        <img className="h-[100%] w-full rounded-md" src={img1} alt="" />
                    </div>


                    {/* 2 */}
                    <div className="keen-slider__slide number-slide2">
                        <div className="absolute w-full bg-black rounded-md bg-opacity-20 h-full text-white flex flex-col items-start justify-center pl-2 lg:pl-20 ">
                            <div className="space-y-1 lg:space-y-3 lg:w-[70%]">
                                <h1 className="lg:text-4xl pl-2 capitalize">Integrate your logistics, Accelerate Your Business</h1>
                                <p className="lg:text-4xl bg-slate-700 bg-opacity-55 p-3 rounded-md mt-2 hidden lg:block  ">Break down barries, optimize every touchpoint, and <br />
                                    achieve operational excellence with interconnected expertise.</p>
                                <div className="flex w-full max-w-52 lg:max-w-md items-center space-x-0 ">
                                    <Input className="rounded-r-none text-xs" type="text" placeholder="search" />
                                    <Button className="rounded-l-none text-xs" type="submit">SEARCH</Button>
                                </div>
                            </div>
                        </div>
                        <img className="h-[100%] w-full rounded-md" src={img2} alt="" />
                    </div>
                    {/* 3 */}
                    <div className="keen-slider__slide number-slide3">
                        <div className="absolute w-full bg-black rounded-md bg-opacity-20 h-full text-white flex flex-col items-start justify-center pl-2 lg:pl-20 ">
                            <div className="space-y-1 lg:space-y-3 lg:w-[70%]">
                                <h1 className="lg:text-4xl pl-2 capitalize">Integrate your logistics, Accelerate Your Business</h1>
                                <p className="lg:text-4xl bg-slate-700 bg-opacity-55 p-3 rounded-md mt-2 hidden lg:block  ">Break down barries, optimize every touchpoint, and <br />
                                    achieve operational excellence with interconnected expertise.</p>
                                <div className="flex w-full max-w-52 lg:max-w-md items-center space-x-0 ">
                                    <Input className="rounded-r-none text-xs" type="text" placeholder="search" />
                                    <Button className="rounded-l-none text-xs" type="submit">SEARCH</Button>
                                </div>
                            </div>
                        </div>
                        <img className="h-[100%] w-full rounded-md" src={img3} alt="" />
                    </div>
                    {/* 4 */}
                    <div className="keen-slider__slide number-slide4">
                        <div className="absolute w-full bg-black rounded-md bg-opacity-20 h-full text-white flex flex-col items-start justify-center pl-2 lg:pl-20 ">
                            <div className="space-y-1 lg:space-y-3 lg:w-[70%]">
                                <h1 className="lg:text-4xl pl-2 capitalize">Integrate your logistics, Accelerate Your Business</h1>
                                <p className="lg:text-4xl bg-slate-700 bg-opacity-55 p-3 rounded-md mt-2 hidden lg:block  ">Break down barries, optimize every touchpoint, and <br />
                                    achieve operational excellence with interconnected expertise.</p>
                                <div className="flex w-full max-w-52 lg:max-w-md items-center space-x-0 ">
                                    <Input className="rounded-r-none text-xs" type="text" placeholder="search" />
                                    <Button className="rounded-l-none text-xs" type="submit">SEARCH</Button>
                                </div>
                            </div>
                        </div>
                        <img className="h-[100%] w-full rounded-md" src={img4} alt="" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Slider;

