import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import BlogCard from '../Blog/BlogCard';
import Button from '../UI/Button';
import axios from 'axios';

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/blogs/latest?limit=3');
        setBlogs(response.data);
      } catch (error) {
        console.log('Using fallback blog data');
        // Fallback data if API fails
        setBlogs([
          {
            _id: '1',
            title: '10 Simple Ways to Reduce Your Carbon Footprint Today',
            excerpt: 'Discover easy and practical steps you can take right now to make a positive impact on the environment.',
            content: 'In today\'s world, taking care of our planet is more important than ever. Here are 10 simple ways you can reduce your carbon footprint starting today...',
            author: 'Sarah Green',
            category: 'Sustainability',
            createdAt: new Date('2024-01-15'),
            readTime: 5,
            views: 1250,
            likes: 89,
            comments: [],
            featured: true,
            status: 'Published',
            rating: 4.8
          },
          {
            _id: '2',
            title: 'The Future of Renewable Energy: What to Expect in 2024',
            excerpt: 'Explore the latest innovations and trends in renewable energy that are shaping our sustainable future.',
            content: 'Renewable energy is rapidly evolving, with new technologies and breakthroughs happening every day. Let\'s explore what\'s coming in 2024...',
            author: 'Mike Chen',
            category: 'Renewable Energy',
            createdAt: new Date('2024-01-12'),
            readTime: 7,
            views: 980,
            likes: 67,
            comments: [],
            featured: false,
            status: 'Published',
            rating: 4.6
          },
          {
            _id: '3',
            title: 'Urban Gardening: Growing Food in Small Spaces',
            excerpt: 'Learn how to start your own urban garden and grow fresh food even with limited space.',
            content: 'Living in a city doesn\'t mean you can\'t grow your own food. Urban gardening is becoming increasingly popular...',
            author: 'Emma Davis',
            category: 'Eco-Tips',
            createdAt: new Date('2024-01-10'),
            readTime: 4,
            views: 756,
            likes: 45,
            comments: [],
            featured: false,
            status: 'Published',
            rating: 4.5
          }
        ]);
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
