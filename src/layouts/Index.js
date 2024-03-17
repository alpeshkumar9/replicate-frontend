import React, { useState } from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
import routes from "../routes";

const IndexLayout = () => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/") {
        return (
          <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else {
        return null;
      }
    });
  };
  return (
    <>
      <div className="main-content" ref={mainContent}>
        <Routes>
          {getRoutes(routes)}
        </Routes>
      </div>
    </>
  );
};

export default IndexLayout;
