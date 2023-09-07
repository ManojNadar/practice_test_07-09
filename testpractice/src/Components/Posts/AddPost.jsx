import React, { useContext, useEffect, useState } from "react";
import { MyUserContext } from "../AuthContext";
import { NavLink, useNavigate } from "react-router-dom";

const AddPost = () => {
  const [regData, setRegData] = useState({
    image: "",
    caption: "",
  });

  const route = useNavigate();
  const { state } = useContext(MyUserContext);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setRegData({ ...regData, [name]: value });
  };

  //   console.log(regData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { image, caption } = regData;

    if (image && caption) {
      const response = await api.post("/addpost", {
        regData,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setRegData({
          image: "",
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

  return (
    <>
      <h2>Add post</h2>

      <form className="formContainer" onSubmit={handleSubmit}>
        <div className="allInputDivs">
          <label>Name</label> <br />
          <input
            type="text"
            onChange={handleChange}
            name="image"
            value={regData.image}
          />
        </div>
        <div className="allInputDivs">
          <label>Name</label> <br />
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
    </>
  );
};

export default AddPost;
