import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import { NovelTable } from "../../components/table/Table"

const List = () => {
    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <NovelTable {...{ min: 1, max: 10 }} />
            </div>
        </div>
    )
}

export default List