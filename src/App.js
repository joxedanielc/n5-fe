import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RequestPermission from "./pages/requestPermission";
import GetPermissions from "./pages/getPermissions";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GetPermissions />} />
        <Route path="/new-permission" element={<RequestPermission />} />
        <Route path="/edit-permission/:id" element={<RequestPermission />} />
      </Routes>
    </Router>
  );
}

export default App;
