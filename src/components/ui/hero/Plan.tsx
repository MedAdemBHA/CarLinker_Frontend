import React from 'react';

import img1 from '@/assets/CompIntroImages/buy_sell_car.png';
import img2 from '@/assets/CompIntroImages/expert.png';
import img3 from '@/assets/CompIntroImages/search_deal.png';

interface CardProps {
    description: string;
    title: string;
    img: string;
}

const Card: React.FC<CardProps> = ({ description, title, img }) => {
    return (
        <div className="text-center flex flex-col gap-4 md-lg:w-[60%] max-lg:mx-auto">
            <img className="mx-auto h-[140px]" src={img} alt="" />
            <h1 className="font-[700] text-[22px]">{title}</h1>
            <p className="font-[400] text-[16px]">{description}</p>
        </div>
    );
};

const BuySellExpertSearch: React.FC = () => {
    const buySellDescription: string =
        "Whether you're looking to buy or sell a used car, we've got you covered. Explore our extensive inventory and hassle-free selling process to find or sell your perfect vehicle.";
    const expertDescription: string =
        "Get expert advice from our team of professionals. Whether you need help selling or buying a car, we're here to assist you every step of the way.";
    const searchDescription: string =
        'Search for the best deals on used cars in your area. Our powerful search tool allows you to find the perfect car at the right price.';

    return (
        <div className=" flex flex-col gap-[70px] py-[120px] max-sm:py-[50px] content  transform ease-in-out duration-500  px-2 md:px-5 pb-4">
            <div className="text-center">
                <h1 className="font-[600] text-[22px]">Explore Our Services</h1>
                <h1 className="font-[700] mt-3 text-[48px] max-sm:text-[36px]">
                    Buy, Sell, Expertise & Search
                </h1>
            </div>

            <div className="flex gap-8 max-lg:flex-col text-center">
                <Card
                    title="Buy / Sell Used Car"
                    description={buySellDescription}
                    img={img1}
                />
                <Card
                    title="Get User Expertise"
                    description={expertDescription}
                    img={img2}
                />
                <Card
                    title="Search for Best Deal"
                    description={searchDescription}
                    img={img3}
                />
            </div>
        </div>
    );
};

export default BuySellExpertSearch;
