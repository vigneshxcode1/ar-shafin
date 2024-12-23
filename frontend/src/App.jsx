import React from "react";

import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Enterpage from './componets/user/Enter.jsx'
import Listmosque from './componets/user/Listmosque.jsx'
import MosqueDetails from "./componets/user/MosqueDetails.jsx";
import Dashbroad from "./componets/admin/Dashbroad.jsx";
import Createmosques from "./componets/admin/Createmosques.jsx";
import Showallmosques from "./componets/admin/Showallmosques .jsx";
import Updatemosques from "./componets/admin/Updatemosques.jsx";
import Deletedmosques from "./componets/admin/Deletedmosques.jsx";



const App = () => {

 
  return (
   <>
   <BrowserRouter>
   <Routes>

    <Route path="/" element={<Enterpage/>}/>
    
    <Route path="/listmosque" element={<Listmosque/>}/>

    <Route path="/detailsmosque/:id" element={<MosqueDetails/>} />


{/* admin */}

        <Route path="/dashbroad" element={<Dashbroad />} />
        <Route path="/createmosque" element={<Createmosques />} />
        <Route path="/showallmosques" element={<Showallmosques />} />
        <Route path="/mosques/update/:id" element={<Updatemosques />} />
        <Route path="/mosques/delete/:id" element={<Deletedmosques />} />

   </Routes>
   </BrowserRouter>
   </>
  );
};

export default App;