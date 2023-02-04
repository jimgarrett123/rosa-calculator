import "./App.scss";
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import SideBar from "./components/SideBar";
import Footer from "./components/Footer";
import usePageTracking from "./components/usePageTracking";
import Calculator from "./components/Calculator";

const defaultAppContext = {
  menu: {
    showWorkshops: true,
    showUpcomingEvents: true,
  },
  data: {
    workshops: []
  }
}
export const AppContext = React.createContext();

function App() {
  const [appContext, setAppContext] = useState(defaultAppContext)

  usePageTracking();

  useEffect(() => {
    document.body.classList.remove("is-preload");
  }, []);

  return (
    <div>
      <AppContext.Provider value={[appContext, setAppContext]}>

        <ScrollToTop />
        <SideBar />
        <main role="main">
          <div id="content" className="container">
            <Routes>
              <Route
                path="/"
                element={
                  <Calculator />
                }
              />
            </Routes>
          </div>
          <Footer />
        </main>
      </AppContext.Provider>
    </div>
  );
}

export default App;
