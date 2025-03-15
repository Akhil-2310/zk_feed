import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import GenerateIdentity from "./pages/GenerateIdentity";
import CreateGroup from "./pages/CreateGroup";
import AllGroups from "./pages/AllGroups";
import ViewGroup from "./pages/ViewGroup";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/generate-identity" element={<GenerateIdentity />} />
          <Route path="/create-group" element={<CreateGroup />} />
          <Route path="/all-groups" element={<AllGroups />} />
          <Route path="/view-group/:id" element={<ViewGroup />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
