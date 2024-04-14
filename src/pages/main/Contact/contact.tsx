import { BiSolidMapAlt } from 'react-icons/bi';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { GrSend } from 'react-icons/gr';
import { ImMail3 } from 'react-icons/im';

function Contact(): JSX.Element {
    return (
        <div className="content ml-12 transform ease-in-out duration-500 pt-15 px-2 md:px-5 pb-4">
            <div className="relative top-[-50px] z-[4] h-[200px] w-[100vw]">
                <h1 className="absolute z-[5] top-0 flex flex-col max-lg:text-center justify-center px-[67px] text-black font-[700] text-[38px]  h-full w-full">
                    Contact
                    <span className="font-[400] text-[16px]">Home/Contact</span>
                </h1>
                <h1 className="absolute z-[3] top-0  opacity-[90%] text-black font-[700] text-[48px] text-center h-full w-full"></h1>
            </div>

            <div className="flex justify-between gap-5 mx-auto w-[75%] max-lg:flex-col mb-24 relative">
                {/* Info Section */}
                <div className="w-[40%] max-lg:w-full flex flex-col gap-9 relative z-[4]">
                    <h1 className="font-[700] text-[38px] max-lg:text-center">
                        Need additional information?
                    </h1>
                    <p className="font-[400] text-darkish max-lg:text-center">
                        An enthusiastic software engineering student with a
                        knack for learning and a passion for development. Ready
                        to apply my skills and knowledge to tackle new
                        challenges in the field.
                    </p>
                    <div className="flex flex-col gap-3 relative z-[2]">
                        <span className="flex items-center">
                            {' '}
                            <BsFillTelephoneFill className="mr-2" /> +216
                            53378471{' '}
                        </span>
                        <span className="flex items-center">
                            {' '}
                            <ImMail3 className="mr-2" />{' '}
                            MohamedAdemBelHadjAmor@gmail.com{' '}
                        </span>
                        <span className="flex items-center">
                            {' '}
                            <BiSolidMapAlt className="mr-2" /> Tunisia{' '}
                        </span>
                    </div>
                </div>

                {/* Form section */}
                <div className="relative w-[45%] max-lg:w-full z-[2]">
                    <div>
                        <h1 className="font-[600] mb-[26px] text-[18px]">
                            Full Name
                        </h1>
                        <input
                            className="p-[13px] py-[15px] w-full focus:outline-none bg-[#E9E9E9]"
                            type="text"
                            placeholder='"Mohamed Adem Bel Hadj Amor"'
                        />
                    </div>
                    <div>
                        <h1 className="font-[600] py-5 text-[18px]">Email</h1>
                        <input
                            className="p-[13px] py-[15px] w-full focus:outline-none bg-[#E9E9E9]"
                            type="text"
                            placeholder='EG: "MohamedAdemBelHadjAmor@gmail.com'
                        />
                    </div>
                    <div>
                        <h1 className="font-[600] py-5 text-[18px]">
                            Compose text
                        </h1>
                        <textarea
                            placeholder="Write here ..."
                            className="p-[13px] py-[15px] w-full focus:outline-none bg-[#E9E9E9]"
                            name=""
                            id=""
                            cols={30}
                            rows={6}
                        ></textarea>
                    </div>
                    <button className="bg-accent py-3 w-full font-[700] text-[18px] bg-blue-800 flex items-center justify-center text-white">
                        {' '}
                        <GrSend className="mr-4 text-white " /> Send Message
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Contact;
