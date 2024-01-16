import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Search from "./pages/search/Search";
import Single from "./pages/single/Single";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { DarkContext } from "./context/darkModeContext";
import "./style/dark.scss";

function App(): JSX.Element {
  const { darkTheme, setDarkTheme } = useContext(DarkContext);
  return (
    <div className={darkTheme ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/" >
            <Route index element={< Home />} />
            <Route path="novels">
              <Route element={<List />} />
              <Route path=":novelId" element={<Single />} />
            </Route>
            <Route path="search">
              <Route path=":novelName" element={<Search />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;