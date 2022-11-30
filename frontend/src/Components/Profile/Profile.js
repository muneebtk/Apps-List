import { Card, CardContent, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../Context/AppContext";
import axios from "../../Utils/axios";

function Profile() {
  const { authTokens } = useContext(AppContext);
  const [profileDAta, setProfileData] = useState(null);
  const config = {
    headers: {
      Authorization: `Bearer ${authTokens ? authTokens.access : null}`,
    },
  };
  let ProfileView = () => {
    axios.get("home_page/profile/", config).then((response) => {
      setProfileData(response.data);
    });
  };
  useEffect(() => {
    ProfileView();
  }, []);

  return (
    <div>
      {profileDAta ? (
        <Card sx={{ margin: "10px", width: "500px" }}>
          <CardContent>
            <Typography variant="h4" align="center">
              Profile
            </Typography>
            <Typography>
              First Name :<b>{profileDAta.first_name}</b>{" "}
            </Typography>
            <Typography>
              Last Name :<b> {profileDAta.last_name}</b>
            </Typography>
            <Typography>
              Email : <b>{profileDAta.email}</b>
            </Typography>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}

export default Profile;
