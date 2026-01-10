import React, { useEffect, useState, useMemo } from 'react';
import BlogCard from '../components/Blog/BlogCard';
import Button from '../components/UI/Button';
import axiosPublic from '../api/axiosPublic';
import { Search, Filter, ChevronDown, X, Grid, List } from 'lucide-react';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Filter states
  const [filters, setFilters] = useState({
    category: 'all',
    minRating: 0,
    maxPrice: '',
    dateRange: 'all',
    location: 'all',
    author: '',
    tags: [],
    difficulty: 'all'
  });

  // Sorting state
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'Sustainability', label: 'Sustainability' },
    { value: 'Climate Change', label: 'Climate Change' },
    { value: 'Renewable Energy', label: 'Renewable Energy' },
    { value: 'Wildlife', label: 'Wildlife' },
    { value: 'Recycling', label: 'Recycling' },
    { value: 'Conservation', label: 'Conservation' },
    { value: 'Eco-Tips', label: 'Eco-Tips' }
  ];

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const params = {
          page: currentPage,
          limit: 12 // Changed to 12 for 4 cards per row * 3 rows
        };

        if (selectedCategory !== 'all') {
          params.category = selectedCategory;
        }

        const response = await axiosPublic.get('/blogs', { params });
        setBlogs(response.data.blogs);
        setTotalPages(response.data.pagination.pages);
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
        // Removed fallback data to prevent confusion
        setBlogs([]);
        setTotalPages(1);
        const fallbackBlogs = [
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
          },
          {
            _id: '4',
            title: 'Climate Change: Understanding the Science Behind Global Warming',
            excerpt: 'A comprehensive look at the scientific evidence for climate change and what it means for our future.',
            content: 'Climate change is one of the most pressing issues of our time. Understanding the science behind it is crucial...',
            author: 'Dr. James Wilson',
            category: 'Climate Change',
            createdAt: new Date('2024-01-08'),
            readTime: 10,
            views: 1450,
            likes: 112,
            comments: [],
            featured: false,
            status: 'Published',
            rating: 4.9
          },
          {
            _id: '5',
            title: 'Wildlife Conservation: Protecting Endangered Species',
            excerpt: 'Discover the challenges and successes in wildlife conservation efforts around the world.',
            content: 'Wildlife conservation is critical for maintaining biodiversity and ecosystem health...',
            author: 'Lisa Anderson',
            category: 'Wildlife',
            createdAt: new Date('2024-01-05'),
            readTime: 6,
            views: 890,
            likes: 78,
            comments: [],
            featured: false,
            status: 'Published',
            rating: 4.7
          },
          {
            _id: '6',
            title: 'The Ultimate Guide to Recycling: Do\'s and Don\'ts',
            excerpt: 'Everything you need to know about recycling properly and making a real environmental impact.',
            content: 'Recycling is one of the easiest ways to reduce your environmental footprint, but many people do it incorrectly...',
            author: 'Tom Roberts',
            category: 'Recycling',
            createdAt: new Date('2024-01-03'),
            readTime: 8,
            views: 1100,
            likes: 95,
            comments: [],
            featured: false,
            status: 'Published',
            rating: 4.4
          },
          {
            _id: '7',
            title: 'Sustainable Living: Small Changes, Big Impact',
            excerpt: 'How small lifestyle changes can lead to significant environmental benefits over time.',
            content: 'Sustainable living doesn\'t require drastic changes. Small, consistent actions can make a big difference...',
            author: 'Rachel Park',
            category: 'Sustainability',
            createdAt: new Date('2024-01-01'),
            readTime: 6,
            views: 678,
            likes: 52,
            comments: [],
            featured: false,
            status: 'Published',
            rating: 4.3
          },
          {
            _id: '8',
            title: 'Ocean Conservation: Protecting Marine Life',
            excerpt: 'The importance of ocean conservation and steps we can take to protect marine ecosystems.',
            content: 'Oceans cover 71% of our planet and are vital for life on Earth. Protecting them is crucial...',
            author: 'Dr. Maria Santos',
            category: 'Conservation',
            createdAt: new Date('2023-12-28'),
            readTime: 9,
            views: 923,
            likes: 71,
            comments: [],
            featured: false,
            status: 'Published',
            rating: 4.6
          }
        ];

        // Filter by category if selected
        const filteredBlogs = selectedCategory === 'all'
          ? fallbackBlogs
          : fallbackBlogs.filter(blog => blog.category === selectedCategory);

        setBlogs(filteredBlogs);
        setTotalPages(Math.ceil(filteredBlogs.length / 12));
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [currentPage, selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Create skeleton cards for loading state
  const skeletonCards = Array.from({ length: 8 }, (_, index) => (
    <BlogCard key={`skeleton-${index}`} loading={true} />
  ));

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-12">
            <h1 className="heading-1 mb-4 text-gray-900">EcoTrack Blog</h1>
            <div className="animate-pulse">
              <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
            </div>
          </div>

          {/* Skeleton filters */}
          <div className="mb-12">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="w-full lg:w-96">
                <div className="h-12 bg-gray-300 rounded-lg animate-pulse"></div>
              </div>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <div key={i} className="h-8 bg-gray-300 rounded w-24 animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>

          {/* Skeleton cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {skeletonCards}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-5">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="heading-1 mb-4 text-gray-900">EcoTrack Blog</h1>
          <p className="text-large text-gray-600 mb-8">
            Insights, tips, and stories about sustainable living and environmental conservation
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="w-full lg:w-96">
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.value}
                  onClick={() => handleCategoryChange(category.value)}
                  variant={selectedCategory === category.value ? 'default' : 'ghost'}
                  size="sm"
                  className={`${selectedCategory === category.value
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                    } border border-gray-300`}
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Blog Stats */}
        <div className="mb-8">
          <p className="text-gray-600">
            Showing {filteredBlogs.length} blog{filteredBlogs.length !== 1 ? 's' : ''}
            {selectedCategory !== 'all' && ` in ${selectedCategory}`}
          </p>
        </div>

        {/* Blog Grid - 4 cards per row on desktop */}
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {filteredBlogs.map((blog, index) => (
              <BlogCard
                key={blog._id}
                blog={blog}
                variant={index === 0 && blog.featured ? 'featured' : 'default'}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No blogs found</h3>
            <p className="text-gray-600">
              {searchTerm
                ? 'Try adjusting your search terms'
                : 'No blogs available in this category yet'
              }
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2">
            <Button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              variant="ghost"
              size="sm"
              className="border border-gray-300"
            >
              Previous
            </Button>

            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  variant={currentPage === page ? 'default' : 'ghost'}
                  size="sm"
                  className={`${currentPage === page
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                    } border border-gray-300`}
                >
                  {page}
                </Button>
              ))}
            </div>

            <Button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              variant="ghost"
              size="sm"
              className="border border-gray-300"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
