import React, { useContext, useEffect, useState } from "react";
import { MyUserContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../ApiConfig";
import { toast } from "react-hot-toast";

const AddPost = () => {
  const [regData, setRegData] = useState({
    // image: "",
    caption: "",
  });
  const [file, setFile] = useState();

  const route = useNavigate();
  const { state } = useContext(MyUserContext);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setRegData({ ...regData, [name]: value });
  };

  //   console.log(regData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { caption } = regData;
    if (file && caption) {
      const token = JSON.parse(localStorage.getItem("userToken"));

      const response = await api.post("/addpost", {
        regData,
        token,
        file,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setRegData({
          caption: "",
        });

        route("/yourpost");
      } else {
        toast.error(response.data.message);
      }
    } else {
      toast.error("All fields are mandatory");
    }
  };

  useEffect(() => {
    if (!state?.currentuser?.name) {
      route("/");
    }
  }, [state, route]);

  // console.log(file);

  const handleChangeValue = async (e) => {
    const reader = new FileReader();

    const fileData = e.target.files[0];

    if (fileData) {
      // console.log(fileData);
      reader.readAsDataURL(fileData);
    }
    // console.log(reader);

    reader.onload = () => {
      setFile(reader.result);
    };
  };

  return (
    <>
      <h2>Add post</h2>

      <form className="formContainer" onSubmit={handleSubmit}>
        <div>
          <input type="file" onChange={handleChangeValue} />
        </div>
        <div className="allInputDivs">
          <label>Caption</label> <br />
          <input
            type="text"
            onChange={handleChange}
            name="caption"
            value={regData.caption}
          />
        </div>

        <div className="allInputDivs">
          <input type="submit" value="POST" />
        </div>
      </form>

      <div>
        <img
          style={{ height: "500px", width: "500px", objectFit: "contain" }}
          src={file}
          alt="uploaded"
        />
      </div>
    </>
  );
};

export default AddPost;
