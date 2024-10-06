import { Chapter, GetBookRequest, PartialNovel, FullNovel, GetBookResponse } from "../../grpc/novel_pb";
import { Grid } from "@mui/material";
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { RpcError } from "grpc-web";
import { NovelServerClient } from "./../../grpc/NovelServiceClientPb";

const client = new NovelServerClient("http://localhost:8080", null, null);

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '90%',
  maxHeight: '100%',
});

function addLeading0(value: number) {
  let num = value.toString();
  while (num.length < 4)
    num = "0" + num;
  return num;
}

// function concatArray(left: Uint8Array, rigth: Uint8Array) {
//     let merge = new Uint8Array(left.length + rigth.length);
//     merge.set(left, 0);
//     merge.set(rigth, left.length);
//     return merge;
// }

function getBook(novel: FullNovel, chapter: Chapter) {
  // From stream to request
  // function getBook() {
  //     return new Promise<Uint8Array>((resolve, reject) => {
  //         const req = new GetBookRequest();
  //         req.setNovelid(String(novel.getNovel()?.getId()));
  //         req.setChapter(chapter);

  //         var bytes = new Uint8Array();
  //         const stream = client.getBook(req);
  //         stream.on("data", (book) => (bytes = concatArray(bytes, book.getChunk_asU8())));
  //         stream.on("error", reject);
  //         stream.on("end", () => resolve(bytes));
  //     });
  // }

  // getBook().then((bytes) => {
  //     var data = new Blob(([bytes]), { type: 'application/epub+zip' });
  //     var bookUrl = window.URL.createObjectURL(data);
  //     const tempLink = document.createElement('a');
  //     tempLink.href = bookUrl;
  //     tempLink.setAttribute('download', novel.getNovel()?.getTitle() + '-' + chapter.getStart() + '-' + chapter.getEnd() + '.epub');

  //     console.log(novel.getNovel()?.getTitle() + '-' + chapter.getStart() + '-' + chapter.getEnd() + '.epub')

  //     tempLink.click();
  // });


  const req = new GetBookRequest();
  req.setNovelid(String(novel.getNovel()?.getId()));
  req.setChapter(chapter);

  client.getBook(req, null, (err: RpcError, response: GetBookResponse) => {
    if (err) {
      console.error(err);
      return;
    }
    var data = new Blob(([response.getContent_asU8()]), { type: 'application/epub+zip' });
    var bookUrl = window.URL.createObjectURL(data);
    const tempLink = document.createElement('a');
    tempLink.href = bookUrl;
    tempLink.setAttribute('download', novel.getNovel()?.getTitle() + '-' + addLeading0(chapter.getStart()) + '-' + addLeading0(chapter.getEnd()) + '.epub');

    console.log(novel.getNovel()?.getTitle() + '-' + chapter.getStart() + '-' + chapter.getEnd() + '.epub')

    tempLink.click();
  });
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  color: theme.palette.text.primary,
}));

export const CardBookTable = (props: { novel: FullNovel, chapters: Array<Chapter> }) => {
  return (
    <Grid container>
      {props.chapters.map((chapter, index) => (
        <Grid item key={index} xs={12} sm={12} md={6} lg={4} xl={3} container>
          <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
            <StyledPaper elevation={4}
              sx={{
                my: 1,
                mx: 'auto',
                p: 2,
              }}
            >
              <Grid item xs container>
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
            </StyledPaper>
          </Box>
        </Grid>
      ))}
    </Grid>
  )
}

export const CardNovelTable = (props: { novels: Array<PartialNovel> }) => {
  const navigate = useNavigate();

  function navigateToSingle(id: string) {
    navigate("/novels/" + id);
  }

  return (
    <Grid container>
      {props.novels.map((novel, index) => (
        <Grid item key={index} xs={12} sm={12} md={6} lg={4} xl={3} container>
          <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
            <StyledPaper elevation={4}
              sx={{
                my: 1,
                mx: 'auto',
                p: 2,
              }}
            >
              <Grid container onClick={() => navigateToSingle(novel.getId())} >
                <Grid xs={6} item>
                  <Typography gutterBottom variant="subtitle1" component="div">
                    {novel.getTitle().substring(0, 20)}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2" component="div">
                    {novel.getAuthor().substring(0, 20)}
                  </Typography>
                  <Typography gutterBottom variant="caption" component="div">
                    {novel.getSummary().substring(0, 200)}
                  </Typography>
                </Grid>
                <Grid xs={6} item>
                  <Img src={novel.getCoverurl()} alt="" />
                </Grid>
              </Grid>
            </StyledPaper>
          </Box>
        </Grid>
      ))}
    </Grid>
  )
}
