import AllItems from "./components/items/AllItems";
import Header from "./components/global/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateItem from "../src/components/createItem/CreateItem";
import EditItem from "./components/editItem/EditItem";
import Login from "./components/authenticate/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Header /> */}
        <Routes>
          <Route path="/allitem" element={<AllItems />} />
          <Route path="/" element={<Login />} />
          <Route path="/addItem" element={<CreateItem />} />
          <Route path="/:id" element={<EditItem />} />
        </Routes>
      </BrowserRouter>
      {/* <Header />
      <AllItems /> */}
    </>
  );
}

export default App;
