import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box, Button } from "@mui/material";

export default function Sidebar(props) {
  const { handleToggleSideBar, data, handleDateChange } = props;
  const [value, setValue] = React.useState(dayjs(new Date()));

  function handleSubmitDate() {
    handleDateChange(value);
  }

  return (
    <div className="sidebar">
      <div className="bgOverlay" onClick={handleToggleSideBar}></div>
      <div className="sidebarContents">
        <h2>{data?.title}</h2>
        <div className="descriptionContainer">
          <p className="descriptionTitle">{data?.date}</p>
          <p className="descriptionTitle">Description</p>
          <p>{data?.explanation}</p>
        </div>

        <Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Select Date"
                value={value}
                onChange={(newValue) => setValue(newValue)}
                minDate={dayjs("1995-06-16")}
                maxDate={dayjs(new Date())}
                slotProps={{
                  textField: {
                    sx: {
                      svg: { color: "#fff" },
                      input: { color: "#fff" },
                      label: { color: "#fff" },
                    },
                  },
                }}
              />
              <button className="dateButton" onClick={handleSubmitDate}>
                SUBMIT
              </button>
            </DemoContainer>
          </LocalizationProvider>
        </Box>

        <button onClick={handleToggleSideBar}>
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
}
