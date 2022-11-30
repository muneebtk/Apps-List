import { Card, CardContent, CardMedia, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../Context/AppContext";
import axios from "../../Utils/axios";

function UserHome() {
  const { authTokens } = useContext(AppContext);
  let [appData, setAppData] = useState("");
  useEffect(() => {
    GetAllApps();
  }, []);
  const config = {
    headers: {
      Authorization: `Bearer ${authTokens ? authTokens.access : null}`,
    },
  };

  let GetAllApps = () => {
    axios.get("user/all_apps/",config).then((response) => {
      setAppData(response.data);
    });
  };
  let navigate = useNavigate();
  return (
    <div>
      {appData
        ? appData.map((obj) => (
            <Card
              sx={{
                margin: "10px",
                width: "100%",
                height: "200px",
                display: "flex",
                alignItems: "center",
              }}
              variant="outlined"
            >
              <CardContent sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography variant="h3">{obj.app_name}</Typography>

                  <Typography
                    sx={{ textDecoration: "underline" }}
                    onClick={() => navigate(`/home-page/${obj.slug}/`)}
                  >
                    View Detail
                  </Typography>
                </Box>
                <Paper
                  elevation={0}
                  sx={{ width: "100px", height: "40px", background: "green" }}
                >
                  {obj.points}
                </Paper>
              </CardContent>
            </Card>
          ))
        : null}
    </div>
  );
}

export default UserHome;
