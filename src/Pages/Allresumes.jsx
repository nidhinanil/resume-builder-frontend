import React, { useState, useEffect, useMemo } from 'react'
import { FaBackward, FaForward, FaSearch, FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { allResumeAPI, deleteResumeAPI } from '../services/allAPI'

function Allresumes() {
    const [allResumes, setAllResumes] = useState([])
    const [searchKey, setSearchKey] = useState("")

    const [currentPage, setCurrentPage] = useState(1)
    const rowsPerPage = 4

  
    const filteredResumes = useMemo(() => {
        return allResumes?.filter(item =>
            item?.job?.toLowerCase().includes(searchKey.toLowerCase()) ||
            item?.fullName?.toLowerCase().includes(searchKey.toLowerCase())
        ) || []
    }, [searchKey, allResumes])

    const lastIndexOfCurrentPage = currentPage * rowsPerPage
    const firstIndexOfCurrentPage = lastIndexOfCurrentPage - rowsPerPage


    const currentResumes = filteredResumes?.slice(firstIndexOfCurrentPage, lastIndexOfCurrentPage) || []
    const totalPages = Math.ceil(filteredResumes.length / rowsPerPage)

    useEffect(() => {
        getAllResumes()
    }, [])

    const getAllResumes = async () => {
        const response = await allResumeAPI()
        if (response.status == "200" || response.status === 200) {
            setAllResumes(response.data)
        }
    }

    const removeResume = async (id) => {
        if (window.confirm("Are you sure want to delete resume?")) {
            const response = await deleteResumeAPI(id)
            if (response.status >= 200 && response.status < 300) {
                getAllResumes()
            }
        }
    }

    return (
        <div>
            <div className='my-5 container d-flex justify-content-center align-items-center flex-column'>
                <h1>All Saved Resumes</h1>
                <p style={{ textAlign: 'justify' }} className="my-5">All resumes submitted to the platform in one place...</p>
                <div className='d-flex justify-content-center align-items-center w-50'>
                    <input
                        type="text"
                        placeholder='Search Candidates By Name or Job Role'
                        className='form-control'
                        onChange={(e) => { setSearchKey(e.target.value); setCurrentPage(1) }}
                    />
                    <FaSearch style={{ marginLeft: '-30px' }} />
                </div>
                <table className='my-5 table table-hover table-stripped'>
                    <thead>
                        <tr className='table-dark'>
                            <th>#</th>
                            <th>Resume</th>
                            <th>Job Role</th>
                            <th>...</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentResumes.length > 0 ? (
                            currentResumes.map((resume, index) => (
                                <tr key={resume.id}>
                                    <td>{firstIndexOfCurrentPage + index + 1}</td>
                                    <td>
                                        <Link to={`/resume/view/${resume.id}`}>
                                            {resume?.fullName?.toUpperCase()}
                                        </Link>
                                    </td>
                                    <td>{resume?.job?.toUpperCase()}</td>
                                    <td>
                                        <button
                                            onClick={() => removeResume(resume?.id)}
                                            className="btn text-danger"
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center text-danger">
                                    No resumes found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Pagination Controls */}
                {filteredResumes?.length > 0 && (
                    <div className="d-flex justify-content-center align-items-center mt-4 w-100">
                        <button
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="btn btn-secondary me-3"
                        >
                            <FaBackward />
                        </button>
                        <span className="fw-bolder">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage == totalPages}
                            className="btn btn-secondary ms-3"
                        >
                            <FaForward />
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Allresumes