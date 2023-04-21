import { Route, Routes } from "react-router";
import Layout from "./Layout/Layout";
import PostPage from "./Pages/PostPage";
import { UserContextProvider } from "./Context/UserContext";
import LoginPage from "./auth/LoginPage";
import RegisterPage from "./auth/RegisterPage";
import CreatePost from "./Pages/CreatePost";
import EditPost from "./Pages/Editpage";
import SinglePage from "./Pages/SinglePage";
function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PostPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<SinglePage />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
