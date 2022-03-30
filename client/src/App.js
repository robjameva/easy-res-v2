
import React from "react";
// import { Route, BrowserRouter, Routes } from "react-router-dom";
// import Dashboard  from "";
// import Login from "";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn"
import Home from "../src/components/Home";
import UserDashboard from "./components/UserDashboard";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <div className='contact-list'>
//         <Routes>
//           <Route path="/" element={<Home/>} />
//           {/* <Route path="/dashboard/:id" element={<Dashboard/>} />
//           <Route path="login" element={<Login/>} />
//           <Route path="/signup" element={<Signup/>} /> */}
//         </Routes>
//       </div>
//     </BrowserRouter>
//   );
// }

export default function App() {
  return(
    <div>
      {/* <Home/> */}
      {/* <SignUp /> */}
      <UserDashboard />
    </div>
  )
}

