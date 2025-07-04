import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';
import FeatureCard from '../components/FeatureCard';
import TestimonialCard from '../components/TestimonialCard';
import FloatingBenefit from '../components/FloatingBenefit';




const Landing = () => {
  const [showCTA, setShowCTA] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCTA(true);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen w-screen overflow-x-hidden bg-gradient-to-br from-green-50 via-emerald-100 to-teal-100 text-gray-900 relative">
      {/* Navigation */}
      <nav className="w-full p-6 flex justify-between items-center relative z-10">
        <div className="flex items-center space-x-2">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-600">
            <path d="M20 8l-8-4-12 6 12 6 8-4v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-2xl font-bold text-green-700">DriveLogix</span>
        </div>
        <div className="hidden md:flex space-x-8 text-green-800">
          <a href="#features" className="hover:text-green-600 transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-green-600 transition-colors">How It Works</a>
          <a href="#testimonials" className="hover:text-green-600 transition-colors">Testimonials</a>
        </div>
        <div className="flex space-x-4">
          <Link to="/login">
            <button className="px-4 py-2 rounded-lg text-green-700 border border-green-600 hover:bg-green-600 hover:text-white transition-colors">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors">
              Sign Up
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="w-full flex flex-col lg:flex-row items-center justify-between px-4 md:px-8 lg:px-16 py-12">
        {/* Left Side Content */}
        <div className="lg:w-1/2 z-10 relative">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 hero-gradient-text">
            Your Complete<br />Driving Companion
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-lg">
            Track your journeys, monitor fuel usage, manage vehicle documents, and receive timely reminders in one intuitive dashboard.
          </p>

          {/* Call-to-action with animation */}
          <div className={`transform transition-all duration-1000 ${showCTA ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <Link to="/register">
              <button className="cta-button px-8 py-4 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300">
                Start Your Free Trial
              </button>
            </Link>
            <p className="mt-4 text-gray-600 text-sm">No credit card required • Free 30-day trial</p>
          </div>

          {/* Floating benefits */}
          <FloatingBenefit text="✓ Track kilometers effortlessly" delay="1.2" position="top-0 -right-32 hidden lg:block" />
          <FloatingBenefit text="✓ Automatic fuel efficiency calculations" delay="1.8" position="top-24 -right-24 hidden lg:block" />
          <FloatingBenefit text="✓ Document expiry reminders" delay="2.4" position="top-48 -right-16 hidden lg:block" />
        </div>

        {/* Right Side Image */}
        <div className="lg:w-1/2 mt-12 lg:mt-0 relative">
          <div className="relative bg-white/40 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-green-200/50 p-4 float-element">
            <img
              src="https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&q=80&w=2000"
              alt="Dashboard preview"
              className="rounded-lg shadow-inner w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-green-600/20 to-transparent rounded-lg"></div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="w-full py-16 px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Powerful Features</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Everything you need to manage your vehicle in one place</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          <FeatureCard
            icon={<i className="fas fa-route"></i>}
            title="Driving Logs"
            description="Log daily driving activities with detailed routes, distances, and purposes."
          />
          <FeatureCard
            icon={<i className="fas fa-gas-pump"></i>}
            title="Fuel Tracking"
            description="Monitor fuel consumption, costs, and calculate efficiency automatically."
          />
          <FeatureCard
            icon={<i className="fas fa-file-alt"></i>}
            title="Document Management"
            description="Store and organize all your vehicle documents in one secure location."
          />
          <FeatureCard
            icon={<i className="fas fa-bell"></i>}
            title="Smart Reminders"
            description="Never miss important deadlines with automatic expiry notifications."
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="w-full py-16 px-4 md:px-8 bg-gradient-to-r from-green-100 to-teal-100">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Getting started is quick and easy</p>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center md:items-start space-y-12 md:space-y-0 md:space-x-8 max-w-6xl mx-auto">
          <div className="flex flex-col items-center max-w-xs text-center">
            <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">1</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Create Account</h3>
            <p className="text-gray-600">Sign up for free and set up your profile with basic information.</p>
          </div>

          <div className="flex flex-col items-center max-w-xs text-center">
            <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">2</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Add Your Vehicle</h3>
            <p className="text-gray-600">Enter your vehicle details and upload relevant documents.</p>
          </div>

          <div className="flex flex-col items-center max-w-xs text-center">
            <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">3</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Start Tracking</h3>
            <p className="text-gray-600">Log your trips, record fuel usage, and enjoy the benefits!</p>
          </div>
        </div>

        <div className="text-center mt-16">
          <Link to="/register">
            <button className="px-8 py-4 bg-white text-green-600 font-bold rounded-lg text-lg shadow-md hover:shadow-lg hover:bg-green-50 transition-all duration-300 border border-green-200">
              Get Started Now
            </button>
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="w-full py-16 px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">What Our Users Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Join thousands of satisfied drivers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <TestimonialCard
            name="Sarah Johnson"
            role="Daily Commuter"
            image="bg-green-200"
            quote="DriveLogix has transformed how I track my commuting expenses. The tax report feature has saved me hours at tax time!"
          />

          <TestimonialCard
            name="Michael Chen"
            role="Business Owner"
            image="bg-teal-200"
            quote="Managing fleet documents used to be a nightmare. Now I get automatic reminders before anything expires. Absolute game changer."
          />

          <TestimonialCard
            name="Rebecca Torres"
            role="Rideshare Driver"
            image="bg-green-200"
            quote="The fuel efficiency tracking has helped me optimize my routes and save on fuel costs. I've reduced my monthly expenses by 15%!"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 px-4 md:px-8 bg-gradient-to-r from-green-500 to-teal-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Simplify Your Driving Experience?</h2>
          <p className="text-xl mb-8">Join thousands of drivers who've already discovered the benefits of DriveLogix.</p>
          <Link to="/register">
            <button className="cta-button px-8 py-4 bg-white text-green-600 font-bold rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300">
              Start Your Free Trial
            </button>
          </Link>
          <p className="mt-4 text-green-100">No credit card required • Free 30-day trial • Cancel anytime</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gray-800 text-white py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-400">
                <path d="M20 8l-8-4-12 6 12 6 8-4v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-xl font-bold text-green-400">DriveLogix</span>
            </div>
            <p className="text-gray-400">Your complete driving companion for tracking, managing, and optimizing your vehicle experience.</p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Features</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-green-400 transition-colors">Driving Logs</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Fuel Tracking</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Document Management</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Analytics Dashboard</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-green-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Stay Updated</h4>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter for tips and updates.</p>
            <div className="flex">
              <input type="email" placeholder="Your email" className="px-4 py-2 rounded-l-lg focus:outline-none text-gray-800 w-full" />
              <button className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-r-lg transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} DriveLogix. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;