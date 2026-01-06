import React, { useEffect, useState, useMemo } from 'react';
import BlogCard from '../components/Blog/BlogCard';
import Button from '../components/UI/Button';
import axios from 'axios';
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

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'most-liked', label: 'Most Liked' },
    { value: 'most-viewed', label: 'Most Viewed' },
    { value: 'highest-rated', label: 'Highest Rated' },
    { value: 'title-az', label: 'Title (A-Z)' },
    { value: 'title-za', label: 'Title (Z-A)' }
  ];

  const dateRanges = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'year', label: 'This Year' }
  ];

  const difficulties = [
    { value: 'all', label: 'All Levels' },
    { value: 'Beginner', label: 'Beginner' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Advanced', label: 'Advanced' }
  ];

  const locations = [
    { value: 'all', label: 'All Locations' },
    { value: 'Global', label: 'Global' },
    { value: 'Local', label: 'Local' },
    { value: 'Online', label: 'Online' }
  ];

  const priceRanges = [
    { value: '', label: 'Any Price' },
    { value: '0', label: 'Free' },
    { value: '10', label: 'Under $10' },
    { value: '50', label: 'Under $50' },
    { value: '100', label: 'Under $100' }
  ];

  const availableTags = [
    'sustainability', 'eco-friendly', 'climate-change', 'green-living',
    'renewable-energy', 'conservation', 'recycling', 'wildlife',
    'carbon-footprint', 'environment', 'nature', 'pollution'
  ];

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const params = {
          page: currentPage,
          limit: 12
        };
        
        // Apply filters to API call
        if (filters.category !== 'all') params.category = filters.category;
        if (filters.minRating > 0) params.minRating = filters.minRating;
        if (filters.maxPrice) params.maxPrice = filters.maxPrice;
        if (filters.dateRange !== 'all') params.dateRange = filters.dateRange;
        if (filters.location !== 'all') params.location = filters.location;
        if (filters.author) params.author = filters.author;
        if (filters.difficulty !== 'all') params.difficulty = filters.difficulty;
        if (filters.tags.length > 0) params.tags = filters.tags.join(',');
        if (searchTerm) params.search = searchTerm;
        params.sort = sortBy;

        const response = await axios.get('http://localhost:5000/api/blogs', { params });
        setBlogs(response.data.blogs);
        setTotalPages(response.data.pagination.pages);
      } catch (error) {
        console.log('Using fallback blog data');
        // Enhanced fallback data with more fields for filtering
        const fallbackBlogs = [
          {
            _id: '1',
            title: '10 Simple Ways to Reduce Your Carbon Footprint Today',
            excerpt: 'Discover easy and practical steps you can take right now to make a positive impact on the environment.',
            content: 'In today\'s world, taking care of our planet is more important than ever...',
            author: 'Sarah Green',
            category: 'Sustainability',
            createdAt: new Date('2024-01-15'),
            readTime: 5,
            views: 1250,
            likes: 89,
            comments: [],
            featured: true,
            status: 'Published',
            rating: 4.8,
            price: 'Free',
            location: 'Global',
            difficulty: 'Beginner',
            tags: ['sustainability', 'eco-friendly', 'carbon-footprint'],
            language: 'English'
          },
          {
            _id: '2',
            title: 'The Future of Renewable Energy: What to Expect in 2024',
            excerpt: 'Explore the latest innovations and trends in renewable energy that are shaping our sustainable future.',
            content: 'Renewable energy is rapidly evolving...',
            author: 'Mike Chen',
            category: 'Renewable Energy',
            createdAt: new Date('2024-01-12'),
            readTime: 7,
            views: 980,
            likes: 67,
            comments: [],
            featured: false,
            status: 'Published',
            rating: 4.6,
            price: 'Free',
            location: 'Global',
            difficulty: 'Intermediate',
            tags: ['renewable-energy', 'climate-change', 'environment'],
            language: 'English'
          },
          {
            _id: '3',
            title: 'Urban Gardening: Growing Food in Small Spaces',
            excerpt: 'Learn how to start your own urban garden and grow fresh food even with limited space.',
            content: 'Living in a city doesn\'t mean you can\'t grow your own food...',
            author: 'Emma Davis',
            category: 'Eco-Tips',
            createdAt: new Date('2024-01-10'),
            readTime: 4,
            views: 756,
            likes: 45,
            comments: [],
            featured: false,
            status: 'Published',
            rating: 4.5,
            price: 'Free',
            location: 'Local',
            difficulty: 'Beginner',
            tags: ['eco-friendly', 'green-living', 'nature'],
            language: 'English'
          },
          {
            _id: '4',
            title: 'Climate Change: Understanding the Science Behind Global Warming',
            excerpt: 'A comprehensive look at the scientific evidence for climate change and what it means for our future.',
            content: 'Climate change is one of the most pressing issues of our time...',
            author: 'Dr. James Wilson',
            category: 'Climate Change',
            createdAt: new Date('2024-01-08'),
            readTime: 10,
            views: 1450,
            likes: 112,
            comments: [],
            featured: false,
            status: 'Published',
            rating: 4.9,
            price: 'Free',
            location: 'Global',
            difficulty: 'Advanced',
            tags: ['climate-change', 'environment', 'pollution'],
            language: 'English'
          },
          {
            _id: '5',
            title: 'Wildlife Conservation: Protecting Endangered Species',
            excerpt: 'Discover the challenges and successes in wildlife conservation efforts around the world.',
            content: 'Wildlife conservation is critical for maintaining biodiversity...',
            author: 'Lisa Anderson',
            category: 'Wildlife',
            createdAt: new Date('2024-01-05'),
            readTime: 6,
            views: 890,
            likes: 78,
            comments: [],
            featured: false,
            status: 'Published',
            rating: 4.7,
            price: 'Free',
            location: 'Global',
            difficulty: 'Intermediate',
            tags: ['conservation', 'wildlife', 'nature'],
            language: 'English'
          },
          {
            _id: '6',
            title: 'The Ultimate Guide to Recycling: Do\'s and Don\'ts',
            excerpt: 'Everything you need to know about recycling properly and making a real environmental impact.',
            content: 'Recycling is one of the easiest ways to reduce your environmental footprint...',
            author: 'Tom Roberts',
            category: 'Recycling',
            createdAt: new Date('2024-01-03'),
            readTime: 8,
            views: 1100,
            likes: 95,
            comments: [],
            featured: false,
            status: 'Published',
            rating: 4.4,
            price: 'Free',
            location: 'Local',
            difficulty: 'Beginner',
            tags: ['recycling', 'eco-friendly', 'pollution'],
            language: 'English'
          },
          {
            _id: '7',
            title: 'Sustainable Living: Small Changes, Big Impact',
            excerpt: 'How small lifestyle changes can lead to significant environmental benefits over time.',
            content: 'Sustainable living doesn\'t require drastic changes...',
            author: 'Rachel Park',
            category: 'Sustainability',
            createdAt: new Date('2024-01-01'),
            readTime: 6,
            views: 678,
            likes: 52,
            comments: [],
            featured: false,
            status: 'Published',
            rating: 4.3,
            price: 'Free',
            location: 'Global',
            difficulty: 'Beginner',
            tags: ['sustainability', 'green-living', 'eco-friendly'],
            language: 'English'
          },
          {
            _id: '8',
            title: 'Ocean Conservation: Protecting Marine Life',
            excerpt: 'The importance of ocean conservation and steps we can take to protect marine ecosystems.',
            content: 'Oceans cover 71% of our planet and are vital for life on Earth...',
            author: 'Dr. Maria Santos',
            category: 'Conservation',
            createdAt: new Date('2023-12-28'),
            readTime: 9,
            views: 923,
            likes: 71,
            comments: [],
            featured: false,
            status: 'Published',
            rating: 4.6,
            price: 'Free',
            location: 'Global',
            difficulty: 'Intermediate',
            tags: ['conservation', 'wildlife', 'nature'],
            language: 'English'
          },
          {
            _id: '9',
            title: 'Advanced Solar Panel Installation Guide',
            excerpt: 'Professional guide to installing solar panels for maximum efficiency.',
            content: 'Learn the professional techniques for solar panel installation...',
            author: 'John Smith',
            category: 'Renewable Energy',
            createdAt: new Date('2023-12-25'),
            readTime: 12,
            views: 543,
            likes: 38,
            comments: [],
            featured: false,
            status: 'Published',
            rating: 4.7,
            price: '$29',
            location: 'Online',
            difficulty: 'Advanced',
            tags: ['renewable-energy', 'sustainability'],
            language: 'English'
          },
          {
            _id: '10',
            title: 'Zero Waste Living: Complete Guide',
            excerpt: 'Transform your lifestyle to zero waste with this comprehensive guide.',
            content: 'Zero waste living is about more than just recycling...',
            author: 'Anna Johnson',
            category: 'Sustainability',
            createdAt: new Date('2023-12-20'),
            readTime: 15,
            views: 432,
            likes: 29,
            comments: [],
            featured: false,
            status: 'Published',
            rating: 4.5,
            price: '$19',
            location: 'Online',
            difficulty: 'Intermediate',
            tags: ['sustainability', 'recycling', 'eco-friendly'],
            language: 'English'
          }
        ];
        
        setBlogs(fallbackBlogs);
        setTotalPages(Math.ceil(fallbackBlogs.length / 12));
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [currentPage, filters, sortBy, searchTerm]);

  // Client-side filtering and sorting for fallback data
  const filteredAndSortedBlogs = useMemo(() => {
    let filtered = [...blogs];

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (blog.tags && blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
      );
    }

    // Apply filters
    if (filters.category !== 'all') {
      filtered = filtered.filter(blog => blog.category === filters.category);
    }
    if (filters.minRating > 0) {
      filtered = filtered.filter(blog => blog.rating >= filters.minRating);
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(blog => {
        const price = blog.price === 'Free' ? 0 : parseInt(blog.price.replace(/[^0-9]/g, ''));
        return price <= parseInt(filters.maxPrice);
      });
    }
    if (filters.location !== 'all') {
      filtered = filtered.filter(blog => blog.location === filters.location);
    }
    if (filters.author) {
      filtered = filtered.filter(blog => 
        blog.author.toLowerCase().includes(filters.author.toLowerCase())
      );
    }
    if (filters.difficulty !== 'all') {
      filtered = filtered.filter(blog => blog.difficulty === filters.difficulty);
    }
    if (filters.tags.length > 0) {
      filtered = filtered.filter(blog => 
        blog.tags && filters.tags.some(tag => blog.tags.includes(tag))
      );
    }

    // Apply date range filter
    if (filters.dateRange !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (filters.dateRange) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0);
          break;
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
        case 'year':
          filterDate.setFullYear(now.getFullYear() - 1);
          break;
      }
      
      filtered = filtered.filter(blog => new Date(blog.createdAt) >= filterDate);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'most-liked':
          return b.likes - a.likes;
        case 'most-viewed':
          return b.views - a.views;
        case 'highest-rated':
          return b.rating - a.rating;
        case 'title-az':
          return a.title.localeCompare(b.title);
        case 'title-za':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [blogs, searchTerm, filters, sortBy]);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
    setCurrentPage(1);
  };

  const handleTagToggle = (tag) => {
    setFilters(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      category: 'all',
      minRating: 0,
      maxPrice: '',
      dateRange: 'all',
      location: 'all',
      author: '',
      tags: [],
      difficulty: 'all'
    });
    setCurrentPage(1);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.category !== 'all') count++;
    if (filters.minRating > 0) count++;
    if (filters.maxPrice) count++;
    if (filters.dateRange !== 'all') count++;
    if (filters.location !== 'all') count++;
    if (filters.author) count++;
    if (filters.difficulty !== 'all') count++;
    if (filters.tags.length > 0) count++;
    return count;
  };

  // Create skeleton cards for loading state
  const skeletonCards = Array.from({ length: 8 }, (_, index) => (
    <BlogCard key={`skeleton-${index}`} loading={true} />
  ));

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-12">
            <h1 className="heading-1 mb-4 text-gray-900">Explore Blogs</h1>
            <div className="animate-pulse">
              <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
            </div>
          </div>

          {/* Skeleton search and filters */}
          <div className="mb-12">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="w-full lg:w-96">
                <div className="h-12 bg-gray-300 rounded-lg animate-pulse"></div>
              </div>
              <div className="flex gap-2">
                <div className="h-10 bg-gray-300 rounded w-24 animate-pulse"></div>
                <div className="h-10 bg-gray-300 rounded w-24 animate-pulse"></div>
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
          <h1 className="heading-1 mb-4 text-gray-900">Explore Blogs</h1>
          <p className="text-large text-gray-600 mb-8">
            Discover insights, tips, and stories about sustainable living and environmental conservation
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search blogs, authors, tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Controls Bar */}
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-8">
          {/* View Mode Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">View:</span>
            <div className="flex border border-gray-300 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <List size={16} />
              </button>
            </div>
          </div>

          {/* Filter Toggle */}
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="ghost"
              className="flex items-center gap-2 border border-gray-300"
            >
              <Filter size={16} />
              Filters
              {getActiveFiltersCount() > 0 && (
                <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                  {getActiveFiltersCount()}
                </span>
              )}
            </Button>
            
            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="heading-3">Filters</h3>
              <Button
                onClick={clearFilters}
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-gray-900"
              >
                Clear All
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Rating</label>
                <select
                  value={filters.minRating}
                  onChange={(e) => handleFilterChange('minRating', parseInt(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="0">Any Rating</option>
                  <option value="3">3+ Stars</option>
                  <option value="4">4+ Stars</option>
                  <option value="4.5">4.5+ Stars</option>
                </select>
              </div>

              {/* Price Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Price</label>
                <select
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {priceRanges.map(range => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                <select
                  value={filters.dateRange}
                  onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {dateRanges.map(range => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <select
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {locations.map(location => (
                    <option key={location.value} value={location.value}>
                      {location.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Difficulty Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                <select
                  value={filters.difficulty}
                  onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {difficulties.map(difficulty => (
                    <option key={difficulty.value} value={difficulty.value}>
                      {difficulty.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Author Filter */}
              <div className="md:col-span-2 lg:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                <input
                  type="text"
                  placeholder="Search by author name..."
                  value={filters.author}
                  onChange={(e) => handleFilterChange('author', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Tags Filter */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
              <div className="flex flex-wrap gap-2">
                {availableTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => handleTagToggle(tag)}
                    className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                      filters.tags.includes(tag)
                        ? 'bg-green-600 text-white border-green-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-green-500'
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results Summary */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              Showing <span className="font-semibold">{filteredAndSortedBlogs.length}</span> blog{filteredAndSortedBlogs.length !== 1 ? 's' : ''}
              {searchTerm && ` for "${searchTerm}"`}
              {getActiveFiltersCount() > 0 && ` with ${getActiveFiltersCount()} filter${getActiveFiltersCount() !== 1 ? 's' : ''}`}
            </p>
            <div className="text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </div>
          </div>
        </div>

        {/* Blog Grid/List */}
        {filteredAndSortedBlogs.length > 0 ? (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12'
            : 'space-y-6 mb-12'
          }>
            {filteredAndSortedBlogs.map((blog, index) => (
              <BlogCard 
                key={blog._id} 
                blog={blog} 
                variant={index === 0 && blog.featured ? 'featured' : 'default'}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No blogs found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || getActiveFiltersCount() > 0
                ? 'Try adjusting your search terms or filters'
                : 'No blogs available yet'
              }
            </p>
            {(searchTerm || getActiveFiltersCount() > 0) && (
              <Button onClick={clearFilters}>
                Clear Filters & Search
              </Button>
            )}
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
              {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                let pageNum;
                if (totalPages <= 7) {
                  pageNum = i + 1;
                } else if (currentPage <= 4) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 3) {
                  pageNum = totalPages - 6 + i;
                } else {
                  pageNum = currentPage - 3 + i;
                }
                
                return (
                  <Button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    variant={currentPage === pageNum ? 'default' : 'ghost'}
                    size="sm"
                    className={`${
                      currentPage === pageNum
                        ? 'bg-green-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    } border border-gray-300`}
                  >
                    {pageNum}
                  </Button>
                );
              })}
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
