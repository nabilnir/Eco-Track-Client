import React from 'react';
import { Link } from 'react-router';
import { Calendar, Clock, Heart, MessageCircle, User, Star, MapPin, DollarSign } from 'lucide-react';

const BlogCard = ({ blog, variant = 'default', loading = false }) => {
  // Skeleton loader
  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md animate-pulse">
        <div className="h-48 bg-gray-300"></div>
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-4 bg-gray-300 rounded w-20"></div>
            <div className="h-4 bg-gray-300 rounded w-24"></div>
            <div className="h-4 bg-gray-300 rounded w-16"></div>
          </div>
          <div className="h-6 bg-gray-300 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-4 bg-gray-300 rounded w-8"></div>
              <div className="h-4 bg-gray-300 rounded w-8"></div>
              <div className="h-4 bg-gray-300 rounded w-8"></div>
            </div>
            <div className="h-8 bg-gray-300 rounded w-24"></div>
          </div>
        </div>
      </div>
    );
  }

  const {
    _id,
    title,
    excerpt,
    content,
    author,
    category,
    image,
    createdAt,
    readTime,
    views,
    likes,
    comments,
    featured,
    price,
    location,
    rating,
    status
  } = blog;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Sustainability': 'bg-green-100 text-green-800',
      'Climate Change': 'bg-blue-100 text-blue-800',
      'Renewable Energy': 'bg-yellow-100 text-yellow-800',
      'Wildlife': 'bg-purple-100 text-purple-800',
      'Recycling': 'bg-gray-100 text-gray-800',
      'Conservation': 'bg-emerald-100 text-emerald-800',
      'Eco-Tips': 'bg-teal-100 text-teal-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status) => {
    const colors = {
      'Published': 'bg-green-100 text-green-800',
      'Draft': 'bg-yellow-100 text-yellow-800',
      'Archived': 'bg-gray-100 text-gray-800',
      'Featured': 'bg-purple-100 text-purple-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  // Standard card dimensions and styling
  const cardStyles = variant === 'featured' 
    ? 'md:col-span-2 lg:col-span-3 bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200'
    : 'bg-white border border-gray-200';

  return (
    <div className={`rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col ${cardStyles}`}>
      {/* Image Section - Fixed Height */}
      <div className="relative h-48 bg-gradient-to-br from-green-400 to-blue-500 flex-shrink-0">
        {image ? (
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-6xl text-white/80">🌱</span>
          </div>
        )}
        
        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Featured
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(category)}`}>
            {category}
          </span>
        </div>

        {/* Status Badge */}
        {status && (
          <div className="absolute bottom-3 left-3">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(status)}`}>
              {status}
            </span>
          </div>
        )}
      </div>

      {/* Content Section - Flex Grow */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Meta Info - Price, Date, Location, Rating */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600 mb-4">
          {price && (
            <div className="flex items-center gap-1 font-semibold text-green-600">
              <DollarSign size={12} />
              <span>{price}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Calendar size={12} />
            <span>{formatDate(createdAt)}</span>
          </div>
          {location && (
            <div className="flex items-center gap-1">
              <MapPin size={12} />
              <span>{location}</span>
            </div>
          )}
          {readTime && (
            <div className="flex items-center gap-1">
              <Clock size={12} />
              <span>{readTime} min</span>
            </div>
          )}
          {rating && (
            <div className="flex items-center gap-1">
              <Star size={12} className="text-yellow-500 fill-current" />
              <span>{rating}</span>
            </div>
          )}
        </div>

        {/* Title - Consistent Typography */}
        <Link to={`/blog/${_id}`} className="group">
          <h3 className="font-bold text-gray-900 text-lg mb-3 line-clamp-2 group-hover:text-green-600 transition-colors">
            {title}
          </h3>
        </Link>

        {/* Short Description - Fixed Height */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
          {excerpt || (content ? content.substring(0, 120) + '...' : '')}
        </p>

        {/* Additional Meta Info - Author, Views, Likes, Comments */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <User size={12} />
            <span>{author}</span>
          </div>
          <div className="flex items-center gap-3">
            {views && (
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 bg-gray-300 rounded-full flex items-center justify-center text-xs">👁</span>
                <span>{views}</span>
              </div>
            )}
            {likes && (
              <div className="flex items-center gap-1">
                <Heart size={12} className="text-red-500" />
                <span>{likes}</span>
              </div>
            )}
            {comments && comments.length > 0 && (
              <div className="flex items-center gap-1">
                <MessageCircle size={12} />
                <span>{comments.length}</span>
              </div>
            )}
          </div>
        </div>

        {/* View Details Button - Fixed at Bottom */}
        <div className="mt-auto pt-4 border-t border-gray-100">
          <Link 
            to={`/blog/${_id}`}
            className="inline-flex items-center justify-center w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
          >
            View Details
            <span className="ml-1">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
