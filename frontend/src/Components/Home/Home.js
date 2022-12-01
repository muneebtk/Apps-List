import React, { useEffect, useState } from "react";
import { Button, MenuItem, Select, TextField, Box, Alert, Card, Typography } from "@mui/material";
import AppsIcon from "@mui/icons-material/Apps";
import axios from "../../Utils/axios";
function Home() {
  useEffect(() => {
    AddApp();
  }, []);
  let [dpData, setDpData] = useState('');
  let [category, setCategory] = useState("");
  let [subCategory, setSubCategory] = useState("");
  let [appName, setAppName] = useState("");
  let [appLink, setAppLink] = useState("");
  let [points, setPoints] = useState();
  let [fieldError, setFieldError] = useState("");
  let [submitRes,setSubmitRes] = useState('');
  let AddApp = () => {
    axios
      .get("admin_panel/get_category/")
      .then((response) => {
        setDpData(response.data);
      })
      .catch((error) => {
      });
  };
  let SubmitApp = (e) => {
    e.preventDefault();
    
    if (
      appName === "" ||
      appLink === "" ||
      category === "" ||
      subCategory === "" ||
      points === "" 
    ) {
      setFieldError("Please fill those fields, and try again");
    } else {
      axios.post("admin_panel/submit_app/", {
        app_name: appName,
        app_link: appLink,
        category: category,
        sub_category: subCategory,
        points: points,
      }).then((response)=>{
        setSubmitRes(response.data)
      }).catch((error)=>{

      })
    }
  };
  return (
    <div style={{ marginLeft: "7%", marginTop: "5%" }}>
      <Card align='center'>
      <Box align="center">
        <AppsIcon fontSize="large" />
      </Box>
      {fieldError && (
        <Alert severity="error" onClose={() => setFieldError(null)}>
          {fieldError}
        </Alert>
      )}
      {submitRes&&<Alert severity="success">{submitRes}</Alert>}

      <form onSubmit={SubmitApp}>
        <TextField
          onChange={(e) => setAppName(e.target.value)}
          sx={{ margin: "10px" }}
          label="App name"
        ></TextField>
        <TextField
          onChange={(e) => setAppLink(e.target.value)}
          sx={{ margin: "10px" }}
          label="App link"
        ></TextField>
        <br />
        <Select
          name="category"
          onChange={(e) => setCategory(e.target.value)}
          displayEmpty
          label='Category'
          sx={{ margin: "10px", width: "220px" }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {dpData
            ? dpData.cat_serializer.map((obj) => (
                <MenuItem value={obj.name}>{obj.name}</MenuItem>
              ))
            : null}
        </Select>
        {/* <br /> */}
        <Select
          sx={{ margin: "10px", width: "220px" }}
          label="Subcategory"
          name="sub_category"
          onChange={(e) => setSubCategory(e.target.value)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {category
            ? dpData.cat_serializer
                .filter((obj) => {
                  if (obj.name === category) {
                    return obj;
                  } else {
                    return;
                  }
                })
                .map((obj) => (
                  <MenuItem value={obj?.sub_category.name}>
                    {obj?.sub_category.name}
                  </MenuItem>
                ))
            : null}
        </Select>
        <br/>
        <input
          onChange={(e) => setPoints(e.target.value)}
          name="points"
          placeholder="Add Points"
          type="number"
          style={{
            margin: "10px",
            backgroundColor: "#81c784",
            color: "black",
            height: "40px",
            width: "220px",
          }}
        />
        {points && (
          <Box align="center">
            <Button type="submit">Submit</Button>
          </Box>
        )}
      </form>
      </Card>
    </div>
  );
}

export default Home;
