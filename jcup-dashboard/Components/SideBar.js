import { forwardRef } from "react";
import Link from "next/link";
import { HomeIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";

const SideBar = forwardRef(({ showNav }, ref) => {
    const router = useRouter();

    return(
        <div ref={ref} className="fixed w-60 h-full bg-white shadow-sm">
            <div className="flex justify-center mt-6 mb-14">
                <img 
                className="w-32 h-auto" 
                src="/Jcup-Logo.jpg" 
                alt ="company logo" 
                />
            </div>

            <div className="flex flex-col">
                <Link href="/">
                    <div
                        className={'pl-1 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex intems-center transistion-colors ${router.pathname=="/" "bg-orange-100 text-orange-500" : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"}'}
                    >
                        <div className="mr-2">
                            <HomeIcon className="h-5 w-5" />
                        </div>
                        <div>
                            <p>Dashboard</p>
                        </div>
                    </div>
                </Link>
                <Link href="/running-menu">
                    <div
                        className={'pl-1 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex intems-center transistion-colors ${router.pathname=="/running-menu" "bg-orange-100 text-orange-500" : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"}'}
                    >
                        <div className="mr-2">
                            <HomeIcon className="h-5 w-5" />
                        </div>
                        <div>
                            <p>Running Menu</p>
                        </div>
                    </div>
                </Link>
                <Link href="/machine-configuration">
                    <div
                        className={'pl-1 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex intems-center transistion-colors ${router.pathname=="/machine-configuration" "bg-orange-100 text-orange-500" : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"}'}
                    >
                        <div className="mr-2">
                            <HomeIcon className="h-5 w-5" />
                        </div>
                        <div>
                            <p>Machine Configuration</p>
                        </div>
                    </div>
                </Link>
                <Link href="/analytics">
                    <div
                        className={'pl-1 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex intems-center transistion-colors ${router.pathname=="/analytics" "bg-orange-100 text-orange-500" : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"}'}
                    >
                        <div className="mr-2">
                            <HomeIcon className="h-5 w-5" />
                        </div>
                        <div>
                            <p>Analytics</p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}); 

SideBar.displayName = 'SideBar';

export default SideBar;
