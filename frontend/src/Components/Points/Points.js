import { Card, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../Context/AppContext";
import axios from "../../Utils/axios";

function Points() {
  let { authTokens } = useContext(AppContext);
  let [points, setPoints] = useState();
  const config = {
    headers: {
      Authorization: `Bearer ${authTokens ? authTokens.access : null}`,
    },
  };

  let Points = () => {
    axios
      .get("home_page/points/", config)
      .then((response) => {
        setPoints(response.data);
      })
      .catch((error) => {});
  };
  useEffect(() => {
    Points();
  }, []);

  return (
    <div>
        <Typography
          variant="h4"
          align="center"
          sx={{
            margin: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Total Points earned : {points ? points.sum.app__points__sum : null}
        </Typography>
    </div>
  );
}

export default Points;
