import React, { useState } from 'react';
import { toast } from 'react-toastify';

const PostModal = ({ type, post, isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState(post || { title: '', body: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await onSubmit(formData);
            if (type === 'create') {
                toast.success('Post created successfully!');
            } else if (type === 'edit') {
                toast.success('Post updated successfully!');
            } else if (type === 'delete') {
                toast.success('Post deleted successfully!');
            }
            onClose();
        } catch (error) {
            toast.error('Something went wrong!');
        }
    };

    return isOpen ? (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">
                    {type === 'create' && 'Create Post'}
                    {type === 'edit' && 'Edit Post'}
                    {type === 'delete' && 'Delete Post'}
                </h2>

                {type !== 'delete' ? (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2 text-gray-700">Title</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter post title"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2 text-gray-700">Body</label>
                            <textarea
                                value={formData.body}
                                onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                                className="border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                                placeholder="Enter post content"
                            />
                        </div>
                        <div className="flex justify-between">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                {type === 'create' ? 'Create' : 'Save Changes'}
                            </button>
                            <button
                                onClick={onClose}
                                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-gray-400"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="text-center">
                        <p className="text-lg text-gray-800 mb-4">Are you sure you want to delete this post?</p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={handleSubmit}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-red-400"
                            >
                                Delete
                            </button>
                            <button
                                onClick={onClose}
                                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-gray-400"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    ) : null;
};

export default PostModal;
