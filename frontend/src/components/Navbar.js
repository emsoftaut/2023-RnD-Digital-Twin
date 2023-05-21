import styles from "./style.module.css";
import { FaUserCircle as AccIcon } from "react-icons/fa"

const Navbar = () => {
    return (
        <div>
            <nav className={styles.navbar}>
                <div className={styles.navElement}>
                    <img src="./logo-1.png" alt="adas" width={50} />
                </div>
                <div className={styles.navElement}>
                    <button className={styles.userbutton}><AccIcon width={50} height={50} /></button>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;