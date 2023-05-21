import React from "react";
import styles from "./style.module.css";
import {FaCog} from "react-icons/fa";
import {FaInfoCircle} from "react-icons/fa";
import {FaSignOutAlt} from "react-icons/fa";

const DropdownProfile = () => {
    return (
        <div className={styles.dropdownprofile}>
            <ul>
                <a href="/"><li><FaCog style={{verticalAlign:"top", display:"inline-block"}}/>   Settings</li></a>
                <a href="/"><li><FaInfoCircle style={{verticalAlign:"top", display:"inline-block"}}/>   Help</li></a>
                <hr className="solid" style={{borderTop:"1px solid gray"}}></hr>
                <a href="/"><li><FaSignOutAlt style={{verticalAlign:"top", display:"inline-block"}}/>   Logout</li></a>
            </ul>
        </div>
    );
}

export default DropdownProfile;