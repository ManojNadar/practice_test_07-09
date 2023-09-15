import React, { useContext, useEffect, useState } from "react";
import api from "../ApiConfig";
import Like from "../Like";
import { MyUserContext } from "../AuthContext";

const NewsFeed = () => {
  const [allPost, setAllPost] = useState([]);
  const { posts, state } = useContext(MyUserContext);
  // console.log(like);

  // console.log(allPost);
  // console.log(state?.multiplePosts);

  // useEffect(() => {
  //   if (state?.multiplePosts?.length) {
  //     setAllPost(state?.multiplePosts);
  //   } else {
  //     setAllPost([]);
  //   }
  // }, [state?.multiplePosts]);

  useEffect(() => {
    async function getAllPost() {
      try {
        const response = await api.get("/allpost");

        if (response.data.success) {
          posts(response.data.allposts);
          setAllPost(response.data.allposts);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getAllPost();
  }, []);

  // useEffect(() => {
  //   async function getAllPost() {
  //     const post = state?.multiplePosts?.map((post) => {
  //       return post?.likes;
  //     });
  //     console.log(post);
  //   }
  //   getAllPost();
  // });

  return (
    <div>
      <h1>My Post</h1>

      {allPost?.length ? (
        <div>
          {allPost.map((post) => (
            <div key={post._id}>
              <div style={{ width: "25%" }}>
                <img src={post.image} alt="" style={{ width: "100%" }} />
              </div>
              <h2>{post.caption}</h2>
              <span>count :{post?.likes?.length}</span>
              <Like id={post._id} />
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
