import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RequestPermission from "./pages/requestPermission";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RequestPermission />} />
      </Routes>
    </Router>
  );
}

export default App;
