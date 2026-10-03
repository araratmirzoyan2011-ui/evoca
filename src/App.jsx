import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Pages/Evoca-main";
import Busines from "./Pages/business-loans";
import Instant from "./Pages/instant-payments";
import About from "./Pages/about";
import Structure from "./Pages/structure";
import Managment from "./Pages/management";
import Sarheholder from "./Pages/shareholders";
import Parthner from "./Pages/partners";
import Group from "./Pages/evoca-group";
import Departments from "./Pages/departments";
function App() {
  return (
    <BrowserRouter>
      <div className="content">
        <Routes>=
          <Route path="/" element={<Main />} />
          <Route path="/business-loans" element={<Busines />} />
          <Route path="/instant-payments" element={<Instant />} />
          <Route path="/management" element={<Managment/>} />
          <Route path="/structure" element={<Structure />} />
          <Route path="/shareholders" element={<Sarheholder />} />
          <Route path="/evoca-group" element={<Group />} />
          <Route path="/about" element={<About/>} />
          <Route path="/departments" element={<Departments/>} />
          <Route path="/partners" element={<Parthner/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;