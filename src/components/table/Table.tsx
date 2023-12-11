import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { RpcError } from "grpc-web";
import { NovelServerClient } from "./../../grpc/NovelServiceClientPb";
import { ListNovelRequest, ListNovelResponse, NovelData } from "./../../grpc/novel_pb"

const client = new NovelServerClient("http://localhost:8080", null, null);

const GenericTable = (novels: Array<NovelData>) => {
    const navigate = useNavigate();

    function navigateToSingle(title: String) {
        navigate("/novels/" + title);
    }

    return (
        <TableContainer component={Paper} className="table">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className="tableCell">Title</TableCell>
                        <TableCell className="tableCell">Author</TableCell>
                        <TableCell className="tableCell">Chapters</TableCell>
                        <TableCell className="tableCell">Description</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {novels.map((row, index) => (
                        <TableRow key={index} onClick={() => navigateToSingle("1")}>
                            <TableCell className="tableCell">{row.getTitle()}</TableCell>
                            {/* <TableCell className="tableCell">
                                <div className="cellWrapper">
                                    <img src={row.img} alt="" className="image" />
                                    {row.product}
                                </div>
                            </TableCell> */}
                            <TableCell className="tableCell">{row.getAuthor()}</TableCell>
                            <TableCell className="tableCell">{row.getChapter()}</TableCell>
                            <TableCell className="tableCell">{row.getDescription()}</TableCell>
                            {/* <TableCell className="tableCell">
                                <span className={`status ${row.status}`}>{row.status}</span>
                            </TableCell> */}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export const NewestNovelTable = () => {
    const [novels, setNovels] = useState<Array<NovelData>>([]);

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
    const [novels, setNovels] = useState<Array<NovelData>>([]);

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