import "./navbar.scss";
import * as React from 'react';

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import TravelExplore from "@mui/icons-material/TravelExplore";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { useState, useId, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

import { RpcError } from "grpc-web";
import { NovelServerClient } from "./../../grpc/NovelServiceClientPb";
import { RequestNovelRequest, RequestNovelResponse } from "./../../grpc/novel_pb"

const snackbarDisplayTime = 2000; // 2 second
const client = new NovelServerClient("http://localhost:8080", null, null);

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Navbar = () => {
    const [successScrapeModal, setSuccessScrapeModal] = useState(false);
    const [errorScrapeModal, setErrorScrapeModal] = useState(false);
    const [request, setRequest] = useState("");
    const [search, setSearch] = useState("");
    const id = useId();
    const navigate = useNavigate();
    const handleCloseError = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setErrorScrapeModal(false);
    };
    const handleCloseSuccess = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccessScrapeModal(false);
    };

    function navigateToList(novelName: String) {
        if (novelName.length > 0) {
            navigate("/search/" + novelName);
        }
    }
    function requestNovel(novelName: string) {
        const req = new RequestNovelRequest();
        req.setTitle(novelName);

        client.requestNovel(req, null, (err: RpcError, response: RequestNovelResponse) => {
            if (err) {
                setErrorScrapeModal(true);
                console.error(err);
                return;
            }
            if (response.getSuccess()) {
                setSuccessScrapeModal(true)
            } else {
                setErrorScrapeModal(true);
            }
        });
    }

    return (
        <div className="navbar">
            <Snackbar open={errorScrapeModal} autoHideDuration={snackbarDisplayTime} onClose={handleCloseError}>
                <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
                    Failed to find requested novel
                </Alert>
            </Snackbar>
            <Snackbar open={successScrapeModal} autoHideDuration={snackbarDisplayTime} onClose={handleCloseSuccess}>
                <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
                    Failed to find requested novel
                </Alert>
            </Snackbar>
            <div className="wrapper">
                <div className="searchs">
                    <div className="search" onKeyDown={(e) => { if (e.key == "Enter") { navigateToList(search) } }}>
                        <input type="text" placeholder="Search..." id={id} value={search} onChange={(e) => (setSearch(e.target.value))} />
                        <SearchOutlinedIcon onClick={() => navigateToList(search)} />
                    </div>
                    <div className="search" onKeyDown={(e) => { if (e.key == "Enter") { requestNovel(request) } }}>
                        <input type="text" placeholder="Request..." id={id} value={request} onChange={(e) => (setRequest(e.target.value))} />
                        <TravelExplore onClick={() => requestNovel(request)} />
                    </div>
                </div>
                <div className="items">
                    <div className="item">
                        <DarkModeOutlinedIcon
                            className="icon"
                        />
                    </div>
                    <div className="item">
                        <img
                            src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                            alt=""
                            className="avatar"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;