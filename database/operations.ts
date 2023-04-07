import UserModel, { User } from "@/database/model/User";
import { hash } from "bcrypt";
import PostModel, { Post } from "./model/Post";

type UserData = {
  username: User["username"];
  email: User["email"];
  password: User["password"];
};

export async function createUser({ username, email, password }: UserData): Promise<User> {
  const newUser: User = new UserModel({
    username,
    email,
    password: await hash(password, 10),
  });
  return newUser;
}

type PostData = {
  title: Post["title"];
  content: Post["content"];
  creator: Post["creator"];
};

export function createPost({ title, content, creator }: PostData): Post {
  const newPost = new PostModel({
    title,
    content,
    creator,
  });
  return newPost;
}
