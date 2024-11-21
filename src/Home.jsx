import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("created_at");

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select()
        .ilike("title", `%${searchTerm}%`)
        .order(sortBy, { ascending: false });
      if (error) {
        console.error(error);
      } else {
        setPosts(data);
      }
    };
    fetchPosts();
  }, [searchTerm, sortBy]);

  return (
    <div>
      <input className="search-bar"
        type="text"
        placeholder="Search by title"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
        <option value="created_at">Sort by Time</option>
        <option value="upvotes">Sort by Upvotes</option>
      </select>
      <h1 className="title"> Destiny 2 Forum</h1>
      <Link to="/create" className="create-post-link"> Create New Post </Link>

      <div className="posts">
        {posts.map((post) => (
          <div key={post.id} className="post">
            <Link to={`/post/${post.id}`}>
              <h2> {post.title} </h2>
              <span className="created-at">
                {new Date(post.created_at).toLocaleString()}
              </span>
              <p>
                {post.content
                  ? post.content.substring(0, 100) + "..."
                  : "No content"}
              </p>
            </Link>
            <div className="upvotes">
                <button onClick={() => handleUpvote(post.id)}>↑</button>
                <span>{post.upvotes}</span>
              </div>
          </div>
        ))}
      </div>
    </div>
  );

  async function handleUpvote(postId) {
    const { data, error } = await supabase
      .from("posts")
      .update({ upvotes: posts.find((post) => post.id === postId).upvotes + 1 })
      .eq("id", postId);
    if (error) {
      console.error(error);
    } else {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, upvotes: post.upvotes + 1 } : post
        )
      );
    }
  }
};

export default Home;
