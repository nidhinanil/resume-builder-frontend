import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAlldownloadAPI } from '../services/allAPI';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '8px',
};

function Downloads() {
  const [downloadList, setDownloadList] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // chart data
  const [label, setLabel] = useState([]);
  const [value, setValue] = useState([]);

  const colorPallete = ['#2596be', '#43d45b', '#5a2b19', '#bbe8ea', '#f7b769', '#043f77'];
  const backgroundColor = label.map((value, index) => colorPallete[index % colorPallete.length]);

  const data = {
    labels: label,
    datasets: [{
      label: 'Downloads',
      data: value,
      backgroundColor
    }]
  };

  useEffect(() => {
    getDownloads();
  }, []);

  const getDownloads = async () => {
    const response = await getAlldownloadAPI();
    if (response.status == '200') {
      setDownloadList(response.data);

      const output = {};
      response.data.forEach(item => {
        // This chain safely checks all possible keys you've used historically 
        const currentJob = item.jobRole || item.jobTitle || item.job || "Other";

        if (currentJob in output) {
          output[currentJob] += 1;
        } else {
          output[currentJob] = 1;
        }
      });

      setLabel(Object.keys(output));
      setValue(Object.values(output));
    }
  };

  return (
    <div className='container my-5'>
      <div className="d-flex justify-content-between align-items-center">
        <h2>All Downloads Resume Details</h2>
        <button
          onClick={handleOpen}
          style={{ background: '#714a2f' }}
          className='btn text-light'
        >
          View in Chart
        </button>
      </div>

      {downloadList.length > 0 && (
        <p className='my-3 fw-bolder'>
          Total Downloaded Resumes from our site is <span className='text-danger fs-4'>{downloadList.length}</span>
        </p>
      )}

      <div className='row my-5'>
        {downloadList.length > 0 ? (
          downloadList.map((resume) => (
            <div key={resume?.id} className='col-lg-4 mb-3'>
              <div style={{ height: '400px' }} className='shadow p-3 rounded'>
                <h6>Review at : {resume?.timeStamp}</h6>
                <div className='mt-3 text-center'>
                  <Link to={`/resume/view/${resume?.resumeID}`}>
                    <img className='w-100' height={'300px'} src={resume?.resumeImg} alt="download cv" />
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>There are no resumes downloaded yet.</p>
        )}
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            CV Download Count by Job Role
          </Typography>
          <Box id="modal-modal-description" sx={{ mt: 2 }}>

            <div className='d-flex justify-content-center align-items-center m-5'>
              {/* Ensures Pie only renders when data has been successfully parsed */}
              {label.length > 0 ? (
                <Pie data={data} />
              ) : (
                <p>Loading chart data...</p>
              )}
            </div>

            <p style={{ textAlign: 'justify' }}>This chart provides an overview of the number of CV downloads associated with different job roles on the website. It helps visualize the demand and engagement for CVs across various career categories, making it easier to identify which job roles attract the highest number of downloads. By comparing download counts across roles, the chart can provide useful insights into user preferences and the popularity of different career opportunities on the platform.</p>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default Downloads;