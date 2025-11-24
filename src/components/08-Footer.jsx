import React from 'react';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-700 text-white py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Enlaces principales del footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Educational Tools */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white">Educational Tools</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              <li><a href="#" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors">Learning Library</a></li>
              <li><a href="#" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors">Worksheets</a></li>
              <li><a href="#" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors">Games</a></li>
              <li><a href="#" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors">Interactive Worksheets</a></li>
              <li><a href="#" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors">Worksheet Generator</a></li>
              <li><a href="#" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors">Lesson Plans</a></li>
              <li><a href="#" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors">Common Core Resources</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white">Support</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              <li><a href="#" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors">Help center</a></li>
              <li><a href="#" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors">Education.com For Schools</a></li>
              <li><a href="#" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors">Get a Quote</a></li>
              <li><a href="#" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors">Give Gift</a></li>
              <li><a href="#" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors">Redeem Gift</a></li>
              <li><a href="#" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white">Connect</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              <li><a href="#" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors">Tell us what you think</a></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white">About</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              <li><a href="#" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors">Company</a></li>
              <li><a href="#" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors">Press</a></li>
              <li><a href="#" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors">Reviews</a></li>
              <li><a href="#" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors">COPPA Privacy Policy</a></li>
              <li><a href="#" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Redes sociales */}
        <div className="flex justify-center flex-wrap gap-3 sm:gap-4 mb-6 sm:mb-8">
          <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
            <Facebook className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
          </a>
          <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
            <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
          </a>
          <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
            <Twitter className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
          </a>
          <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
            <Youtube className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
          </a>
          <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
            <div className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 font-bold text-xs sm:text-sm flex items-center justify-center">P</div>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;