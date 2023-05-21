import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes";
import { useState, createContext } from "react";


function App() {
  return (
    <Router>
        <div className="App">
          <Routes>
            {publicRoutes.map((route, index) => {
              let Layout = Fragment;
              if (route.layout == null) {
                Layout = Fragment;
              } else {
                Layout = route.layout;
              }
              const Page = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </div>
    </Router>
  );
}

export default App;
