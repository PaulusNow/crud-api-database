import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import { ResepList } from "./components/ResepList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ResepList/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
