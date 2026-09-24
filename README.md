# Resume-Builder

Build a project using vite+react
npm create vite@latest resume-builder -- --template react
Remove unwanted elements from components

- Install styling tools
  ->material UI
  ->google fonts
  ->bootstrap cdn link
  ->react icons


- Project structuring (component creation)
- for routing- install react router dom
- Wrap app jsx with browserrouter and make path using route inside routes on app component
- Component designing
- Collect resume details from userinputs using state(onchange) and stored as an object in parent component
- Display resume in preview component using state lifting because react only support unidirectional data flow
- Send resume details to json server using axios
- Create an instance using axios interceptors
- Connect with base-url
- Create request response cycle
- Create apiService file for configure axios configuration
- Make api call for multiple request using httpMethod (GET,POST,PUT,DELETE)
- Make changes in resume after displaying using resume id and PUT method
- Download resume and post resume image on cloud using cloudinary
- Generate pdf using jsPdf library and make screenshot of resume element using html2canvas
- Delete resumes using delete method
- Create search options using useMemo hook
- Add pagination
- Implement chart using chart-js-2 chart-js library to display download count of resumes
- Finally deployed json server using render & react app using vercel
- Add vercel.json file before deploying react app to vercel
