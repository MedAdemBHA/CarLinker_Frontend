import { Link } from 'react-router-dom';

import HeroCar from '@/assets/HeroImages/volkswagen-golf.jpg';

import { AiFillCheckCircle } from 'react-icons/ai';
import { MdOutlineDoubleArrow } from 'react-icons/md';

function Hero(): JSX.Element {
    return (
        <div className="content transform ease-in-out duration-500 pt-7  md:px-5 pb-4 ">
            <div className="w-full md:w-[480px] flex flex-col gap-5 relative z-[5] max-lg:text-center max-lg:mx-auto md-lg:w-3/4">
                <h1 className="font-[600] text-[22px] md:text-[24px]">
                    Start your journey now
                </h1>
                <h1 className="font-[700] text-[40px] leading-[70px] p-2 md:text-[48px] md:leading-[60px] mt-4">
                    Explore <span className="text-accent">unbeatable</span>{' '}
                    deals on used cars
                </h1>
                <p className="font-[400] text-[16px]  p-2text-[#706f7b] md:text-[18px] mt-2">
                    Find your ideal vehicle at incredible prices, with flexible
                    financing options, extended warranties, and added perks.
                    Explore our inventory today!
                </p>
                <div className="flex flex-col md:flex-row gap-6 md:w-full max-lg:mx-auto">
                    <Link
                        to="/ExpoloreCars"
                        className="flex justify-center items-center bg-blue-600 text-white text-[18px] rounded-md font-[700] py-2 px-8"
                    >
                        Buy Now <AiFillCheckCircle />
                    </Link>
                    <Link
                        to="/Contact"
                        className="flex justify-center items-center bg-black text-white text-[18px] rounded-md font-[700] py-4 px-8 mt-4 md:mt-0"
                    >
                        Learn More <MdOutlineDoubleArrow />
                    </Link>
                </div>
            </div>
            <img
                src={HeroCar}
                className="absolute w-full md:w-[60%] right-1 top-[8em] z-[3] max-lg:hidden"
                alt=""
            />
        </div>
    );
}

export default Hero;
