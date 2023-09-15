import React, { useState } from "react";
import api from "./ApiConfig";
import toast from "react-hot-toast";

const Like = ({ id }) => {
  const [like, setLike] = useState(false);

  const likeSection = async (postId) => {
    // console.log(postId);
    try {
      const token = JSON.parse(localStorage.getItem("userToken"));

      const response = await api.post("/likepost", { token, postId });

      if (response.data.success) {
        toast.success(response.data.message);
        setLike(response.data.isLiked);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <div>
        <i
          style={{ color: like ? "blue" : "grey" }}
          onClick={() => likeSection(id)}
          className="fa-solid fa-thumbs-up fa-2xl"
        ></i>
      </div>
    </>
  );
};

export default Like;
