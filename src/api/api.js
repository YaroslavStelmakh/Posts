import axios from 'axios';

export const fetchPosts = async () => {
    const { data } = await axios.get("https://jsonplaceholder.typicode.com/posts");
    return data;
};

export const fetchComments = async (postId) => {
    const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
    return data;
};

export const createPost = async (newPost) => {
    const { data } = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return data;
};

export const updatePost = async (postId, updatedPost) => {
    const { data } = await axios.put(`https://jsonplaceholder.typicode.com/posts/${postId}`, updatedPost, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return data;
};

export const deletePost = async (postId) => {
    const { status } = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);

    if (status === 200) {
        return 'Post deleted successfully';
    } else {
        throw new Error('Failed to delete post');
    }
};
