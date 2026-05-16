import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";
import { createPost } from "../state/slice";

const CreatePost = () => {
  const dispatch = useDispatch();
    const loggedInUser = useSelector((state) => state.users.user.find((u) => u.isLoggedIn));
    const postHeader = useRef(useSelector((state) => state.posts.post.header));
    const postText = useRef(useSelector((state) => state.posts.post.text));

  const handleSubmit = (header, text) => {
    if (!loggedInUser) return;
    dispatch(createPost({ header, text, author: loggedInUser.username }));
  };

    return (
        <div id="wrapper">
                <div id="post-create">
                <input ref={postHeader} type="text" placeholder="Your post header here..." /><br />
                <input ref={postText} type="text" placeholder="Your post text here..." /><br />
                <button onClick={() => dispatch(createPost())}>Create post!</button>
            </div>
        </div>
    )
};

