import React, { useEffect, useState } from "react";
import { FaFileDownload } from "react-icons/fa";
import { AiFillBackward } from "react-icons/ai";
import Preview from '../Components/Preview';
import Edit from '../Components/Edit';
import { Form, generatePath, Link, useParams } from 'react-router-dom';
import { downloadAPI, viewResumeAPI } from '../services/allAPI';
import { useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

function ViewResume() {
  const { id } = useParams();

  const [resume, setResume] = useState({});
  const previewRef = useRef();

  useEffect(() => {
    getAresume();
  }, [id]);

  const getAresume = async () => {
    const response = await viewResumeAPI(id);
    if (response.status === 200) {
      setResume(response.data);
    }
  };

  const downloadCV = async () => {
    const previewTag = previewRef.current;
    const canvas = await html2canvas(previewTag);

    const pdfImageData = canvas.toDataURL("image/png");

    canvas.toBlob(async (ImgFile) => {
      try {
        const formData = new FormData();
        formData.append("file", ImgFile);
        formData.append("upload_preset", "resume");

        const response = await fetch("https://api.cloudinary.com/v1_1/acqwm3rr/image/upload", {
          method: "POST",
          body: formData,
        });

        const ServerData = await response.json();
        const Url = ServerData.secure_url;
        console.log("Cloudinary URL:", Url);

        // Pass the canvas image data for the PDF, and the Cloudinary URL for the database
        generatePDF(pdfImageData, Url);

      } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
      }
    });
  };

  const generatePDF = async (pdfImageData, cloudinaryUrl) => {
    let today = new Date();
    let timeStamp = `${today.toLocaleDateString()},${today.toLocaleTimeString()}`;

    const pdf = new jsPDF();
    const imageWidth = pdf.internal.pageSize.getWidth();
    const imageHeight = pdf.internal.pageSize.getHeight();

    // Draw the PDF using the raw canvas data
    pdf.addImage(pdfImageData, "PNG", 0, 0, imageWidth, imageHeight);

    // Save ONLY the Cloudinary URL to your database
    const downloadDetails = {
      timeStamp,
      resumeID: id,
      resumeImg: cloudinaryUrl,
      jobRole: resume.job // Added job role to populate chart data
    };

    const result = await downloadAPI(downloadDetails);

    // Trigger the PDF download only if the database save was successful
    if (result.status === 201 || result.status === '201') {
      pdf.save(`${resume.fullName}-CV.pdf`);
    }
  };

  return (
    <>
      <div className='container my-5'>
        <div className="row">
          <div className="col-lg-2"></div>
          <div className="col-lg-8">
            {/* navigation icons */}
            <div className="d-flex justify-content-center align-items-center">
              {/* download */}
              <button onClick={downloadCV} style={{ color: '#714a2f' }} className="btn me-2"><FaFileDownload className='fs-5' /> Download CV</button>
              {/* edit */}
              <Edit resumeData={resume} setResumeData={setResume} />
              {/* back */}
              <Link to={'/'} style={{ color: '#714a2f' }} className='btn '><AiFillBackward className='fs-3' /> Home </Link>
            </div>
            {/* preview component */}
            <div className="p-5" ref={previewRef}>
              <Preview resumeData={resume} />
            </div>
          </div>
          <div className="col-lg-2"></div>
        </div>
      </div>
    </>
  )
}

export default ViewResume;
