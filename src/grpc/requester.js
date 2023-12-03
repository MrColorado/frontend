import { useEffect } from "react";
import { ListNovelRequest } from "./novel_pb.js"

export default function NovelService({ client }) {
    useEffect(() => {
        const req = new ListNovelRequest();
        client.listNovel(req, null, (err, response) => {
            if (err) {
                console.log("err");
                console.log(err);
            }
            let bookList = response?.getNovelsList() || [];
            bookList.forEach(element => {
                console.log("Title : " + element.getTitle() + "\n");
                console.log("Description : " + element.getDescription() + "\n");
                console.log("Author : " + element.getAuthor() + "\n");
                console.log("Chapter : " + element.getChapter() + "\n");
                console.log("\n\n");
            });
        });
    })
}
