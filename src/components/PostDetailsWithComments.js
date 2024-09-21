import { useState, useEffect } from "react";
import { fetchComments } from "../api/api";

const PostDetailsWithComments = ({ post, onClose }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadComments = async () => {
      try {
        setLoading(true);
        const data = await fetchComments(post.id);
        setComments(data);
        setLoading(false);
      } catch (error) {
        setError("Error loading comments");
        setLoading(false);
      }
    };

    if (post) {
      loadComments();
    }
  }, [post]);

  if (!post) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl relative h-[80vh] md:h-auto overflow-hidden flex flex-col">
       
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
        >
          ✖
        </button>

        <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
        <p className="mb-4 flex-grow overflow-auto">{post.body}</p>

        {loading ? (
          <div>Loading comments...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <div className="mt-4 overflow-y-auto flex-grow">
            <h3 className="text-xl font-semibold mb-2">Comments</h3>
            <ul className="space-y-2">
              {comments.map((comment) => (
                <li key={comment.id} className="border rounded p-2">
                  <p className="font-bold">{comment.name}</p>
                  <p className="text-sm text-gray-600">{comment.email}</p>
                  <p>{comment.body}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetailsWithComments;
