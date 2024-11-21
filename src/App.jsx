import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import CreatePost from "./CreatePost";
import PostDetails from "./PostDetails";
import EditPost from "./EditPost";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/post/:id" element={<PostDetails />} />
        <Route path="/edit/:id" element={<EditPost />} />
      </Routes>
    </Router>
  );
};

export default App;
