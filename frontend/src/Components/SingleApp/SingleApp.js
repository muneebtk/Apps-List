import {
  Card,
  CardContent,
  Typography,
  Link,
  Paper,
  Button,
  Alert,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useNavigate, useParams } from "react-router-dom";
import AppContext from "../../Context/AppContext";
import axios from "../../Utils/axios";
const fileTypes = ["JPG", "PNG", "GIF"];

function SingleApp() {
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState(null);
  const [uploadRes, setUploadRes] = useState(null);
  const handleChange = (file) => {
    setImage(file);
  };
  let navigate = useNavigate();
  let [singleAppData, setSingleAppData] = useState();
  let params = useParams();
  const { authTokens } = useContext(AppContext);
  const config = {
    headers: {
      Authorization: `Bearer ${authTokens ? authTokens.access : null}`,
    },
  };
  let GetSingleApp = (slug) => {
    axios.get(`home-page/${slug}/`,config).then((response) => {
      setSingleAppData(response.data);
    });
  };
  useEffect(() => {
    GetSingleApp(params.slug);
  }, []);

  let EarnPointValidation = (e) => {
    e.preventDefault();
    if (image !== null) {
      EarnPoint(params.slug);
    } else {
      setImageError("Please upload an image");
      return false;
    }
  };

  let EarnPoint = (slug) => {
    let formData = new FormData();
    formData.append("image", image);
    axios
      .post(`home-page/earn-points/${slug}/`, formData, config)
      .then((response) => {
        setUploadRes(response.data);
      })
      .catch((error) => {
        navigate("/login/");
      });
  };
  return (
    <div>
      <form onSubmit={EarnPointValidation}>
        {imageError && (
          <Alert severity="error" onClose={() => setImageError(null)}>
            {imageError}
          </Alert>
        )}
        {uploadRes && <Alert severity="success">{uploadRes}</Alert>}
        <Card elevation={0} sx={{ width: "73vw" }}>
          {singleAppData && (
            <CardContent>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Typography sx={{ padding: "auto" }} variant="h3">
                    {singleAppData.app_name}
                  </Typography>
                  <a
                    style={{ marginBottom: "30px" }}
                    href={singleAppData.app_link}
                  >
                    {singleAppData.app_link}
                  </a>
                </div>
                <Paper
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100px",
                    height: "40px",
                    background: "green",
                  }}
                >
                  {singleAppData.points}
                </Paper>
              </div>
              <FileUploader
                style={{ height: "300px" }}
                handleChange={handleChange}
                name="file"
                types={fileTypes}
              />
            </CardContent>
          )}
        </Card>
        <Button type="submit">submit</Button>
      </form>
    </div>
  );
}

export default SingleApp;
