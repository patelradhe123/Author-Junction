import API from "@/utils/apiClient";
import { FC, useEffect, useState } from "react";
import MediaFeed from "../MediaFeed";
import Post from "../MediaFeed/Post";

const AuthorMedia: FC<{ userId: string }> = ({ userId }) => {
  const [posts, setPosts] = useState<Array<Post>>([]);
  const api = new API();
  const fetchFunction = () => {
    setLoading(true);
    api
      .getAuthorPost()
      .then(res => (res.status === 404 ? null : res.json()))
      .then(data => {
        setLoading(false);
        return !!data ? setPosts(data) : null;
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
        setPosts([]);
      });
  };
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchFunction();
  }, []);

  return (
    <div className="mx-auto w-4/5">
      <MediaFeed fetchFunction={fetchFunction} loading={loading} posts={posts} userId={userId}>
        <h3 className="mt-5 capitalize">Posts created by you</h3>
      </MediaFeed>
    </div>
  );
};

export default AuthorMedia;
