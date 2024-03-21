import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Authstate from "./context/authorization/Authstate";
import Signup from "./components/Signup";
import Chatbot from "./components/Chatbot";
import ChatViewer from "./components/ChatViewer";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          exact
          path="/login"
          element={
            <Authstate>
              <Login />
            </Authstate>
          }
        />
        <Route
          exact
          path="/signup"
          element={
            <Authstate>
              <Signup />
            </Authstate>
          }
        />
        <Route exact path="/chatbot" element = {<Chatbot/>}/>
        <Route exact path="/chatbot/:id" element = {<ChatViewer/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
