import { Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import NewsFeed from "./Components/Posts/NewsFeed";
import YourPost from "./Components/Posts/YourPost";
import AddPost from "./Components/Posts/AddPost";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/newsfeed" element={<NewsFeed />} />
        <Route exact path="/yourpost" element={<YourPost />} />
        <Route exact path="/addpost" element={<AddPost />} />
      </Routes>
    </>
  );
}

export default App;
