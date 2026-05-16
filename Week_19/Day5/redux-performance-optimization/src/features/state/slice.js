import { createSlice, nanoid } from "@reduxjs/toolkit";
import bcrypt from "bcrypt";
import fs from "fs";

const userInitialState = {
  user: [],
};

const postInitialState = {
  post: [],
};

const userSlice = createSlice({
  name: "users",
  initialState: userInitialState,
  reducers: {
    createUser: (state, action) => {
      const { username, password } = action.payload;
      const newUser = {
        userid: nanoid(),
        username: username,
        password: bcrypt.hashSync(password, 10),
        isLoggedIn: false,
      };
      state.user.push(newUser);
      fs.writeFile(
        "../userdatabase/userDatabase.json",
        JSON.stringify(newUser),
        (error) => {
          if (error) throw error;
        },
      );
    },

    editUser: (state, action) => {
      const { userid, username, password } = action.payload;
      const findUser = state.user.find((u) => u.userid === userid);
      if (!findUser) return;
      if (username) findUser.username = username;
      if (password) {
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            console.log("Password hashing error!");
            return;
          }
          findUser.password = hash;
          fs.writeFile(
            "../userdatabase/userDatabase.json",
            JSON.stringify(findUser),
            (error) => {
              if (error) throw error;
            },
          );
        });
      } else if (username) {
        fs.writeFile(
          "../userdatabase/userDatabase.json",
          JSON.stringify(findUser),
          (error) => {
            if (error) throw error;
          },
        );
      }
    },

    deleteUser: (state, action) => {
      const { userid } = action.payload;
      state.user = state.user.filter((u) => u.userid !== userid);
      fs.writeFile(
        "../userdatabase/userDatabase.json",
        JSON.stringify(state.user),
        (error) => {
          if (error) throw error;
        },
      );
    },

    userLogin: (state, action) => {
      const { username, password } = action.payload;
      const findUser = state.user.find((u) => u.username === username);
      if (!findUser) return;
      const passwordMatch = bcrypt.compareSync(password, findUser.password);
      if (passwordMatch) findUser.isLoggedIn = true;
    },
  },
});

const postsSlice = createSlice({
  name: "posts",
  initialState: postInitialState,
  reducers: {
    createPost: (state, action) => {
      const { header, text, author } = action.payload;
      if (!author) return;
      const newPost = {
        postid: nanoid(),
        header: header,
        text: text,
        author: author,
        isLiked: false,
      };
      state.post.push(newPost);
      fs.writeFile(
        "../postsdatabase/postsDatabase.json",
        JSON.stringify(newPost),
        (error) => {
          if (error) throw error;
        },
      );
    },

    editPost: (state, action) => {
      const { postid, header, text } = action.payload;
      const findPost = state.post.find((p) => p.postid === postid);
      if (!findPost) return;
      if (header) findPost.header = header;
      if (text) findPost.text = text;
      fs.writeFile(
        "../postsdatabase/postsDatabase.json",
        JSON.stringify(findPost),
        (error) => {
          if (error) throw error;
        },
      );
    },

    deletePost: (state, action) => {
      const { postid } = action.payload;
      state.post = state.post.filter((p) => p.postid !== postid);
      fs.writeFile(
        "../postsdatabase/postsDatabase.json",
        JSON.stringify(state.post),
        (error) => {
          if (error) throw error;
        },
      );
    },

    likePost: (state, action) => {
      const { postid } = action.payload;
      const findPost = state.post.find((p) => p.postid === postid);
      if (!findPost) return;
      findPost.isLiked = !findPost.isLiked;
    },
  },
});

export const { createUser, editUser, deleteUser, userLogin } =
  userSlice.actions;
export const { createPost, editPost, deletePost, likePost } =
  postsSlice.actions;

export const userReducer = userSlice.reducer;
export const postsReducer = postsSlice.reducer;
