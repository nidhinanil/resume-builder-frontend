import apiService from  "../api/apiService" ;


// saveResumeAPI: add resume details to JSON server

export const saveResumeAPI = async(resumeDetails)=>{
    return await apiService('POST',`/resumes`,resumeDetails)
}

//viewResumeAPI: called by view component when a resume added

export const viewResumeAPI = async(resumeId)=>{
    return await apiService('GET', `/resumes/${resumeId}`,{})
}

//AllResumeAPI: called by allresumes component when pages loaded

export const allResumeAPI = async(resumeId)=>{
    return await apiService('GET', `/resumes`,{})
}

//DownloadAPI: called by viewresume component when resume is displayed

export const downloadAPI = async (resumeDetails)=>{
    return await apiService('POST', `/downloads`, resumeDetails)
}

//getAllDownloadAPI: called by download component when resume downloaded

export const getAlldownloadAPI = async ()=>{
    return await apiService('GET', `/downloads`,{})
}

// updateResumeAPI: called by the Edit component to save updated resume details to the server
export const updateResumeAPI = async (resumeId, resumeDetails) => {
    return await apiService('PUT', `/resumes/${resumeId}`, resumeDetails);
}

// Delete a resume by ID
export const deleteResumeAPI = async (resumeId) => {
    return await apiService("DELETE", `/resumes/${resumeId}`, {})
}