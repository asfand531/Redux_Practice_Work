import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import UserProducts from "./UserProducts";
import CartDetails from "./CartDetails";
import "./App.css";
import UserList from "./UserList";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./features/users/usersSlice";
import { addCart } from "./features/cart/cartSlice";
import { addProduct } from "./features/products/productsSlice";

function App() {
  // const [users, setUsers] = useState([]);
  // const [product, setProduct] = useState([]);
  // const [cartItems, setCartItems] = useState([]);
  const [openResponsive, setOpenResponsive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Using Redux
  const users = useSelector((state) => state.users);
  // const users = useSelector((state) => console.log(state));
  const products = useSelector((state) => state.products);
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // const addCart = (productItem) => {
  //   setCartItems((prevItems) => {
  //     const existingIndex = prevItems.findIndex(
  //       (item) => item.name === productItem.name
  //     );

  //     if (existingIndex !== -1) {
  //       const updatedItems = [...prevItems];
  //       updatedItems[existingIndex] = {
  //         ...updatedItems[existingIndex],
  //         count: updatedItems[existingIndex].count + 1,
  //       };
  //       return updatedItems;
  //     } else {
  //       return [...prevItems, { ...productItem, count: 1 }];
  //     }
  //   });
  // };

  const handleAddCart = (productItem) => {
    dispatch(addCart(productItem));
  };

  // const addUser = (newUser) => {
  //   setUsers((prevUsers) => [...prevUsers, newUser]);
  // };

  const handleAddUser = (newUser) => {
    dispatch(addUser(newUser));
  };

  // const addProduct = (newProduct, userId) => {
  //   setProduct((prevProduct) => [...prevProduct, { ...newProduct, userId }]);
  // };

  const handleAddProduct = (newProduct) => {
    dispatch(addProduct(newProduct));
  };

  return (
    <>
      <div>
        <Navbar setIsModalOpen={setIsModalOpen} />
      </div>
      <div className="parent">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                users={users}
                // onAddUser={addUser}
                onAddUser={handleAddUser}
                openAddUserModal={isModalOpen}
                setOpenAddUserModal={setIsModalOpen}
              />
            }
          />
          <Route path="/user-list" element={<UserList data={users} />} />
          <Route
            path="/user/:id/products"
            element={
              <UserProducts
                // data={product}
                data={products}
                // addCart={addCart}
                addCart={handleAddCart}
                cartItems={cartItems}
                openResponsive={openResponsive}
                setOpenResponsive={setOpenResponsive}
                // onAddProduct={addProduct}
                onAddProduct={handleAddProduct}
              />
            }
          />
          <Route path="/cart" element={<CartDetails cartItems={cartItems} />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
