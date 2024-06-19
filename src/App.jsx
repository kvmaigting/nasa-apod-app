import Footer from "./components/Footer";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

function App() {
  const [data, setData] = useState(null);
  const [showSideBar, setShowSideBar] = useState(false);
  const [date, setDate] = useState(dayjs(new Date()));

  function handleToggleSideBar() {
    setShowSideBar(!showSideBar);
  }

  function handleDateChange(newDate) {
    setDate(newDate);
  }

  useEffect(() => {
    async function fetchAPIData() {
      const NASA_KEY = import.meta.env.VITE_NASA_API_KEY;

      const formattedDate = date.format("YYYY-MM-DD");
      const currentDate = dayjs(new Date()).format("YYYY-MM-DD");

      //check if user changed the date
      // console.log(
      //   "Formatted date: " + formattedDate + " Current Date: " + currentDate
      // );

      let url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`;

      if (formattedDate !== currentDate) {
        url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}&date=${formattedDate}`;
      }

      // console.log(url);

      try {
        const response = await fetch(url);
        const apiData = await response.json();
        setData(apiData);

        console.log("Fetched from API today");
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchAPIData();
  }, [date]);

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
        <Sidebar
          data={data}
          handleToggleSideBar={handleToggleSideBar}
          handleDateChange={handleDateChange}
        />
      )}
      {data && <Footer data={data} handleToggleSideBar={handleToggleSideBar} />}
    </>
  );
}

export default App;
