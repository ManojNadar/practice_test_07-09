import React, { useEffect, useState } from "react";
import api from "../ApiConfig";
import { toast } from "react-hot-toast";

const NewsFeed = () => {
  const [allPost, setAllPost] = useState([]);
  const [like, setLike] = useState(false);

  console.log(like);

  useEffect(() => {
    async function getAllPost() {
      try {
        const response = await api.get("/allpost");

        if (response.data.success) {
          setAllPost(response.data.allposts);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getAllPost();
  }, []);

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
    <div>
      <h1>My Post</h1>

      {allPost?.length ? (
        <div>
          {allPost.map((post) => (
            <div key={post._id}>
              <div>
                <img src={post.image} alt="" />
              </div>
              <h2>{post.caption}</h2>
              <span>count :{post?.likes?.length}</span>

              <button
                style={{ backgroundColor: like ? "blue" : "grey" }}
                onClick={() => likeSection(post._id)}
              >
                Unlike
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div> No post</div>
      )}
    </div>
  );
};

export default NewsFeed;
