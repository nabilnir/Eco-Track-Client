import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import {
  Calendar, Clock, Heart, MessageCircle, User, Star,
  Share2, Bookmark, ChevronLeft, ChevronRight,
  MapPin, DollarSign, Award, Tag, Globe
} from 'lucide-react';
import Button from '../components/UI/Button';
import axiosPublic from '../api/axiosPublic';

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [userRating, setUserRating] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        setLoading(true);

        // Fetch blog details
        const response = await axiosPublic.get(`/blogs/${id}`);
        setBlog(response.data);

        // Fetch related blogs (same category)
        const relatedResponse = await axiosPublic.get('/blogs/latest?limit=4');
        const filtered = relatedResponse.data.filter(b => b._id !== id && b.category === response.data.category);
        setRelatedBlogs(filtered.slice(0, 3));

        // Simulate user interactions
        setIsLiked(Math.random() > 0.5);
        setIsBookmarked(Math.random() > 0.7);
        setUserRating(Math.floor(Math.random() * 2) + 4); // 4-5 stars

        // Mock comments
        setComments([
          {
            id: 1,
            author: 'Alex Johnson',
            content: 'This is exactly what I was looking for! Great insights on sustainable living.',
            createdAt: new Date('2024-01-14'),
            rating: 5,
            avatar: '👤'
          },
          {
            id: 2,
            author: 'Sarah Williams',
            content: 'The tips mentioned here are practical and easy to implement. Already started reducing my carbon footprint!',
            createdAt: new Date('2024-01-13'),
            rating: 4,
            avatar: '👩'
          },
          {
            id: 3,
            author: 'Mike Chen',
            content: 'Would love to see more articles about renewable energy options for homeowners.',
            createdAt: new Date('2024-01-12'),
            rating: 5,
            avatar: '👨'
          }
        ]);

      } catch (error) {
        console.log('Using fallback blog data');
        // Fallback data
        const fallbackBlog = {
          _id: id,
          title: '10 Simple Ways to Reduce Your Carbon Footprint Today',
          excerpt: 'Discover easy and practical steps you can take right now to make a positive impact on the environment.',
          content: `# 10 Simple Ways to Reduce Your Carbon Footprint Today

In today's world, taking care of our planet is more important than ever. Climate change is real, and every small action counts. Here are 10 simple ways you can reduce your carbon footprint starting today:

## 1. Use Reusable Bags

Switch from plastic bags to reusable shopping bags. Keep them in your car or by the door so you never forget them. Plastic bags take hundreds of years to decompose and harm marine life.

## 2. Reduce Meat Consumption

Try Meatless Mondays or reduce meat intake to 2-3 times per week. The meat industry has a significant carbon footprint - producing 1kg of beef generates 27kg of CO2!

## 3. Use Public Transport

Whenever possible, use buses, trains, or carpool instead of driving alone. Transportation accounts for nearly 30% of U.S. greenhouse gas emissions.

## 4. Switch to LED Bulbs

LED bulbs use 75% less energy than traditional incandescent bulbs and last 25 times longer. They may cost more upfront but save money in the long run.

## 5. Unplug Devices

Unplug electronics when not in use or use power strips to easily turn off multiple devices. Many devices draw "phantom power" even when turned off.

## 6. Buy Local

Support local farmers and reduce transportation emissions by buying locally grown food. The average meal travels 1,500 miles from farm to plate!

## 7. Reduce Water Usage

Take shorter showers, fix leaks, and use water-efficient appliances. Water treatment and pumping consume significant energy.

## 8. Compost

Start composting your food waste instead of sending it to landfills. Composting reduces methane emissions and creates nutrient-rich soil.

## 9. Use Renewable Energy

If possible, switch to a green energy provider or install solar panels. Many utilities now offer renewable energy options.

## 10. Plant Trees

Trees absorb CO2 and provide oxygen. Plant trees in your yard or support reforestation efforts. One tree can absorb 48 pounds of CO2 per year.

## The Impact

Remember, every small action adds up to make a big difference! If everyone made these small changes, we could collectively reduce carbon emissions by millions of tons annually.

## Get Started Today

Choose one or two items from this list to start with this week. Once they become habits, add more. The key is consistency, not perfection.

Together, we can create a more sustainable future for generations to come.`,
          author: 'Sarah Green',
          category: 'Sustainability',
          image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb869d09?ixlib=rb-4.0.3',
          images: [
            'https://images.unsplash.com/photo-1542601906990-b4d3fb869d09?ixlib=rb-4.0.3',
            'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3',
            'https://images.unsplash.com/photo-1569397954089-a9e3e4e1e4f4?ixlib=rb-4.0.3'
          ],
          createdAt: new Date('2024-01-15'),
          readTime: 5,
          views: 1250,
          likes: 89,
          comments: [],
          featured: true,
          status: 'Published',
          rating: 4.8,
          tags: ['sustainability', 'eco-friendly', 'climate-change', 'green-living'],
          difficulty: 'Beginner',
          cost: 'Free',
          location: 'Global',
          language: 'English'
        };

        setBlog(fallbackBlog);
        setRelatedBlogs([
          {
            _id: '2',
            title: 'The Future of Renewable Energy',
            excerpt: 'Explore the latest innovations in renewable energy...',
            author: 'Mike Chen',
            category: 'Renewable Energy',
            createdAt: new Date('2024-01-12'),
            readTime: 7,
            views: 980,
            likes: 67,
            image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3'
          },
          {
            _id: '3',
            title: 'Urban Gardening Guide',
            excerpt: 'Learn how to start your own urban garden...',
            author: 'Emma Davis',
            category: 'Eco-Tips',
            createdAt: new Date('2024-01-10'),
            readTime: 4,
            views: 756,
            likes: 45,
            image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [id]);

  const handleLike = async () => {
    try {
      await axiosPublic.post(`/blogs/${id}/like`);
      setIsLiked(!isLiked);
      setBlog(prev => ({
        ...prev,
        likes: isLiked ? prev.likes - 1 : prev.likes + 1
      }));
    } catch (error) {
      console.log('Like failed, but updating UI anyway');
      setIsLiked(!isLiked);
      setBlog(prev => ({
        ...prev,
        likes: isLiked ? prev.likes - 1 : prev.likes + 1
      }));
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.excerpt,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        author: 'Current User',
        content: newComment,
        createdAt: new Date(),
        rating: 5,
        avatar: '🙂'
      };
      setComments([comment, ...comments]);
      setNewComment('');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-5">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-3/4 mb-8"></div>
            <div className="h-64 bg-gray-300 rounded-lg mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              <div className="h-4 bg-gray-300 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <h1 className="heading-1 mb-4">Blog Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link to="/blogs">
            <Button>Back to Blogs</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-5">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li><Link to="/" className="hover:text-green-600">Home</Link></li>
            <li>/</li>
            <li><Link to="/blogs" className="hover:text-green-600">Blogs</Link></li>
            <li>/</li>
            <li className="text-gray-900">{blog.title}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Header */}
            <header className="mb-8">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${blog.category === 'Sustainability' ? 'bg-green-100 text-green-800' :
                    blog.category === 'Climate Change' ? 'bg-blue-100 text-blue-800' :
                      blog.category === 'Renewable Energy' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                  }`}>
                  {blog.category}
                </span>
                {blog.status && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                    {blog.status}
                  </span>
                )}
                {blog.difficulty && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">
                    {blog.difficulty}
                  </span>
                )}
              </div>

              <h1 className="heading-1 mb-4 text-gray-900">{blog.title}</h1>

              <p className="text-large text-gray-600 mb-6">{blog.excerpt}</p>

              {/* Author and Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <User size={16} className="text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{blog.author}</div>
                    <div className="text-xs">Environmental Expert</div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>{blog.createdAt.toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{blog.readTime} min read</span>
                </div>
                <div className="flex items-center gap-1">
                  <Globe size={14} />
                  <span>{blog.language}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={handleLike}
                  variant={isLiked ? 'default' : 'ghost'}
                  className={`flex items-center gap-2 ${isLiked ? 'bg-red-500 hover:bg-red-600' : 'border border-gray-300'
                    }`}
                >
                  <Heart size={16} className={isLiked ? 'fill-current' : ''} />
                  {blog.likes} Likes
                </Button>
                <Button
                  onClick={handleShare}
                  variant="ghost"
                  className="flex items-center gap-2 border border-gray-300"
                >
                  <Share2 size={16} />
                  Share
                </Button>
                <Button
                  onClick={handleBookmark}
                  variant="ghost"
                  className={`flex items-center gap-2 border ${isBookmarked ? 'border-green-500 text-green-600' : 'border-gray-300'
                    }`}
                >
                  <Bookmark size={16} className={isBookmarked ? 'fill-current' : ''} />
                  {isBookmarked ? 'Saved' : 'Save'}
                </Button>
              </div>
            </header>

            {/* Multiple Images/Media */}
            {blog.images && blog.images.length > 0 && (
              <div className="mb-8">
                <h2 className="heading-3 mb-4">Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {blog.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`${blog.title} - Image ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg flex items-center justify-center">
                        <button className="opacity-0 group-hover:opacity-100 bg-white text-gray-900 px-3 py-1 rounded-lg text-sm">
                          View Full Size
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Overview/Description Section */}
            <section className="mb-12">
              <h2 className="heading-2 mb-6">Overview</h2>
              <div className="prose prose-lg max-w-none">
                {blog.content.split('\n').map((paragraph, index) => {
                  if (paragraph.startsWith('#')) {
                    const level = paragraph.match(/^#+/)[0].length;
                    const Tag = `h${Math.min(level + 1, 6)}`;
                    return <Tag key={index} className="mb-4 text-gray-900">{paragraph.replace(/^#+\s/, '')}</Tag>;
                  } else if (paragraph.startsWith('##')) {
                    return <h3 key={index} className="heading-3 mb-3 text-gray-900">{paragraph.replace(/^##\s/, '')}</h3>;
                  } else if (paragraph.trim()) {
                    return <p key={index} className="mb-4 text-gray-600 leading-relaxed">{paragraph}</p>;
                  }
                  return null;
                })}
              </div>
            </section>

            {/* Key Information/Specs/Rules Section */}
            <section className="mb-12">
              <h2 className="heading-2 mb-6">Key Information</h2>
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Tag className="text-green-600" size={20} />
                      <div>
                        <div className="font-semibold text-gray-900">Category</div>
                        <div className="text-gray-600">{blog.category}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="text-green-600" size={20} />
                      <div>
                        <div className="font-semibold text-gray-900">Reading Time</div>
                        <div className="text-gray-600">{blog.readTime} minutes</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Award className="text-green-600" size={20} />
                      <div>
                        <div className="font-semibold text-gray-900">Difficulty</div>
                        <div className="text-gray-600">{blog.difficulty || 'Beginner'}</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <DollarSign className="text-green-600" size={20} />
                      <div>
                        <div className="font-semibold text-gray-900">Cost</div>
                        <div className="text-gray-600">{blog.cost || 'Free'}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="text-green-600" size={20} />
                      <div>
                        <div className="font-semibold text-gray-900">Location</div>
                        <div className="text-gray-600">{blog.location || 'Global'}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="text-green-600" size={20} />
                      <div>
                        <div className="font-semibold text-gray-900">Language</div>
                        <div className="text-gray-600">{blog.language || 'English'}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                {blog.tags && blog.tags.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="font-semibold text-gray-900 mb-3">Tags</div>
                    <div className="flex flex-wrap gap-2">
                      {blog.tags.map((tag, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Reviews/Ratings Section */}
            <section className="mb-12">
              <h2 className="heading-2 mb-6">Reviews & Ratings</h2>

              {/* Rating Summary */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900">{blog.rating}</div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < Math.floor(blog.rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-gray-600">{blog.views} reviews</div>
                    </div>
                    <div className="flex-1">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center gap-2 mb-1">
                          <span className="text-sm text-gray-600 w-3">{rating}</span>
                          <Star size={12} className="text-yellow-500 fill-current" />
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-yellow-500 h-2 rounded-full"
                              style={{ width: `${rating === 5 ? 60 : rating === 4 ? 25 : 10}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-2">Rate this article:</div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          onClick={() => setUserRating(rating)}
                          className="p-1"
                        >
                          <Star
                            size={20}
                            className={rating <= userRating ? 'text-yellow-500 fill-current cursor-pointer' : 'text-gray-300 cursor-pointer'}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Comments */}
              <div className="space-y-4">
                <h3 className="heading-3">Comments ({comments.length})</h3>

                {/* Add Comment */}
                <form onSubmit={handleCommentSubmit} className="bg-white rounded-lg border border-gray-200 p-6">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your thoughts..."
                    className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    rows="3"
                  ></textarea>
                  <div className="flex justify-end mt-3">
                    <Button type="submit" disabled={!newComment.trim()}>
                      Post Comment
                    </Button>
                  </div>
                </form>

                {/* Comments List */}
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="bg-white rounded-lg border border-gray-200 p-6">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-lg">
                          {comment.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <div className="font-semibold text-gray-900">{comment.author}</div>
                              <div className="text-xs text-gray-600">
                                {comment.createdAt.toLocaleDateString()}
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  size={12}
                                  className={i < comment.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-600">{comment.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Stats */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
              <h3 className="heading-3 mb-4">Article Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Views</span>
                  <span className="font-semibold">{blog.views}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Likes</span>
                  <span className="font-semibold">{blog.likes}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Comments</span>
                  <span className="font-semibold">{comments.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rating</span>
                  <span className="font-semibold">{blog.rating}/5.0</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
              <h3 className="heading-3 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button
                  onClick={handleLike}
                  variant={isLiked ? 'default' : 'ghost'}
                  className={`w-full flex items-center justify-center gap-2 ${isLiked ? 'bg-red-500 hover:bg-red-600' : 'border border-gray-300'
                    }`}
                >
                  <Heart size={16} className={isLiked ? 'fill-current' : ''} />
                  {isLiked ? 'Liked' : 'Like Article'}
                </Button>
                <Button
                  onClick={handleShare}
                  variant="ghost"
                  className="w-full flex items-center justify-center gap-2 border border-gray-300"
                >
                  <Share2 size={16} />
                  Share
                </Button>
                <Button
                  onClick={handleBookmark}
                  variant="ghost"
                  className={`w-full flex items-center justify-center gap-2 border ${isBookmarked ? 'border-green-500 text-green-600' : 'border-gray-300'
                    }`}
                >
                  <Bookmark size={16} className={isBookmarked ? 'fill-current' : ''} />
                  {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Related/Suggested Items Section */}
        {relatedBlogs.length > 0 && (
          <section className="mt-16">
            <h2 className="heading-2 mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedBlogs.map((relatedBlog) => (
                <div key={relatedBlog._id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                  <Link to={`/blog/${relatedBlog._id}`}>
                    <img
                      src={relatedBlog.image}
                      alt={relatedBlog.title}
                      className="w-full h-48 object-cover"
                    />
                  </Link>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-gray-600 mb-3">
                      <span className="px-2 py-1 bg-gray-100 rounded-full">{relatedBlog.category}</span>
                      <span>{relatedBlog.readTime} min read</span>
                    </div>
                    <Link to={`/blog/${relatedBlog._id}`}>
                      <h3 className="font-semibold text-gray-900 mb-2 hover:text-green-600 transition-colors">
                        {relatedBlog.title}
                      </h3>
                    </Link>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{relatedBlog.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{relatedBlog.author}</span>
                      <span>{relatedBlog.createdAt.toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default BlogDetails;
