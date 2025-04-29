"use client";

import OtpLogin from "@/components/OtpLogin";
import { Shield, Lock, CheckCircle, Globe } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-900 flex flex-col items-center justify-between">
      {/* Header */}
      <header className="w-full p-6">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center mr-3">
              <Shield className="h-5 w-5 text-blue-600" />
            </div>
            <h1 className="text-xl font-bold text-white">SecureAuth</h1>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-white hover:text-blue-200 transition-colors">Features</a>
            <a href="#" className="text-white hover:text-blue-200 transition-colors">Pricing</a>
            <a href="#" className="text-white hover:text-blue-200 transition-colors">Support</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 flex flex-col-reverse md:flex-row items-center justify-between w-full max-w-7xl">
        {/* Left Side - Authentication */}
        <div className="w-full md:w-1/2 md:pr-8 mt-12 md:mt-0">
          {/* The OtpLogin component we enhanced with professional styling */}
          <OtpLogin />
        </div>
        
        {/* Right Side - Content */}
        <div className="w-full md:w-1/2 mb-12 md:mb-0 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Secure Authentication <span className="text-blue-300">Made Simple</span>
          </h2>
          
          <p className="text-xl text-blue-100 mb-8 max-w-lg mx-auto md:mx-0">
            Industry-leading authentication to protect your digital identity with seamless verification.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-xl border border-white border-opacity-20">
              <Shield className="h-10 w-10 text-blue-800 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Enhanced Security</h3>
              <p className="text-black">Multi-factor authentication with advanced encryption</p>
            </div>
            
            <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-xl border border-white border-opacity-20">
              <Globe className="h-10 w-10 text-blue-800 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Global Access</h3>
              <p className="text-black">International phone verification across all countries</p>
            </div>
            
            <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-xl border border-white border-opacity-20">
              <Lock className="h-10 w-10 text-blue-800 mb-4" />
              <h3 className="text-xl font-semibold text-black mb-2">Privacy First</h3>
              <p className="text-black">Your data is encrypted and never shared with third parties</p>
            </div>
            
            <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-xl border border-white border-opacity-20">
              <CheckCircle className="h-10 w-10 text-blue-800 mb-4" />
              <h3 className="text-xl font-semibold text-black">Easy Integration</h3>
              <p className="text-black">Seamless integration with your existing applications</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center justify-start space-x-8 mt-12">
            <div className="flex items-center">
              <div className="bg-blue-500 h-12 w-12 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-white font-semibold">10M+</p>
                <p className="text-blue-200 text-sm">Verifications</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="bg-indigo-500 h-12 w-12 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-white font-semibold">99.9%</p>
                <p className="text-blue-200 text-sm">Uptime</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="bg-purple-500 h-12 w-12 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-white font-semibold">5000+</p>
                <p className="text-blue-200 text-sm">Clients</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-8 bg-black bg-opacity-30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-white mb-6 md:mb-0">
              <p>© 2025 SecureAuth. All rights reserved.</p>
            </div>
            
            <div className="flex space-x-8">
              <a href="#" className="text-blue-200 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}