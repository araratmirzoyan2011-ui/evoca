import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Pages/Evoca-main";

function App() {
  return (
    <BrowserRouter>
      <div className="content">
        <Routes>
          {/* Հեռացրել ենք սխալ <path> թեգը և թողել միայն ճիշտ Route-ը */}
          <Route path="/" element={<Main />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;