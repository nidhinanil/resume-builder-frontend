import React, { useRef, useState } from 'react';
import { MdEditSquare } from "react-icons/md";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import jobRole from '../assets/jobRole.json';
import { FaXmark } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import { updateResumeAPI } from '../services/allAPI';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  maxHeight: '90vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Edit({ resumeData, setResumeData }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  // Added back the missing handleClose function
  const handleClose = () => setOpen(false);

  const skillRef = useRef();

  const removeSkill = (skill) => {
    setResumeData({ ...resumeData, skills: resumeData.skills.filter(item => item !== skill) })
  }

  const addSkill = (skill) => {
    if (skill) {
      if (resumeData?.skills?.map(item => item.toLowerCase()).includes(skill.toLowerCase())) {
        toast.warning("Given skill already exist....please add another one....")
      }
      else {
        setResumeData({ ...resumeData, skills: [...resumeData?.skills, skill] })
      }
      skillRef.current.value = ""
    }
    else {
      toast.info("Input valid Skill!!!")
    }
  }

  const handleUpdate = async () => {
    const { fullName, location, job, email, phone, github, linkedin, degree, college, year, skills,
      summary } = resumeData
    if (fullName && location && job && email && phone && github && linkedin && degree &&
      college && year && skills.length > 0 &&
      summary) {

      const response = await updateResumeAPI(resumeData.id, resumeData)
      console.log(response);
      if (response.status == "200") {
        toast.success("resume updated successfully")
        setTimeout(() => {
          handleClose()
        }, 2000)
      }
    } else {
      toast.info("please fill missing fields ")
    }
  }

  return (
    <>
      <button onClick={handleOpen} style={{ color: '#714a2f' }}
        className='btn'><MdEditSquare className='fs-3' /> Edit CV</button>

      {/* modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Details
          </Typography>

          <Box id="modal-modal-description" sx={{ mt: 2 }}>
            {/* personal details */}
            <div>
              <h3>Personal Details</h3>
              <div className="p-3 row">
                <TextField value={resumeData?.fullName || ''} onChange={e => setResumeData({ ...resumeData, fullName: e.target.value })} id="standard-basic-name" label="FullName" variant="standard" />
                <TextField value={resumeData?.location || ''} onChange={e => setResumeData({ ...resumeData, location: e.target.value })} id="standard-basic-loc" label="Location" variant="standard" />
                <FormControl variant='standard'>
                  <InputLabel id="demo-simple-select-label">Choose Job Title</InputLabel>
                  <Select labelId="demo-simple-select-label" id="demo-simple-select" value={resumeData?.job || ''} onChange={e => setResumeData({ ...resumeData, job: e.target.value })}>
                    {jobRole.jobRoles.map(job => (
                      <MenuItem key={job} value={job}>{job}</MenuItem>
                    ))
                    }
                  </Select>
                </FormControl>
              </div>
            </div>

            {/* contact details */}
            <div>
              <h3>Contact Details</h3>
              <div className="p-3 row">
                <TextField value={resumeData?.email || ''} onChange={e => setResumeData({ ...resumeData, email: e.target.value })} id="standard-basic-email" label="Email" variant="standard" />
                <TextField value={resumeData?.phone || ''} onChange={e => setResumeData({ ...resumeData, phone: e.target.value })} id="standard-basic-num" label="Contact Number" variant="standard" />
                <TextField value={resumeData?.linkedin || ''} onChange={e => setResumeData({ ...resumeData, linkedin: e.target.value })} id="standard-basic-linkedin" label="Linkedin Link" variant="standard" />
                <TextField value={resumeData?.github || ''} onChange={e => setResumeData({ ...resumeData, github: e.target.value })} id="standard-basic-github" label="Github Link" variant="standard" />
              </div>
            </div>

            {/* educational details */}
            <div>
              <h3>Educational Details</h3>
              <div className="p-3 row">
                <TextField value={resumeData?.degree || ''} onChange={e => setResumeData({ ...resumeData, degree: e.target.value })} id="standard-basic-degree" label="Bachelor's Degree" variant="standard" />
                <TextField value={resumeData?.college || ''} onChange={e => setResumeData({ ...resumeData, college: e.target.value })} id="standard-basic-college" label="College/University Name" variant="standard" />
                <TextField value={resumeData?.year || ''} onChange={e => setResumeData({ ...resumeData, year: e.target.value })} id="standard-basic-year" label="Year of Graduation" variant="standard" />
              </div>
            </div>

            {/* skills */}
            <div>
              <h3>Skills</h3>
              <div className="d-flex p-3">
                <input type="text" placeholder='Add New Skill' className="form-control" ref={skillRef} />
                <Button onClick={() => addSkill(skillRef.current.value)} style={{ color: '#714a2f' }}>Add</Button>
              </div>
              <h6>Added Skills : </h6>
              <div className="p-3 d-flex justify-content-between flex-wrap">
                {/* all skills - duplicate */}
                {resumeData?.skills?.map(skill => (
                  <Button onClick={() => removeSkill(skill)} key={skill} variant='contained' sx={{ backgroundColor: '#b19596' }} className='my-1'>{skill} <FaXmark className='ms-2' /> </Button>
                ))}
              </div>
            </div>

            {/* summary */}
            <div>
              <h3>Summary</h3>
              <div className='p-3 row'>
                <TextField value={resumeData?.summary || ''} onChange={e => setResumeData({ ...resumeData, summary: e.target.value })} id="standard-basic-Summary" label="Summary" variant="standard" />
              </div>
            </div>
            {/*Update resume */}
            <div>
              <Button onClick={handleUpdate} className='btn btn-light' style={{ color: '#714a2f' }}>Update</Button>
            </div>

          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default Edit;