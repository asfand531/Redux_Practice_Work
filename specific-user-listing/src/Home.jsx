// import UserList from "./UserList";
import AddUser from "./AddUser";

function Home({
  // users = [],
  onAddUser,
  openAddUserModal,
  setOpenAddUserModal,
}) {
  return (
    <div className="home-layout">
      <div className="home-container">
        <div className="home-text-container">
          <h1>Welcome to the website!</h1>
          <p>Here you can add users and products.</p>
        </div>
      </div>

      <AddUser
        onAddUser={(user) => {
          onAddUser(user);
          setOpenAddUserModal(false);
        }}
        openResponsive={openAddUserModal}
        setOpenResponsive={setOpenAddUserModal}
      />

      {/* <div className="userlist-container" id="user-list-section">
        <UserList data={users} />
      </div> */}
    </div>
  );
}

export default Home;
