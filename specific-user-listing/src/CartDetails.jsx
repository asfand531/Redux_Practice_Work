import { Table, Button } from "antd";
import { useNavigate, useLocation } from "react-router-dom";

function CartDetails({ cartItems }) {
  const navigate = useNavigate();

  const location = useLocation();
  const personName = location.state?.personName || "User";
  const userId = location.state?.userId;

  const filteredCartItems = userId
    ? cartItems.filter((item) => item.userId === userId)
    : cartItems;

  const total = filteredCartItems.reduce(
    (sum, item) => sum + item.price * item.count,
    0
  );

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img src={image} alt="Product" style={{ width: 50 }} />
      ),
    },
    {
      title: "Title",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `PKR ${price}`,
    },
    {
      title: "Count",
      dataIndex: "count",
      key: "name",
    },
  ];

  return (
    <div className="cart-details-container">
      <h1 className="welcome-cart-heading">Welcome {personName}!</h1>

      <h2 className="cart-details-heading">Cart Details</h2>

      <Table
        columns={columns}
        dataSource={filteredCartItems}
        pagination={false}
        rowKey="name"
        className="cart-table"
      />

      <div className="total-cart">
        <strong>Total: PKR {total}/-</strong>
      </div>

      <div style={{ marginTop: "30px", textAlign: "right" }}>
        <Button
          type="ghost"
          className="nav-btn back-to-shop-btn"
          onClick={() => navigate("/")}
        >
          Back to Shop
        </Button>
      </div>
    </div>
  );
}

export default CartDetails;
