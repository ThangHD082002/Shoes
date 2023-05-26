import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes";
import { useState, createContext } from "react";
import { Helmet } from "react-helmet";

export const ResetContext = createContext();

function App() {
  const [resetParent, setResetParent] = useState(true);

  const resetParentComponent = () => {
    setResetParent(!resetParent);
  };

  return (
    <Router>
      <div className="App">
          <ResetContext.Provider value={{ resetParentComponent }}>
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
          </ResetContext.Provider>
      </div>
    </Router>
  );
}

export default App;
