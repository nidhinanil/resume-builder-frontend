import React from 'react'
import { Link } from 'react-router-dom'
import { IoDocumentText } from "react-icons/io5";
import { FaFileDownload } from "react-icons/fa";


function ResumeSteps() {
  return (
    <div>
      <div style={{minHeight:'90vh'}} className='mt-5'>
        <h1 className="text-center">Create an ATS Friendly Resume in minutes with AI</h1>
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-4 rounded p-5 shadow text-center">
            <IoDocumentText className='fs-1 text-primary mb-3'/>
            <h4>Add Your Details</h4>
            <p>Our AI will generate Skills and Summary</p>
            <h5>Step 1</h5>
            </div>
            <div className="col-md-2"></div>
            <div className="col-md-4 rounded p-5 shadow text-center">
            <FaFileDownload className='fs-1 text-danger mb-3'/>
            <h4>Download Your Details</h4>
            <p>Download CV as PDF and start applying</p>
            <h5>Step 2</h5>
            </div>
            <div className="col-md-1"></div>

          </div>

        </div>
        <div className="mt-5 text-center">
          <Link to={'/form'} style={{backgroundColor:'#225fd0'}} className='btn text-light'>Let's Start</Link>

        </div>

      </div>
      
    </div>
  )
}

export default ResumeSteps
