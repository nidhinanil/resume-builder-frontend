import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import React from 'react'

function Preview({ resumeData }) {
  return (
    <>
      {/* Added a shadow box and white background to make it look like a piece of paper */}
      <div className="w-100 shadow-sm p-4 rounded bg-white border">
        {/* Added placeholder text for every field */}
        <h2>{resumeData?.fullName || "Your Full Name"}</h2>
        <p className="fs-6 lh-1">Phone: {resumeData?.phone || "Not provided"}</p>
        <p className="fs-6 lh-1">Email: {resumeData?.email || "Not provided"}</p>
        <p className="fs-6 lh-1">Linkedin: {resumeData?.linkedin || "Not provided"}</p>
        <p className="fs-6 lh-1">Github: {resumeData?.github || "Not provided"}</p>
        <p className="fs-6 lh-1">Location: {resumeData?.location || "Not provided"}</p>
        <Divider className="bg-dark my-3" />

        <h4>Professional Summary</h4>
        <p>{resumeData?.summary || "Your AI-generated summary will appear here once you proceed to the final step."}</p>
        <Divider className="bg-dark my-3" />

        <h4>Technical Skills</h4>
        {resumeData?.skills?.length > 0 ? (
          resumeData.skills.map(skill => (
            <span key={skill} className="me-2">
              <Button variant="text" className='text-dark'>{skill}</Button>
            </span>
          ))
        ) : (
          <p className="text-muted">AI-generated skills will populate here.</p>
        )}
        <Divider className="bg-dark my-3" />

        <h4>Education</h4>
        <p className="fs-6 lh-1">Bachelor's Degree in: {resumeData?.degree || "..."}</p>
        <p className="fs-6 lh-1">University/College Name: {resumeData?.college || "..."}</p>
        <p className="fs-6 lh-1">Year of Graduation: {resumeData?.year || "..."}</p>
      </div>
    </>
  )
}

export default Preview
