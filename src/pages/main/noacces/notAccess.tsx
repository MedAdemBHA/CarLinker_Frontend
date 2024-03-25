import { Link } from 'react-router-dom';

// Make sure to import Link from react-router-dom if you're using it for routing

const NotAccess = () => {
    return (
        <main className=" w-full   flex flex-col justify-center items-center">
            <h1 className="text-6xl font-extrabold  tracking-widest mt-[200px]">
                Access to this
            </h1>
            <h1 className="text-6xl font-extrabold  tracking-widest ">
                page is restricted
            </h1>
            <div className="bg-[#004AAD] text-slate-200 px-2 text-sm rounded rotate-5 absolute">
                Please check with the site admin if you believe this is a
                mistake.
            </div>
            <button className="mt-5">
                <Link
                    to="/"
                    className="relative inline-block text-sm font-medium text-[#004AAD] group active:text-bleu-500 focus:outline-none focus:ring"
                >
                    <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#004AAD] group-hover:translate-y-0 group-hover:translate-x-0"></span>

                    <span className="relative block px-8 py-3 bg-[#1A2238] text-slate-200 border border-current">
                        Go Home
                    </span>
                </Link>
            </button>
        </main>
    );
};

export default NotAccess;
