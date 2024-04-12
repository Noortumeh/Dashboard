import { Route, Routes } from "react-router-dom";
//Dashboard
import Dashboard from "./Pages/Dashboard/Dashboard";
//Users
import Users from "./Pages/Dashboard/Users/Users";
import UpdateUser from "./Pages/Dashboard/Users/UpdateUser";
import CreateUser from "./Pages/Dashboard/Users/CreateUser";
//Website
import Home from "./Pages/Wibsite/Home";
//Authantication
import SignUp from "./Pages/Wibsite/Authantication/SignUp";
import Login from "./Pages/Wibsite/Authantication/Login";
import RequireAuth from "./Pages/Wibsite/Authantication/RequireAuth";
import PersistLogin from "./Pages/Wibsite/Authantication/PersistLogin";
//* Products
import Products from "./Pages/Dashboard/Products/Products";
import NewProduct from "./Pages/Dashboard/Products/NewProduct";
import UpdateProduct from "./Pages/Dashboard/Products/UpdateProduct";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        {/* Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<Dashboard />}>
              //* Users
              <Route path="users" element={<Users />} />
              <Route path="users/:id" element={<UpdateUser />} />
              <Route path="user/create" element={<CreateUser />} />
              //* Products
              <Route path="products" element={<Products />} />
              <Route path="product/create" element={<NewProduct />} />
              <Route path="products/:id" element={<UpdateProduct />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
