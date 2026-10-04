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
import Csr from "./Pages/csr";
import News from "./Pages/news";
import Blog from "./Pages/blog";
import Career from "./Pages/career";
import Plus from "./Pages/plus";
import EvocaWork from "./Pages/evocawork";
import Answer from "./Pages/answers";
function App() {
  return (
    <BrowserRouter>
      <div className="content">
        <Routes>=
          <Route path="/" element={<Main />} />
          <Route path="/business-loans" element={<Busines />} />
          <Route path="/instant-payments" element={<Instant />} />
          <Route path="blog" element={<Blog />} />
          <Route path="evocawork" element={<EvocaWork />} />
          <Route path="answers" element={<Answer />} /> 
          <Route path="plus" element={<Plus/>} />
          <Route path="/management" element={<Managment/>} />
          <Route path="/structure" element={<Structure />} />
          <Route path="/shareholders" element={<Sarheholder />} />
          <Route path="/evoca-group" element={<Group />} />
          <Route path="/about" element={<About/>} />
          <Route path="/csr" element={<Csr/>} />
          <Route path="/departments" element={<Departments/>} />
          <Route path="/partners" element={<Parthner/>} />
          <Route path="/news" element={<News/>} />
          <Route path="/career" element={<Career/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;