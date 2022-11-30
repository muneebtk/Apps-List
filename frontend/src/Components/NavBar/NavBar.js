import { AppBar, Toolbar, Typography } from "@mui/material";
import React, { useContext } from "react";
import AppContext from "../../Context/AppContext";

function NavBar() {
  let { user } = useContext(AppContext);
  return (
    <div>
      <AppBar position="static">
        <Toolbar sx={{ backgroundColor: "#bbdefb" }}>
          {" "}
          <Typography sx={{ margin: "auto", color: "black" }}>
            {user&&user.is_super_admin ? (
              <Typography>Hello admin</Typography>
            ) : (
              <Typography>Hello {user.name}</Typography>
            )}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
