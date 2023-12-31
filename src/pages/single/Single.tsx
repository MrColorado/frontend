import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Cardtable } from "../../components/Cardtable/Cardtable";
import { useParams } from "react-router-dom";


import React, { useState, useEffect } from 'react';

import { RpcError } from "grpc-web";
import { NovelServerClient } from "./../../grpc/NovelServiceClientPb";
import { GetNovelRequest, GetNovelResponse, FullNovel } from "./../../grpc/novel_pb"

const client = new NovelServerClient("http://localhost:8080", null, null);

const Single = () => {
  const { novelId } = useParams();
  const [novel, setNovel] = useState<FullNovel>();

  useEffect(() => {
    const req = new GetNovelRequest();
    req.setId(Number(novelId));
    client.getNovel(req, null, (err: RpcError, response: GetNovelResponse) => {
      if (err) {
        console.error(err);
        return;
      }
      setNovel(response.getNovel());
      console.log(response.getNovel()?.getChaptersList())
    });
  }, [novelId])

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{novel?.getNovel()?.getTitle()}</h1>
                <div className="detailItem">
                  <span className="itemKey">Author :</span>
                  <span className="itemValue">{novel?.getAuthor()}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Nb Chapter:</span>
                  <span className="itemValue">{novel?.getNbchapter()}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Description:</span>
                  <span className="itemValue">
                    {novel?.getSummary()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {
          novel?.getChaptersList !== undefined ? (
            <div className="bottom">
              <h1 className="title">Chapters</h1>
              <Cardtable novelId={novel.getNovel() === undefined ? 0 : novel.getNovel()!.getId()} chapters={novel?.getChaptersList()}></Cardtable>
            </div>
          ) : (
            <div></div>
          )}
      </div>
    </div >
  );
};

export default Single;
