import { useQuery, useQueryClient } from "react-query";
import { useState } from "react";
import { useAuth } from '../context/AuthContext';
import PostModal from '../components/PostModal';
import PostDetailsWithComments from '../components/PostDetailsWithComments';
import { createPost, updatePost, deletePost, fetchPosts } from '../api/api';

const Home = () => {
  const queryClient = useQueryClient();
  const { data: posts, error, isLoading } = useQuery("posts", fetchPosts, {
    staleTime: 1000 * 60 * 5,  // Cache remains fresh for 5 minutes
    cacheTime: 1000 * 60 * 10, // Cache expires after 10 minutes
    refetchInterval: 60000,    // Automatically refetch data every 60 seconds
  });

  const [modalType, setModalType] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const { logout } = useAuth();

  // Handle modal toggling for both edit/create actions and post details
  const toggleModal = (type = '', post = null) => {
    setModalType(type);
    setSelectedPost(post);
    setIsModalOpen(type !== ''); // Open modal if type is provided
  };

  // Handle toggling for post details modal
  const toggleDetails = (post = null) => {
    setSelectedPost(post);
    setIsDetailsOpen(post !== null);
  };


  // Handle creating a post
  const handleCreatePost = async (postData) => {
    try {
      const newPost = await createPost(postData);
      queryClient.setQueryData("posts", (oldPosts) => [newPost, ...oldPosts]); // Update cache with the new post
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  // Handle editing a post
  const handleEditPost = async (postData) => {
    try {
      const updatedPost = await updatePost(selectedPost.id, postData);
      queryClient.setQueryData("posts", (oldPosts) =>
        oldPosts.map((post) => (post.id === selectedPost.id ? updatedPost : post))
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error editing post:", error);
    }
  };

  // Handle deleting a post
  const handleDeletePost = async () => {
    try {
      await deletePost(selectedPost.id);
      queryClient.setQueryData("posts", (oldPosts) =>
        oldPosts.filter((post) => post.id !== selectedPost.id)
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching posts</div>;

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Posts</h1>
      <div className="flex justify-between">
        <button
          className="bg-green-500 text-white py-2 px-4 rounded mb-4"
          onClick={() => toggleModal('create')}
        >
          Create Post
        </button>
        <button
          className="bg-gray-500 text-white py-2 px-4 rounded mb-4"
          onClick={logout}
        >
          Logout
        </button>
      </div>

      <ul>
        {posts.map((post) => (
          <li key={post.id} className="flex justify-between items-start border-b p-4">
            <div className="flex-1 pr-4">
              <h3 className="font-bold cursor-pointer text-lg" onClick={() => toggleDetails(post)}>
                {post.title}
              </h3>
              <p className="text-gray-700">{post.body}</p>
            </div>
            <div className="flex-shrink-0 space-x-2">
              <button
                onClick={() => toggleModal('edit', post)}
                className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => toggleModal('delete', post)}
                className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <PostModal
        type={modalType}
        post={selectedPost}
        isOpen={isModalOpen}
        onClose={() => toggleModal('')}
        onSubmit={
          modalType === 'create'
            ? handleCreatePost
            : modalType === 'edit'
              ? handleEditPost
              : handleDeletePost
        }
      />

      {isDetailsOpen && (
        <PostDetailsWithComments
          post={selectedPost}
          onClose={() => toggleDetails(null)}
        />
      )}
    </div>
  );
};

export default Home;
