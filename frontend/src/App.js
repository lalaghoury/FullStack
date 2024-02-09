import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Homepage from "./Pages/Homepage/Homepage";
import AllRecipesPage from "./Pages/AllRecipesPage/AllRecipesPage";
import Footer from "./components/Footer/Footer";
import CategoriesPage from "./Pages/CategoriesPage/CategoriesPage";
import AddRecipePage from "./Pages/AddRecipePage/AddRecipePage";
import { AddRecipeProvider } from "./context/AddRecipeContext";
import PageNotExists from "./Pages/PageNotExists/PageNotExists";
import { AddDataProvider } from "./context/DataContext";
import Test from "./components/Test/Test";
import RecipeDetails from "./components/RecipeDetails/RecipeDetails";
import SignUpPage from "./Pages/SignUpPage/SignUpPage";
import { AccountProvider } from "./context/AccountContext";
import LogInPage from "./Pages/LogInPage/LogInPage";
import { FunctionSupplyProvider } from "./context/FunctionsSupply";
import UserProfilePage from "./Pages/UserProfilePage/UserProfilePage";
import CategoryDetails from "./components/CategoryDetails/CategoryDetails";
import AddBlog from "./components/AddBlog/AddBlog";
import MyRecipesPage from "./Pages/MyRecipesPage/MyRecipesPage";
import BlogPage from "./Pages/BlogPage/BlogPage";
import BlogDetails from "./components/BlogDetails/BlogDetails";
import PostList from "./PostList";
import { CommentsProvider } from "./context/CommentsContext";

function App() {
  return (
    <div className="App-container">
      <CommentsProvider>
        <FunctionSupplyProvider>
          <AccountProvider>
            <AddDataProvider>
              <AddRecipeProvider>
                <BrowserRouter>
                  <Header />
                  <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/recipe" element={<AllRecipesPage />} />
                    <Route path="/category" element={<CategoriesPage />} />
                    <Route path="/add-recipe" element={<AddRecipePage />} />
                    <Route path="/post" element={<PostList />} />
                    <Route
                      path="/recipe/:recipe_id"
                      element={<RecipeDetails />}
                    />
                    <Route
                      path="/category/:category_id"
                      element={<CategoryDetails />}
                    />
                    <Route path="/test" element={<Test />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/login" element={<LogInPage />} />
                    <Route path="user/:user_id" element={<UserProfilePage />} />
                    <Route path="/add-blog" element={<AddBlog />} />
                    <Route path="my-recipes" element={<MyRecipesPage />} />
                    <Route path="/blog" element={<BlogPage />} />
                    <Route path="/blog/:blog_id" element={<BlogDetails />} />
                    <Route path="/*" element={<PageNotExists />} />
                  </Routes>
                  <Footer />
                </BrowserRouter>
              </AddRecipeProvider>
            </AddDataProvider>
          </AccountProvider>
        </FunctionSupplyProvider>
      </CommentsProvider>
    </div>
  );
}

export default App;
