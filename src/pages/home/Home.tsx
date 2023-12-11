import "./home.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import { NewestNovelTable } from "../../components/table/Table";
import React from "react";

const Home: React.FC<{}> = () => {
    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="widgets">
                    <Widget type="user" />
                    <Widget type="order" />
                    <Widget type="earning" />
                    <Widget type="balance" />
                </div>
                <div className="listContainer">
                    <div className="listTitle">Lastest update</div>
                    <NewestNovelTable />
                </div>
            </div>
        </div>
    );
};

export default Home;