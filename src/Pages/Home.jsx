import React from 'react';
import { Navigation, HeroSection, Section, Card, Button, Badge } from '../components/UI';
import { Link } from 'react-router';
import Testimonials from '../components/Home/Testimonials';
import BrandCarousel from '../components/Home/BrandCarousel';
import BlogSection from '../components/Home/BlogSection';


const HomePage = () => {
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Challenges', href: '/challenges' },
    { label: 'Activities', href: '/activities' },
    { label: 'Events', href: '/events' },
    { label: 'Blogs', href: '/blogs' },
    { label: 'Tips', href: '/tips' },
  ];

  const features = [
    {
      title: 'Track Activities',
      description: 'Monitor your daily eco-friendly activities and see your environmental impact in real-time.',
      icon: '🌱',
      badge: 'Popular'
    },
    {
      title: 'Join Challenges',
      description: 'Participate in community challenges and compete with friends to make a bigger impact.',
      icon: '🏆',
      badge: 'New'
    },
    {
      title: 'Earn Rewards',
      description: 'Get recognized for your contributions and earn rewards for sustainable living.',
      icon: '🎁',
      badge: null
    },
  ];

  const stats = [
    { number: '10K+', label: 'Active Users' },
    { number: '500+', label: 'Eco Activities' },
    { number: '50K', label: 'CO₂ Saved (kg)' },
    { number: '100+', label: 'Challenges' },
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <Navigation 
        logo="EcoTrack"
        navItems={navItems}
      />

      {/* Hero Section */}
      <HeroSection
        title="Track Your Eco Journey"
        subtitle="Make Every Action Count"
        description="Join thousands of eco-warriors tracking their environmental impact and making a real difference in the world."
        primaryCTA={{ label: 'Get Started', href: '/register' }}
        secondaryCTA={{ label: 'Learn More', href: '/about' }}
      />

      {/* Features Section */}
      <Section 
        title="Powerful Features"
        subtitle="Everything you need to track and improve your environmental impact"
        variant="light"
      >
        <div className="grid-auto">
          {features.map((feature, index) => (
            <Card key={index} hover={true}>
              <div className="text-4xl mb-4">{feature.icon}</div>
              {feature.badge && (
                <Badge variant="green" size="sm" className="mb-3">
                  {feature.badge}
                </Badge>
              )}
              <h3 className="heading-3 mb-3">{feature.title}</h3>
              <p className="text-text-muted leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Stats Section */}
      <Section variant="gradient">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* How It Works */}
      <Section 
        title="How It Works"
        subtitle="Get started in three simple steps"
        variant="light"
      >
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <Badge variant="number" size="lg" number="1" className="mx-auto mb-4" />
            <h3 className="heading-3 mb-3">Sign Up</h3>
            <p className="text-text-muted">
              Create your free account and set up your eco profile in minutes.
            </p>
          </div>
          <div className="text-center">
            <Badge variant="number" size="lg" number="2" className="mx-auto mb-4" />
            <h3 className="heading-3 mb-3">Track Activities</h3>
            <p className="text-text-muted">
              Log your daily eco-friendly activities and watch your impact grow.
            </p>
          </div>
          <div className="text-center">
            <Badge variant="number" size="lg" number="3" className="mx-auto mb-4" />
            <h3 className="heading-3 mb-3">Join Challenges</h3>
            <p className="text-text-muted">
              Participate in challenges and compete with the community.
            </p>
          </div>
        </div>
      </Section>

      {/* Testimonials */}
      <Testimonials />

      {/* Brand Carousel */}
      <BrandCarousel />

      {/* Blog Section */}
      <BlogSection />

      {/* CTA Section */}
      <Section variant="gradient">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="heading-2 mb-4">Ready to Make a Difference?</h2>
          <p className="text-large text-text-light/90 mb-8">
            Join thousands of people already tracking their environmental impact and building a sustainable future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg">
              Start Your Journey
            </Button>
            <Button variant="ghost" size="lg" className="text-lg">
              View Demo
            </Button>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-dark-bg text-text-light py-16 px-5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold font-heading mb-4">EcoTrack</h3>
              <p className="text-text-muted mb-6">
                Track your eco-friendly activities and make a positive impact on the environment.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link to="/features" className="text-text-muted hover:text-text-light">Features</Link></li>
                <li><Link to="/challenges" className="text-text-muted hover:text-text-light">Challenges</Link></li>
                <li><Link to="/activities" className="text-text-muted hover:text-text-light">Activities</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-text-muted hover:text-text-light">About</Link></li>
                <li><Link to="/blog" className="text-text-muted hover:text-text-light">Blog</Link></li>
                <li><Link to="/contact" className="text-text-muted hover:text-text-light">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><Link to="/help" className="text-text-muted hover:text-text-light">Help Center</Link></li>
                <li><Link to="/privacy" className="text-text-muted hover:text-text-light">Privacy</Link></li>
                <li><Link to="/terms" className="text-text-muted hover:text-text-light">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 text-center">
            <p className="text-text-muted text-sm">
              © {new Date().getFullYear()} EcoTrack. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
