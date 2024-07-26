
import "./App.css";
import FormEditStudent from "./components/student/FormEditStudent";
import FormStudent from "./components/student/FormStudent";
import TableStudent from "./components/student/TableStudent";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <h1 className="text-center">RESTful Consumer - ReactJS</h1>
      <hr />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<TableStudent/>}></Route>
          <Route path='create' element={<FormStudent/>}></Route>
          <Route path='update/:id' element={<FormEditStudent/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
