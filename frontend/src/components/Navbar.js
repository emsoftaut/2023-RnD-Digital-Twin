import React, { useState } from "react";
import styles from "./style.module.css";
import { FaUserCircle } from "react-icons/fa";
import DropdownProfile from "./DropdownProfile";

const Navbar = () => {
    const [openProfile, setOpenProfile] = useState(false);
    return (
        <div>
            <nav className={styles.navbar}>
                <div className={styles.navElement}>
                    <img src="./logo-1.png" alt="adas" width={50} />
                </div>
                <div className={styles.navElement}>
                    <button className={styles.userbutton} onClick={() => setOpenProfile((prev) => (!prev))}><FaUserCircle/></button>
                    {
                        openProfile && ( <DropdownProfile/>)
                    }
                </div>
            </nav>
        </div>
    );
}

export default Navbar;