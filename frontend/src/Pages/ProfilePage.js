import React from "react";
import NavBar from "../Components/NavBar/NavBar";
import Profile from "../Components/Profile/Profile";
import Sidebar from "../Components/Sidebar/Sidebar";

function ProfilePage() {
  return (
    <div>
      <NavBar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <Profile />
      </div>
    </div>
  );
}

export default ProfilePage;
