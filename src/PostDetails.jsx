import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useParams, Link, useNavigate } from "react-router-dom";

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select()
        .eq("id", id)
        .single();
      if (error) {
        console.error(error);
      } else {
        setPost(data);
      }
    };
    fetchPost();

    const fetchComments = async () => {
      const { data, error } = await supabase
        .from("comments")
        .select()
        .eq("post_id", id);
      if (error) {
        console.error(error);
      } else {
        setComments(data);
      }
    };
    fetchComments();
  }, [id]);

  const handleUpvote = async () => {
    const { data, error } = await supabase
      .from("posts")
      .update({ upvotes: post.upvotes + 1 })
      .eq("id", id);
    if (error) {
      console.error(error);
    } else {
      setPost((prevPost) => ({ ...prevPost, upvotes: prevPost.upvotes + 1 }));
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const { data, error } = await supabase
      .from("comments")
      .insert([{ post_id: id, content: newComment }]);
    if (error) {
      console.error(error);
    } else {
      setComments([...comments, data[0]]);
      setNewComment("");
    }
  };

  const handleDeletePost = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (confirmDelete) {
      const { error } = await supabase.from("posts").delete().eq("id", id);
      if (error) {
        console.error(error);
      } else {
        navigate("/"); // Redirect to home after deleting the post
      }
    }
  };

  return (
    <div className="post-page">
      {post ? (
        <div className="post">
          <h1>{post.title}</h1>
          <div className="u-c">
            <div className="upvotes">
              <button onClick={handleUpvote}>↑</button>
              <span>{post.upvotes}</span>
            </div>
            <span className="created-at">
              {new Date(post.created_at).toLocaleString()}
            </span>
          </div>
          {post.content && <p>{post.content}</p>}
          {post.image_url && <img src={post.image_url} alt="Post Image" />}

          <div className="post-actions">
            <Link to={`/edit/${id}`} className="edit-btn">
              <button> Edit Post </button>
            </Link>
            <button onClick={handleDeletePost} className="delete-btn">
              Delete Post
            </button>
          </div>

          <h2>Comments</h2>
          <form onSubmit={handleCommentSubmit} className="comment-input">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="comment-textarea"
            />
            <button type="submit" className="comment-submit-btn">
              Submit Comment
            </button>
          </form>
          <div className="comments">
            {comments.map((comment) => (
              <div key={comment.id} className="comment">
                <div className="comment-body">
                  <p>{comment.content}</p>
                </div>
              </div>
            ))}
          </div>

          <Link to="/">Back to Home</Link>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PostDetails;
