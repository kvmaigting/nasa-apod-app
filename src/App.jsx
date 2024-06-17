import Footer from "./components/Footer";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);
  const [load, setLoading] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);

  function handleToggleSideBar() {
    setShowSideBar(!showSideBar);
  }

  useEffect(() => {
    async function fetchAPIData() {
      const NASA_KEY = import.meta.env.VITE_NASA_API_KEY;
      const url =
        "https://api.nasa.gov/planetary/apod" + `?api_key=${NASA_KEY}`;

      const today = new Date().toDateString;
      const localKey = `NASA-${today}`;
      if (localStorage.getItem(localKey)) {
        const apiData = JSON.parse(localStorage.getItem(localKey));
        console.log("Fetched from cached today");
        setData(apiData);
        return;
      }
      localStorage.clear();
      try {
        const response = await fetch(url);
        const apiData = await response.json();
        localStorage.setItem(localKey, JSON.stringify(apiData));
        setData(apiData);

        console.log("Fetched from API today");
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchAPIData();
  }, []);

  return (
    <>
      {data ? (
        <Main data={data} />
      ) : (
        <div className="loadingState">
          <i className="fa-solid fa-gear"></i>
        </div>
      )}
      {showSideBar && (
        <Sidebar data={data} handleToggleSideBar={handleToggleSideBar} />
      )}
      {data && <Footer data={data} handleToggleSideBar={handleToggleSideBar} />}
    </>
  );
}

export default App;
