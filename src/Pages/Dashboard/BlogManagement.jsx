import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaEye, FaBlog, FaSearch, FaFilter, FaCalendarAlt, FaEye as FaViews, FaHeart, FaComment, FaStar, FaTimes } from 'react-icons/fa';
import axiosPublic from '../../api/axiosPublic';
import toast from 'react-hot-toast';

const BlogManagement = () => {
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
    author: '',
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
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await axiosPublic.get('/blogs');
      setBlogs(response.data.blogs || []);
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
      // Fallback data
      const fallbackBlogs = [
        {
          _id: '1',
          title: '10 Simple Ways to Reduce Your Carbon Footprint Today',
          excerpt: 'Discover easy and practical steps you can take right now to make a positive impact on the environment.',
          content: 'In today\'s world, taking care of our planet is more important than ever...',
          category: 'Sustainability',
          author: 'Sarah Green',
          tags: ['sustainability', 'eco-friendly', 'carbon-footprint'],
          status: 'published',
          featured: true,
          readTime: 5,
          views: 1250,
          likes: 89,
          comments: 12,
          createdAt: '2024-01-15'
        },
        {
          _id: '2',
          title: 'The Future of Renewable Energy: What to Expect in 2024',
          excerpt: 'Explore the latest innovations and trends in renewable energy that are shaping our sustainable future.',
          content: 'Renewable energy is rapidly evolving...',
          category: 'Renewable Energy',
          author: 'Mike Chen',
          tags: ['renewable-energy', 'climate-change', 'environment'],
          status: 'published',
          featured: false,
          readTime: 7,
          views: 980,
          likes: 67,
          comments: 8,
          createdAt: '2024-01-12'
        },
        {
          _id: '3',
          title: 'Urban Gardening: Growing Food in Small Spaces',
          excerpt: 'Learn how to start your own urban garden and grow fresh food even with limited space.',
          content: 'Living in a city doesn\'t mean you can\'t grow your own food...',
          category: 'Eco-Tips',
          author: 'Emma Davis',
          tags: ['eco-friendly', 'green-living', 'nature'],
          status: 'draft',
          featured: false,
          readTime: 4,
          views: 0,
          likes: 0,
          comments: 0,
          createdAt: '2024-01-10'
        },
        {
          _id: '4',
          title: 'Climate Change: Understanding the Science Behind Global Warming',
          excerpt: 'A comprehensive look at the scientific evidence for climate change and what it means for our future.',
          content: 'Climate change is one of the most pressing issues of our time...',
          category: 'Climate Change',
          author: 'Dr. James Wilson',
          tags: ['climate-change', 'environment', 'pollution'],
          status: 'published',
          featured: true,
          readTime: 10,
          views: 1450,
          likes: 112,
          comments: 23,
          createdAt: '2024-01-08'
        },
        {
          _id: '5',
          title: 'Wildlife Conservation: Protecting Endangered Species',
          excerpt: 'Discover the challenges and successes in wildlife conservation efforts around the world.',
          content: 'Wildlife conservation is critical for maintaining biodiversity...',
          category: 'Wildlife',
          author: 'Lisa Anderson',
          tags: ['conservation', 'wildlife', 'nature'],
          status: 'archived',
          featured: false,
          readTime: 6,
          views: 890,
          likes: 78,
          comments: 15,
          createdAt: '2024-01-05'
        }
      ];
      setBlogs(fallbackBlogs);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assuming 'blogData' refers to 'formData' in this context
      const blogData = formData;
      if (editingBlog) {
        await axiosPublic.patch(`/blogs/${editingBlog._id}`, blogData);
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

  const handleStatusChange = async (blogId, newStatus) => {
    try {
      await axiosPublic.patch(`/blogs/${blogId}/status`, { status: newStatus });
      toast.success(`Blog status updated to ${newStatus}!`);
      fetchBlogs();
    } catch (error) {
      console.error('Failed to update blog status:', error);
      toast.error('Failed to update blog status');
    }
  };

  const handleToggleFeatured = async (blogId) => {
    try {
      const blog = blogs.find(b => b._id === blogId);
      await axiosPublic.patch(`/blogs/${blogId}/featured`, { featured: !blog.featured });
      toast.success(`Blog ${blog.featured ? 'unfeatured' : 'featured'} successfully!`);
      fetchBlogs();
    } catch (error) {
      console.error('Failed to toggle featured status:', error);
      toast.error('Failed to update featured status');
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
      author: '',
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
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchTerm.toLowerCase());
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Blog Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Manage blog posts, content, and publications</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
        >
          <FaPlus className="mr-2" /> Create Blog
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-transparent dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Blogs</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{blogs.length}</p>
            </div>
            <FaBlog className="text-blue-500 text-2xl" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-transparent dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Published</p>
              <p className="text-2xl font-bold text-green-900 dark:text-green-400">
                {blogs.filter(b => b.status === 'published').length}
              </p>
            </div>
            <FaEye className="text-green-500 text-2xl" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-transparent dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Drafts</p>
              <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-400">
                {blogs.filter(b => b.status === 'draft').length}
              </p>
            </div>
            <FaEdit className="text-yellow-500 text-2xl" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-transparent dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Featured</p>
              <p className="text-2xl font-bold text-purple-900 dark:text-purple-400">
                {blogs.filter(b => b.featured).length}
              </p>
            </div>
            <FaStar className="text-purple-500 text-2xl" />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6 border border-transparent dark:border-gray-700">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 dark:text-white"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <FaFilter className="text-gray-400" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 dark:text-white"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 dark:text-white"
            >
              <option value="all">All Status</option>
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Blogs Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden border border-transparent dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Blog
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Engagement
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredBlogs.map((blog) => (
                <tr key={blog._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
                        {blog.title}
                        {blog.featured && <FaStar className="ml-2 text-yellow-400" />}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{blog.excerpt}</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {blog.tags.map((tag, index) => (
                          <span key={index} className="px-1 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {blog.author}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400">
                      {blog.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(blog.status)}`}>
                      {blog.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex space-x-3">
                      <span className="flex items-center">
                        <FaViews className="mr-1" />
                        {blog.views}
                      </span>
                      <span className="flex items-center text-red-500">
                        <FaHeart className="mr-1" />
                        {blog.likes}
                      </span>
                      <span className="flex items-center text-blue-500">
                        <FaComment className="mr-1" />
                        {blog.comments}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-2" />
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 transition-colors">
                        <FaEye />
                      </button>
                      <button
                        onClick={() => handleEdit(blog)}
                        className="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300 transition-colors"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 transition-colors"
                      >
                        <FaTrash />
                      </button>
                      <button
                        onClick={() => handleToggleFeatured(blog._id)}
                        className={`hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors ${blog.featured ? 'text-yellow-500' : 'text-gray-400 dark:text-gray-500'}`}
                        title={blog.featured ? 'Unfeature' : 'Feature'}
                      >
                        <FaStar />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Blog Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
          <div className="relative mx-auto p-6 border dark:border-gray-700 w-full max-w-4xl shadow-2xl rounded-xl bg-white dark:bg-gray-800 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {editingBlog ? 'Edit Blog' : 'Create New Blog'}
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Author</label>
                  <input
                    type="text"
                    required
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Excerpt</label>
                <textarea
                  required
                  rows={2}
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Content</label>
                <textarea
                  required
                  rows={8}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 dark:text-white"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 dark:text-white"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Read Time (min)</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tags</label>
                <div className="flex flex-wrap gap-2">
                  {availableTags.map(tag => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleTagToggle(tag)}
                      className={`px-3 py-1 rounded-full text-sm border transition-colors ${formData.tags.includes(tag)
                        ? 'bg-green-600 text-white border-green-600 shadow-md shadow-green-600/20'
                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-green-500'
                        }`}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="mr-2"
                />
                <label htmlFor="featured" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Featured Blog
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-lg shadow-green-600/20"
                >
                  {editingBlog ? 'Update Blog' : 'Create Blog'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogManagement;
