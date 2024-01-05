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

    function navigateToSingle(id: Number) {
        navigate("/novels/" + id);
    }

    return (
        <TableContainer component={Paper} className="table">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className="tableCell">Cover</TableCell>
                        <TableCell className="tableCell">Title</TableCell>
                        <TableCell className="tableCell">Tags</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {novels.map((row, index) => (
                        <TableRow key={index} onClick={() => navigateToSingle(row.getId())}>
                            {<TableCell className="tableCell">
                                <div className="cellWrapper">
                                    <img src={"http://127.0.0.1:9000/novels/under%20the%20oak%20tree/cover.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=WQTKPT0IX20D7W5TJ195%2F20231230%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231230T013448Z&X-Amz-Expires=604800&X-Amz-Security-Token=eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NLZXkiOiJXUVRLUFQwSVgyMEQ3VzVUSjE5NSIsImV4cCI6MTcwMzk0MzI4MSwicGFyZW50Ijoicm9vdF91c2VyIn0.lGPXmFrdtWU_-lYDFsxR7xrkHySQMcNSete4A4e4KMdB4zwdXQG80frVjreQRgRLvffQu2R_vXhx7Av0Jur9_g&X-Amz-SignedHeaders=host&versionId=null&X-Amz-Signature=a9a8b774328a9facd6ce4b3275b22435efdeb526f6717edd26a292864b503622"} alt="" className="image" />
                                </div>
                            </TableCell>}
                            <TableCell className="tableCell">{row.getTitle()}</TableCell>
                            <TableCell className="tableCell">{row.getTagsList().toString()}</TableCell>
                            {/* <TableCell className="tableCell">
                                <div className="cellWrapper">
                                    <img src={row.img} alt="" className="image" />
                                    {row.product}
                                </div>
                            </TableCell> */}
                            {/* <TableCell className="tableCell">{row.getAuthor()}</TableCell>
                            <TableCell className="tableCell">{row.getChapter()}</TableCell>
                            <TableCell className="tableCell">{row.getDescription()}</TableCell> */}
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