import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginReg from "./pages/LoginReg";
import ErrorPage from "./pages/Error";
import GetCode from "./pages/GetCode";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginReg />} />
          <Route path="/getcode" element={<GetCode />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
