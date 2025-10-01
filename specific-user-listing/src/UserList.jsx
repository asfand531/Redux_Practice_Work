import { Avatar, List } from "antd";
import { Link } from "react-router-dom";

const UserList = ({ data = [] }) => {
  const demoUser = {
    name: "Sara",
    username: "sara",
    email: "sara@gmail.com",
  };

  const dataWithDemo = [demoUser, ...data];

  return (
    <div className="user-list-container">
      <h2 className="heading">User List</h2>
      <List
        pagination={{ position: "bottom", align: "end" }}
        dataSource={dataWithDemo}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar
                  src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                />
              }
              title={
                <Link
                  to={`/user/${index + 1}/products`}
                  state={{ user: item, userId: index + 1 }}
                >
                  {item.name}
                </Link>
              }
              description={`Username: ${item.username}, Email: ${item.email}`}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default UserList;
