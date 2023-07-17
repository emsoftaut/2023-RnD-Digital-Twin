import React, { useContext } from "react";
import styles from "./style.module.css";
import {FaCog, FaInfoCircle, FaSignOutAlt, FaMoon} from "react-icons/fa";
import AuthContext from "./AuthContext";


const DropdownProfile = () => {

    const { handleLogout } = useContext(AuthContext);
 
    const handleLogoutClick = () =>  {
        handleLogout();
    }
      
        return (
            <div className={styles.dropdownprofile}>
              <ul>
                <li onClick={handleLogoutClick}>
                  <FaSignOutAlt style={{ verticalAlign: "top", display: "inline-block" }} /> Logout
                </li>
                <hr className="solid" style={{ borderTop: "1px solid gray" }} />
                <a href="/">
                  <li>
                    <FaInfoCircle style={{ verticalAlign: "top", display: "inline-block" }} /> Help
                  </li>
                </a>
              </ul>
            </div>
          );
}

export default DropdownProfile;