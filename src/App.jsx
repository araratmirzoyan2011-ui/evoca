import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Pages/Evoca-main";
import Busines from "./Pages/business-loans";
import Instant from "./Pages/instant-payments";
import About from "./Components/about";
function App() {
  return (
    <BrowserRouter>
      <div className="content">
        <Routes>=
          <Route path="/" element={<Main />} />
          <Route path="/business-loans" element={<Busines />} />
          <Route path="/instant-payments" element={<Instant />} />
           <Route path="/about" element={<About/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;