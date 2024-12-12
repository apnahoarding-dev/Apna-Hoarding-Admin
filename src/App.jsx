import AllItems from "./components/items/AllItems";
import Header from "./components/global/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateItem from "../src/components/createItem/CreateItem";
import EditItem from "./components/editItem/EditItem";
import Login from "./components/authenticate/Login";
import Orders from "./components/orders/Orders";
import Messages from "./components/messages/Messages";
import OrderDetails from "./components/orders/OrderDetails";

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Header /> */}
        <Routes>
          <Route path="/allitem" element={<AllItems />} />
          <Route path="/" element={<Login />} />
          <Route path="/addItem" element={<CreateItem />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/order/:id" element={<OrderDetails />} />
          <Route path="/:id" element={<EditItem />} />
        </Routes>
      </BrowserRouter>
      {/* <Header />
      <AllItems /> */}
    </>
  );
}

export default App;
