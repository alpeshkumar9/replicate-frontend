import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import IndexLayout from "./layouts/Index.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/*" element={<IndexLayout />} />
      <Route path="*" element={<Navigate to="/admin/index" replace />} />
    </Routes>
  </BrowserRouter>
);


