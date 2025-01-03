import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import { ResepList } from "./components/ResepList";
import { AddResep } from "./components/AddResep";
import { EditResep } from "./components/EditResep";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ResepList/>}/>
        <Route path="tambah" element={<AddResep/>}/>
        <Route path="edit/:id" element={<EditResep/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
