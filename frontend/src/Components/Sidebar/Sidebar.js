import React, { useContext } from "react";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import AppContext from "../../Context/AppContext";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  let { user, logoutUser } = useContext(AppContext);
  let navigate = useNavigate();

  return (
    <div>
      <Box sx={{ width: 200, height: "100vh", backgroundColor: "#bbdefb" }}>
        {user ? user.is_super_admin ? (
          <>
            <Button onClick={()=>navigate('/admin_panel')}>
              <HomeIcon /> Home
            </Button>
            <br />
            <br />
            <Button>
              <AddIcon />
              Add apps{" "}
            </Button>
          </>
        ) : (
          <>
            <Button onClick={() => navigate("/")}>
              <HomeIcon  /> Home
            </Button>
            <br />
            <br />
            <Button onClick={()=>navigate('/home-page/profile')}>
              <AccountBoxIcon />
              profile
            </Button>
            <br />
            <br />
            <Button onClick={()=>navigate('/home-page/points/')}>
              <AccountBalanceWalletIcon /> points
            </Button>
            <br />
            <br />
            <Button onClick={()=>navigate('/home-page/tasks/')}>
              <AssignmentIcon /> task
            </Button>
            <br />
            <br />
            <Button onClick={logoutUser}>
              <LogoutIcon /> logout
            </Button>
          </>
        ):null}
      </Box>
    </div>
  );
}

export default Sidebar;
