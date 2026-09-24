
import './App.css'
import Footer from './Components/Footer'
import Header from './Components/Header'
import Downloads from './Pages/Downloads'
import Home from './Pages/Home'
import ResumeSteps from './Pages/ResumeSteps'
import UserForm from './Pages/UserForm'
import ViewResume from './Pages/ViewResume'
import PageNotFound from './Pages/PageNotFound'
import { Route, Routes } from 'react-router-dom'
import Allresumes from './Pages/Allresumes'
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  

  return (
    <>
      <Header />
      {/* path setup */}
      <Routes>
        <Route path='' element={<Home />} />
        <Route path='/steps' element={<ResumeSteps />} />
        <Route path='/form' element={<UserForm />} />
        <Route path='/downloads' element={<Downloads />} />
        <Route path='/resume/view/:id' element={<ViewResume />} />
        <Route path='/all-resumes' element={<Allresumes />} />
        {/* invalid path redirect to pagenotfound */}
        <Route path='/*' element={<PageNotFound />} />
      </Routes>
      <Footer />
      <ToastContainer position="top-center"  autoClose={3000} theme="colored" transition={Zoom}
      />
    </>
  )
}

export default App
