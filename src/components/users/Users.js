import { Row } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import UsersRegister from "./usersRegister";
import UsersPostRegister from "./usersPostRegister";
import UsersLogin from "./usersLogin";
import UsersConfirmAccount from "./usersConfirmAccount";
import UsersProfile from "./usersProfile";
import UsersChangePassword from "./usersChangePassword";
import UsersChangeEmail from "./usersChangeEmail";
import UsersChangeUsername from "./usersChangeUsername";
import UsersLogout from "./usersLogout";
const Users = () => {
  return (
    <Row className="users">
      <Routes>
        <Route path="register" element={<UsersRegister />} />
        <Route path="post-register" element={<UsersPostRegister />} />
        <Route path="login" element={<UsersLogin />} />
        <Route path="profile" element={<UsersProfile />} />
        <Route path="change-password" element={<UsersChangePassword />} />
        <Route path="change-email" element={<UsersChangeEmail />} />
        <Route path="change-username" element={<UsersChangeUsername />} />
        <Route path="logout" element={<UsersLogout />} />
        <Route
          path="confirm-account/:id/:code"
          element={<UsersConfirmAccount />}
        />
        <Route path="*" element={<UsersRegister />} />
      </Routes>
    </Row>
  );
};
export default Users;
