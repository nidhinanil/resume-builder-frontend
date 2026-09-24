import React from 'react'
import { Link } from 'react-router-dom'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

function Footer() {
  return (
    <div className="bg-primary text-white py-5 mt-5">
      <div className="container text-center">
        {/* Brand & Tagline */}
        <h5 className="mb-3" style={{ fontFamily: 'Solway' }}>AI-Resume Builder</h5>
        <p className="small mb-4 text-white-50">
          Designed To Get Hired. Your Skills, Your Story, Your Next Job - All In One.
        </p>

        {/* Social Links */}
        <div className="d-flex justify-content-center gap-4 mb-4">
          <Link to="/" className="text-white fs-4"><FaGithub /></Link>
          <Link to="/" className="text-white fs-4"><FaLinkedin /></Link>
          <Link to="/" className="text-white fs-4"><FaTwitter /></Link>
        </div>

        <hr className="border-white-50" />

        {/* Copyright */}
        <p className="mb-0 small text-white-50 mt-3">
          &copy; {new Date().getFullYear()} AI-Resume Builder. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default Footer