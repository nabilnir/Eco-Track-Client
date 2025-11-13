// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaLeaf } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';


const Footer = () => {
  return (
    
    <footer className="bg-gray-800 text-gray-300 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 border-b border-gray-700 pb-10">
          
          {/* Section 1: Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-2xl font-bold text-green-400">
              <FaLeaf className="text-3xl" />
              <span>EcoTrack</span>
            </div>
            <p className="text-sm">
              Building a sustainable future together through community-driven environmental action.
            </p>
            
            {/* Social Icons */}
            <div className="flex space-x-4 pt-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                 className="text-gray-400 hover:text-white transition duration-200 text-xl">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)"
                 className="text-gray-400 hover:text-white transition duration-200 text-xl">
                <FaXTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                 className="text-gray-400 hover:text-white transition duration-200 text-xl">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                 className="text-gray-400 hover:text-white transition duration-200 text-xl">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
          
          {/* Section 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-green-400 transition duration-200">Home</Link></li>
              <li><Link to="/challenges" className="hover:text-green-400 transition duration-200">Challenges</Link></li>
              <li><Link to="/my-activities" className="hover:text-green-400 transition duration-200">My Activities</Link></li>
              <li><a href="#about" className="hover:text-green-400 transition duration-200">About Us</a></li>
            </ul>
          </div>
          
          {/* Section 3: Support */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#contact" className="hover:text-green-400 transition duration-200">Contact Us</a></li>
              <li><a href="#faq" className="hover:text-green-400 transition duration-200">FAQ</a></li>
              <li><a href="#privacy" className="hover:text-green-400 transition duration-200">Privacy Policy</a></li>
              <li><a href="#accessibility" className="hover:text-green-400 transition duration-200">Accessibility</a></li>
            </ul>
          </div>
          
          {/* Section 4: Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Newsletter</h3>
            <p className="text-sm">Stay updated with our latest challenges and eco-tips.</p>
            <div className="flex flex-col space-y-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="w-full p-3 rounded-lg border border-gray-700 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400" 
              />
              <button 
                className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200 font-semibold shadow-md"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        {/* Footer Bottom (Copyright & Note) */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 text-sm text-gray-400 space-y-3 md:space-y-0">
          <p>&copy; 2025 EcoTrack. All rights reserved.</p>
          <p className="text-center md:text-right">
            Committed to accessibility and environmental sustainability
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;