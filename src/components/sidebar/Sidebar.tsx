import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { Link } from "react-router-dom";
import { DarkContext } from "../../context/darkModeContext";
import { IModeAction } from "../../context/darkModeReducer";
import { useContext } from "react";

const Sidebar = () => {
    const { darkTheme, setDarkTheme } = useContext(DarkContext);
    return (
        <div className="sidebar">
            <div className="top">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span className="logo">lamadmin</span>
                </Link>
            </div>
            <hr />
            <div className="center">
                <ul>
                    <p className="title">MAIN</p>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <li>
                            <DashboardIcon className="icon" />
                            <span>Dashboard</span>
                        </li>
                    </Link>
                    <p className="title">LISTS</p>
                    <Link to="/novels" style={{ textDecoration: "none" }}>
                        <li>
                            <LibraryBooksIcon className="icon" />
                            <span>Novels</span>
                        </li>
                    </Link>
                </ul>
            </div>
            <div className="bottom">
                <div
                    className="colorOption"
                // onClick={() => dispatch({ type: "LIGHT" })}
                ></div>
                <div
                    className="colorOption"
                // onClick={() => dispatch({ type: "DARK" })}
                ></div>
            </div>
        </div>
    );
};

export default Sidebar;