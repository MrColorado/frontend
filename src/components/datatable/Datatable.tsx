import "./datatable.scss";
import { DataGrid, GridRenderCellParams, GridRowsProp, GridColDef } from "@mui/x-data-grid";
// import { userColumns, userRows, IUserColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { Pagination } from "@mui/material";
import React, { useState, useEffect } from 'react';


import { RpcError } from "grpc-web";
import { NovelServerClient } from "./../../grpc/NovelServiceClientPb";
import { ListNovelRequest, ListNovelResponse, PartialNovel } from "./../../grpc/novel_pb"


const rows: GridRowsProp = [
    {
        id: 1,
        username: "Snow",
        img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
        status: "active",
        email: "1snow@gmail.com",
        age: 35,
    },
    {
        id: 2,
        username: "Jamie Lannister",
        img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
        email: "2snow@gmail.com",
        status: "passive",
        age: 42,
    },
    {
        id: 3,
        username: "Lannister",
        img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
        email: "3snow@gmail.com",
        status: "pending",
        age: 45,
    },
    {
        id: 4,
        username: "Stark",
        img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
        email: "4snow@gmail.com",
        status: "active",
        age: 16,
    },
    {
        id: 5,
        username: "Targaryen",
        img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
        email: "5snow@gmail.com",
        status: "passive",
        age: 22,
    },
    {
        id: 6,
        username: "Melisandre",
        img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
        email: "6snow@gmail.com",
        status: "active",
        age: 15,
    },
    {
        id: 7,
        username: "Clifford",
        img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
        email: "7snow@gmail.com",
        status: "passive",
        age: 44,
    },
    {
        id: 8,
        username: "Frances",
        img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
        email: "8snow@gmail.com",
        status: "active",
        age: 36,
    },
    {
        id: 9,
        username: "Roxie",
        img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
        email: "snow@gmail.com",
        status: "pending",
        age: 65,
    },
    {
        id: 10,
        username: "Roxie",
        img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
        email: "snow@gmail.com",
        status: "active",
        age: 65,
    },
];

const columns: GridColDef[] = [
    {
        field: "id",
        headerName: "ID",
        width: 70,
    },
    {
        field: "username",
        headerName: "User",
        width: 230,
        renderCell: (params) => {
            return (
                <div className="cellWithImg">
                    <img className="cellImg" src={params.row.img} alt="avatar" />
                    {params.row.username}
                </div>
            );
        },
    },
    {
        field: "email",
        headerName: "Email",
        width: 230,
    },
    {
        field: "age",
        headerName: "Age",
        width: 100,
    },
    {
        field: "status",
        headerName: "Status",
        width: 160,
        renderCell: (params) => {
            return (
                <div className={`cellWithStatus ${params.row.status}`}>
                    {params.row.status}
                </div>
            );
        },
    },
];

const client = new NovelServerClient("http://localhost:8080", null, null);


const Datatable = () => {
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

    // const actionColumn = [
    //     {
    //         field: "action",
    //         headerName: "Action",
    //         width: 200,
    //         renderCell: (params: GridRenderCellParams<any>) => {
    //             return (
    //                 <div className="cellAction">
    //                     <Link to="/users/test" style={{ textDecoration: "none" }}>
    //                         <div className="viewButton">View</div>
    //                     </Link>
    //                 </div>
    //             );
    //         },
    //     },
    // ];
    return (
        <div className="datatable">
            <div className="datatableTitle">
                Add New User
                <Link to="/users/new" className="link">
                    Add New
                </Link>
            </div>
            <DataGrid
                className="datagrid"
                rows={rows}
                // columns={columns.concat(actionColumn)}
                columns={columns}
                checkboxSelection
                initialState={{
                    pagination: { paginationModel: { pageSize: 5 } },
                }}
                pageSizeOptions={[5, 10, 25]}
            />
        </div>
    );
};

export default Datatable;