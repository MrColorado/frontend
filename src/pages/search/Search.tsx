import "./search.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import { CardNovelTable } from "../../components/Cardtable/Cardtable"
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import { RpcError } from "grpc-web";
import { NovelServerClient } from "./../../grpc/NovelServiceClientPb";
import { ListNovelRequest, ListNovelResponse, PartialNovel } from "./../../grpc/novel_pb"

const client = new NovelServerClient("http://localhost:8080", null, null);

const Search = () => {
    const { novelName } = useParams();
    console.log(novelName)
    const [novels, setNovels] = useState<Array<PartialNovel>>([]);

    useEffect(() => {
        const req = new ListNovelRequest();
        if (novelName !== undefined) {
            req.setStartby(novelName);
        }

        client.listNovel(req, null, (err: RpcError, response: ListNovelResponse) => {
            if (err) {
                console.error(err);
                return;
            }
            setNovels(response.getNovelsList());
        });
    }, [])

    return (
        <div className="searchPage">
            <Sidebar />
            <div className="searchPageContainer">
                <Navbar />
                <CardNovelTable novels={novels} />
            </div>
        </div>
    )
}

export default Search