import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

import "./App.css";
import ListContacts from "./pages/ListContacts";
import AddEditUser from "./pages/FormContact";
import ContactInfo from "./pages/ContactInfo";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<ListContacts />} />
        <Route path="/add-contact" element={<AddEditUser />} />
        <Route path="/update-contact/:id" element={<AddEditUser />} />
        <Route path="/detail-contact/:id" element={<ContactInfo />} />
      </Routes>
    </div>
  );
}

export default App;
