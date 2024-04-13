import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { RpcError } from "grpc-web";
import { NovelServerClient } from "./../../grpc/NovelServiceClientPb";
import { ListNovelRequest, ListNovelResponse, PartialNovel } from "./../../grpc/novel_pb"

const client = new NovelServerClient("http://localhost:8080", null, null);

const GenericTable = (novels: Array<PartialNovel>) => {
    const navigate = useNavigate();

    function navigateToSingle(id: String) {
        console.log(id)
        navigate("/novels/" + id);
    }

    return (
        <TableContainer component={Paper} className="table">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className="tableCell">Cover</TableCell>
                        <TableCell className="tableCell">Title</TableCell>
                        <TableCell className="tableCell">Genre</TableCell>
                        <TableCell className="tableCell">Athor</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {novels.map((row, index) => (
                        <TableRow key={index} onClick={() => navigateToSingle(row.getId())}>
                            {<TableCell className="tableCell">
                                <div className="cellWrapper">
                                    <img src={row.getCoverurl()} alt="" className="image" />
                                </div>
                            </TableCell>}
                            <TableCell className="tableCell">{row.getTitle()}</TableCell>
                            <TableCell className="tableCell">{row.getGenresList().toString().replaceAll(',', ' ')}</TableCell>
                            <TableCell className="tableCell">{row.getAuthor()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export const NewestNovelTable = () => {
    const [novels, setNovels] = useState<Array<PartialNovel>>([]);

    useEffect(() => {
        const req = new ListNovelRequest();
        client.listNovel(req, null, (err: RpcError, response: ListNovelResponse) => {
            if (err) {
                console.error(err);
                return;
            }
            setNovels(response.getNovelsList());
        });
    }, [])

    return GenericTable(novels);
};

export const NovelTable = (props: { min: Number, max: number }) => {
    const [novels, setNovels] = useState<Array<PartialNovel>>([]);

    useEffect(() => {
        const req = new ListNovelRequest();
        client.listNovel(req, null, (err: RpcError, response: ListNovelResponse) => {
            if (err) {
                console.error(err);
                return;
            }
            setNovels(response.getNovelsList());
        });
    }, [])

    return GenericTable(novels);
};