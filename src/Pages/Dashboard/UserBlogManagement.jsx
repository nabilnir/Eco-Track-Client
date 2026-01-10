import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaEye, FaBlog, FaSearch, FaFilter, FaCalendarAlt, FaEye as FaViews, FaHeart, FaComment, FaTimes } from 'react-icons/fa';
import axiosPublic from '../../api/axiosPublic';
import toast from 'react-hot-toast';
import useAuth from '../../Hooks/useAuth';

const UserBlogManagement = () => {
    const { user } = useAuth();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        category: 'Sustainability',
        author: user?.displayName || '',
        authorEmail: user?.email || '',
        tags: [],
        status: 'published',
        featured: false,
        readTime: 5,
        views: 0,
        likes: 0,
        comments: 0
    });

    const categories = ['Sustainability', 'Climate Change', 'Renewable Energy', 'Wildlife', 'Recycling', 'Conservation', 'Eco-Tips'];
    const statuses = ['published', 'draft', 'archived'];
    const availableTags = ['sustainability', 'eco-friendly', 'climate-change', 'green-living', 'renewable-energy', 'conservation', 'recycling', 'wildlife'];

    useEffect(() => {
        if (user?.email) {
            fetchBlogs();
        }
    }, [user]);

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const response = await axiosPublic.get('/blogs', {
                params: {
                    authorEmail: user.email
                }
            });
            setBlogs(response.data.blogs || []);
        } catch (error) {
            console.error('Failed to fetch blogs:', error);
            setBlogs([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const blogData = {
                ...formData,
                author: user.displayName || 'Anonymous',
                authorEmail: user.email // Ensure email is always attached
            };

            if (editingBlog) {
                await axiosPublic.put(`/blogs/${editingBlog._id}`, blogData);
                toast.success('Blog updated successfully!');
            } else {
                await axiosPublic.post('/blogs', blogData);
                toast.success('Blog created successfully!');
            }
            fetchBlogs();
            handleCloseModal();
        } catch (error) {
            console.error('Failed to save blog:', error);
            toast.error('Failed to save blog');
        }
    };

    const handleEdit = (blog) => {
        setEditingBlog(blog);
        setFormData({
            ...blog,
            tags: blog.tags || []
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this blog? This action cannot be undone.')) {
            try {
                await axiosPublic.delete(`/blogs/${id}`);
                toast.success('Blog deleted successfully!');
                fetchBlogs();
            } catch (error) {
                console.error('Failed to delete blog:', error);
                toast.error('Failed to delete blog');
            }
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingBlog(null);
        setFormData({
            title: '',
            excerpt: '',
            content: '',
            category: 'Sustainability',
            author: user?.displayName || '',
            authorEmail: user?.email || '',
            tags: [],
            status: 'published',
            featured: false,
            readTime: 5,
            views: 0,
            likes: 0,
            comments: 0
        });
    };

    const handleTagToggle = (tag) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.includes(tag)
                ? prev.tags.filter(t => t !== tag)
                : [...prev.tags, tag]
        }));
    };

    const filteredBlogs = blogs.filter(blog => {
        const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'all' || blog.category === filterCategory;
        const matchesStatus = filterStatus === 'all' || blog.status === filterStatus;
        return matchesSearch && matchesCategory && matchesStatus;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'published': return 'bg-green-100 text-green-800';
            case 'draft': return 'bg-yellow-100 text-yellow-800';
            case 'archived': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) {
        return (
            <div className="p-6">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-300 rounded w-1/3 mb-6"></div>
                    <div className="h-64 bg-gray-300 rounded"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">My Blogs</h1>
                    <p className="text-gray-600 mt-2">Create and manage your blog posts</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
                >
                    <FaPlus className="mr-2" /> Create Blog
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Posts</p>
                            <p className="text-2xl font-bold text-gray-900">{blogs.length}</p>
                        </div>
                        <FaBlog className="text-blue-500 text-2xl" />
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Views</p>
                            <p className="text-2xl font-bold text-green-900">
                                {blogs.reduce((acc, curr) => acc + (curr.views || 0), 0)}
                            </p>
                        </div>
                        <FaViews className="text-green-500 text-2xl" />
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Likes</p>
                            <p className="text-2xl font-bold text-red-900">
                                {blogs.reduce((acc, curr) => acc + (curr.likes || 0), 0)}
                            </p>
                        </div>
                        <FaHeart className="text-red-500 text-2xl" />
                    </div>
                </div>
            </div>

            {/* Blogs Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Blog Details
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Category
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Stats
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredBlogs.length > 0 ? (
                                filteredBlogs.map((blog) => (
                                    <tr key={blog._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900">{blog.title}</div>
                                            <div className="text-xs text-gray-500 mt-1 line-clamp-1">{blog.excerpt}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                                {blog.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(blog.status)}`}>
                                                {blog.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <div className="flex space-x-3">
                                                <span className="flex items-center" title="Views"><FaViews className="mr-1" /> {blog.views || 0}</span>
                                                <span className="flex items-center text-red-500" title="Likes"><FaHeart className="mr-1" /> {blog.likes || 0}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex items-center space-x-3">
                                                <button onClick={() => handleEdit(blog)} className="text-green-600 hover:text-green-900"><FaEdit /></button>
                                                <button onClick={() => handleDelete(blog._id)} className="text-red-600 hover:text-red-900"><FaTrash /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                                        No blogs found. Start by creating one!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add/Edit Blog Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-lg bg-white max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-gray-900">
                                {editingBlog ? 'Edit Blog' : 'Create New Blog'}
                            </h3>
                            <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600">
                                <FaTimes />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
                                <textarea
                                    required
                                    rows={2}
                                    value={formData.excerpt}
                                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                                <textarea
                                    required
                                    rows={8}
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    >
                                        {categories.map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Read Time (min)</label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={formData.readTime}
                                        onChange={(e) => setFormData({ ...formData, readTime: parseInt(e.target.value) })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                >
                                    {editingBlog ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserBlogManagement;
