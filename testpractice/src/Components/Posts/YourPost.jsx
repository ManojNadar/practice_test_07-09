import React, { useEffect, useState } from "react";
import api from "../ApiConfig";
import { toast } from "react-hot-toast";

const YourPost = () => {
  const [myPost, setMyPost] = useState([]);

  useEffect(() => {
    async function getMyPost() {
      try {
        const token = JSON.parse(localStorage.getItem("userToken"));

        const response = await api.post("/ownposts", { token });

        if (response.data.success) {
          setMyPost(response.data.yourPost);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getMyPost();
  }, []);

  return (
    <div>
      <h1>My Post</h1>

      {myPost?.length ? (
        <div>
          {myPost.map((post) => (
            <div key={post._id}>
              <div>
                <img src={post.image} alt="" />
              </div>
              <h2>{post.caption}</h2>
            </div>
          ))}
        </div>
      ) : (
        <div> No post</div>
      )}
    </div>
  );
};

export default YourPost;
