import { Chapter, GetBookRequest, GetBookResponse } from "../../grpc/novel_pb";
import { Grid } from "@mui/material";
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import { NovelServerClient } from "./../../grpc/NovelServiceClientPb";

const client = new NovelServerClient("http://localhost:8080", null, null);


// const Card = (props: { data: Chapter }) => {
//     return (
//         <span className="title">{props.data.getStart()}</span>
//     )
// }

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export const Cardtable = (props: { novelId: number, chapters: Array<Chapter> }) => {
    function concatArray(left: Uint8Array, rigth: Uint8Array) {
        let merge = new Uint8Array(left.length + rigth.length);
        merge.set(left, 0);
        merge.set(rigth, left.length);
        return merge;
    }

    function getBook(novelId: number, start: number, end: number) {
        function getBook() {
            return new Promise<Uint8Array>((resolve, reject) => {
                const chapter = new Chapter();
                chapter.setStart(start);
                chapter.setEnd(end);
                const req = new GetBookRequest();
                req.setNovelid(novelId);
                req.setChapter(chapter);


                const stream = client.getBook(req);
                var bytes = new Uint8Array();
                stream.on("data", (book) => (bytes = concatArray(bytes, book.getChunk_asU8())));
                stream.on("error", reject);
                stream.on("end", () => resolve(bytes));
            });
        }

        getBook().then((bytes) => {
            var data = new Blob(([bytes]), { type: 'application/epub+zip' });
            var bookUrl = window.URL.createObjectURL(data);
            const tempLink = document.createElement('a');
            tempLink.href = bookUrl;
            tempLink.setAttribute('download', 'filename.epub');
            tempLink.click();
        });
    }

    return (
        <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
            {props.chapters.map((chapter, index) => (
                <Grid item xs={2} sm={4} md={4} key={index}>
                    <Item onClick={() => getBook(props.novelId, chapter.getStart(), chapter.getEnd())}> {chapter.getStart()} + "-" + {chapter.getEnd()} </Item>
                </Grid>
            ))}
        </Grid>
    )
}