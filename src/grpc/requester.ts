import { useEffect } from "react";
import { ListNovelRequest, ListNovelResponse, FullNovel } from "./novel_pb.js"
import { NovelServerClient } from "./NovelServiceClientPb.js"
import { RpcError } from "grpc-web";

export function NovelService(client: NovelServerClient) {
    useEffect(() => {
        const req = new ListNovelRequest();
        client.listNovel(req, null, (err: RpcError, response: ListNovelResponse) => {
            if (err) {
                console.log("err");
                console.log(err);
            }
            let bookList = response?.getNovelsList() || [];
            bookList.forEach(element => {
                // console.log("Title : " + element.getTitle() + "\n");
                // console.log("Tags : " + element.getTagsList + "\n");
                // console.log("ImagePath : " + element.getImagepath() + "\n");
                // console.log("Chapter : " + element.getChapter() + "\n");
                // console.log("\n\n");
            });
        });
    })
}
