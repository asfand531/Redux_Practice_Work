import { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Card, Button, Pagination } from "antd";
import { PlusCircleFilled, ShoppingCartOutlined } from "@ant-design/icons";
import AddProduct from "./AddProduct";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "./features/cart/cartSlice";
import { addProduct } from "./features/products/productsSlice";
const { Meta } = Card;

function UserProducts({
  // data,
  // addCart,
  // cartItems,
  // onAddProduct,
  setOpenResponsive,
  openResponsive,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const pageSizeOptions = ["2", "4", "6", "8"];
  const location = useLocation();
  const { id } = useParams();
  // const userProducts = data.filter((product) => product.userId === id);
  // Redux
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const cartItems = useSelector((state) => state.cart);
  const userProducts = products.filter((product) => product.userId === id);

  const user = location.state?.user;
  const userName = user?.name || "User";
  console.log("User Products>>>>>>>>>>>", userProducts);

  // const handleAddToCart = (item) => {
  //   addCart(item);
  // };

  const handleAddToCart = (item) => {
    dispatch(addCart(item));
  };

  const userCartCount = cartItems
    .filter((item) => item.userId === id)
    .reduce((acc, item) => acc + item.count, 0);

  return (
    <>
      <div className="user-products-container">
        <div className="user-products-header" style={{ display: "flex" }}>
          <h2
            className="heading"
            style={{ display: "flex", alignItems: "center" }}
          >
            User Products
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <Button
              type="ghost"
              className="nav-btn"
              onClick={() => setOpenResponsive(true)}
            >
              Add Products
            </Button>
            <Link
              to="/cart"
              state={{ personName: userName, userId: id }}
              className="cart-link"
              title="See cart"
            >
              <Button className="nav-btn cart-icon-btn" type="ghost">
                <ShoppingCartOutlined className="cart-icon" />
                <span className="cart-count">{userCartCount}</span>
              </Button>
            </Link>
          </div>
        </div>

        <div className="user-products-body">
          {userProducts
            .slice((currentPage - 1) * pageSize, currentPage * pageSize)
            .map((item, index) => (
              <Card
                key={index}
                hoverable
                cover={
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ height: 200 }}
                  />
                }
                style={{ width: 200 }}
                className="user-product-card"
              >
                <PlusCircleFilled
                  onClick={() => handleAddToCart(item)}
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    fontSize: 24,
                    marginBottom: 10,
                  }}
                  title="Add to cart"
                />
                <Meta
                  title={item.name}
                  description={`Date: ${item.date} PKR: ${item.price}/-`}
                />
              </Card>
            ))}
        </div>
        {userProducts.length === 0 ? (
          <h1 className="no-data-heading">No product added!</h1>
        ) : (
          <></>
        )}
        <section className="pagination-section">
          <Pagination
            current={currentPage}
            total={userProducts.length}
            pageSize={pageSize}
            showSizeChanger={true}
            onShowSizeChange={(size) => {
              setPageSize(size);
              setCurrentPage(1);
            }}
            onChange={(page) => setCurrentPage(page)}
            pageSizeOptions={pageSizeOptions}
            align="center"
          />
        </section>
      </div>
      <div>
        <AddProduct
          onAddProduct={(product) =>
            dispatch(addProduct({ ...product, userId: id }))
          }
          products={products}
          openResponsive={openResponsive}
          setOpenResponsive={setOpenResponsive}
          userId={id}
        />
      </div>
    </>
  );
}

export default UserProducts;
