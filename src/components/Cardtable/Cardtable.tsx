import { Chapter, GetBookRequest, PartialNovel } from "../../grpc/novel_pb";
import { Grid } from "@mui/material";
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { NovelServerClient } from "./../../grpc/NovelServiceClientPb";


const client = new NovelServerClient("http://localhost:8080", null, null);

function addLeading0(value: number) {
    let num = value.toString();
    while (num.length < 3)
        num = "0" + num;
    return num;
}

function concatArray(left: Uint8Array, rigth: Uint8Array) {
    let merge = new Uint8Array(left.length + rigth.length);
    merge.set(left, 0);
    merge.set(rigth, left.length);
    return merge;
}

function getBook(novel: PartialNovel, chapter: Chapter) {
    function getBook() {
        return new Promise<Uint8Array>((resolve, reject) => {
            const req = new GetBookRequest();
            req.setNovelid(novel.getId());
            req.setChapter(chapter);


            var bytes = new Uint8Array();
            const stream = client.getBook(req);
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
        tempLink.setAttribute('download', novel.getTitle() + '-' + chapter.getStart() + '-' + chapter.getEnd() + '.epub');
        tempLink.click();
    });
}

const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    maxWidth: 300,
    color: theme.palette.text.primary,
}));

export const Cardtable = (props: { novel: PartialNovel, chapters: Array<Chapter> }) => {
    return (
        <Grid container>
            {props.chapters.map((chapter, index) => (
                <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
                    <StyledPaper elevation={4}
                        sx={{
                            my: 1,
                            mx: 'auto',
                            p: 2,
                            width: "90%"
                        }}
                    >
                        <Grid item key={index} container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1" component="div">
                                        Book : {index}
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        Start : {addLeading0(chapter.getStart())} End : {addLeading0(chapter.getEnd())}
                                    </Typography>
                                </Grid>
                                <Grid item onClick={() => getBook(props.novel, chapter)}>
                                    <Button variant="contained">
                                        Download
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </StyledPaper>
                </Box>
            ))}
        </Grid>
    )
}
