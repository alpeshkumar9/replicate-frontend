import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "./assets/plugins/nucleo/css/nucleo.css";
import "./assets/css/argon-dashboard-react.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import IndexLayout from "./layouts/Index.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/*" element={<IndexLayout />} />
      <Route path="*" element={<Navigate to="/index" replace />} />
    </Routes>
  </BrowserRouter>
);


