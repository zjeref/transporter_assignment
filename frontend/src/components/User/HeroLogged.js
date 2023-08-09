import React, { useContext, useRef, useEffect } from 'react'
import Lottie from 'lottie-web';

import { GlobalState } from '../../middlewares/global-states'
const animationData = require('../../assets/hero.json');

const Hero = () => {
    const { dispatch } = useContext(GlobalState);

    const heroContainer = useRef(null);

    useEffect(() => {
        const anim = Lottie.loadAnimation({
            container: heroContainer.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: animationData
        });

        return () => {
            anim.destroy();
        };
    }, []);

    //opens sign up modal
    const openBookingModal = () => {
        dispatch({ type: "FIRE_MODAL", payload: "BOOKING" })
    }

    return (
        <div className="w-full max-w-6xl flex justify-between items-center p-2 my-20">
            <div className="w-[50%]">
                <h1 className="text-4xl font-bold text-blackk">Find your perfect driver in city</h1>
                <p className="my-8 text-2xl">Safest car driver in Kolkata</p>
                <div className="space-x-4">
                    <button className="btn bg-secondary" onClick={openBookingModal}>Book Now</button>
                </div>
            </div>
            <div className="max-w-sm w-fit h-fit" ref={heroContainer} key="hero-animation">
                    </div>
        </div>
    )
}

export default Hero