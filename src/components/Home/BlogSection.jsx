import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import BlogCard from '../Blog/BlogCard';
import Button from '../UI/Button';
import axiosPublic from '../../api/axiosPublic';

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestBlogs = async () => {
      try {
        // Try to fetch from /api/blogs with limit
        const response = await axiosPublic.get('/blogs?limit=3&sort=newest');
        // Handle both array and object responses
        const blogsData = Array.isArray(response.data) ? response.data : (response.data.blogs || []);
        setBlogs(blogsData.slice(0, 3));
      } catch (error) {
        console.error('Failed to fetch latest blogs:', error);
        // Set empty array on error
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestBlogs();
  }, []);

  // Create skeleton cards for loading state
  const skeletonCards = Array.from({ length: 3 }, (_, index) => (
    <BlogCard key={`skeleton-${index}`} loading={true} />
  ));

  return (
    <div className="py-16 px-5 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4 text-gray-900">Latest from Our Blog</h2>
          <p className="text-large text-gray-600 mb-8">
            Stay informed with the latest insights, tips, and stories about sustainable living and environmental conservation.
          </p>
        </div>

        {/* Blog Cards Grid - Responsive layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {loading ? (
            skeletonCards
          ) : (
            blogs.map((blog, index) => (
              <BlogCard
                key={blog._id}
                blog={blog}
                variant={index === 0 && blog.featured ? 'featured' : 'default'}
              />
            ))
          )}
        </div>

        {/* View All Blogs Button */}
        <div className="text-center">
          <Link to="/blogs">
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              View All Blogs
              <span className="ml-2">→</span>
            </Button>
          </Link>
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600">📝</span>
              </div>
              <span>Weekly Updates</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600">🌍</span>
              </div>
              <span>Global Perspectives</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600">💡</span>
              </div>
              <span>Expert Insights</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
