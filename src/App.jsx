import AllItems from "./components/items/AllItems";
import Header from "./components/global/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateItem from "../src/components/createItem/CreateItem";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          {/* <Route path="/" element={<AllItems />} /> */}
          <Route path="/" element={<AllItems />} />
          <Route path="/addItem" element={<CreateItem />} />
        </Routes>
      </BrowserRouter>
      {/* <Header />
      <AllItems /> */}
    </>
  );
}

export default App;
