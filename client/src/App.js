
import React from "react";
// import { Route, BrowserRouter, Routes } from "react-router-dom";
// import Dashboard  from "";
// import Login from "";
// import Signup from "";
import Home from "../src/components/Home";

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
      <Home/>
    </div>
  )
}

