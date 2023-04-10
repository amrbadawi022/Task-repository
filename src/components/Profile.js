import React, { useState, useEffect, Fragment } from "react";
import moment from "moment";
import axios from 'axios';

import Alert from "./Alert"
import Form from "./Form";
import Table from "./Table";

function Profile() {

  const [tableData, setTableData] = useState([]);
  const [formObject, setFormObject] = useState({
    id: "",
    medication: "",
    time: "",
  });
  const [showAlert, setShowAlert] = useState({
    title: "",
    show: false,
  });

  useEffect(() => {
    setInterval(() => {
      // console.log(tableData);
      tableData.map((item) => {
        const currentTime = moment().format("MMMM Do YYYY, h:mm a");
        const formatedTime = moment(item.time).format(
          "MMMM Do YYYY, h:mm a"
        );

        let isExactTime = -1;
        if (currentTime > formatedTime) isExactTime = 1;
        else if (currentTime < formatedTime) isExactTime = -1;
        else isExactTime = 0;
        if (isExactTime === 0) {
          // console.log(isExactTime, "isExactTime");
          setShowAlert({
            show: true,
            title: 'Its time to take '+ item.medication,
          });
        }else{
          setShowAlert({
            show: false,
            title: "",
          });
        }
      });
    }, 30 * 1000);
  }, [tableData]);

  const onValChange = (event) => {
    const value = (res) => ({
      ...res,
      [event.target.name]: event.target.value,
    });
    setFormObject(value);
  };

  const onFormSubmit = (event) => {

    const { medication, time } = formObject;

    const reminder = {
      medication,
      time,
    };
    console.log(medication);
    axios
      .post('http://localhost:3001/create', reminder)
      .then(() => console.log('ٌReminder Created'))
      .catch(err => {
        console.error(err);
      });

    event.preventDefault();
    const checkVal = !Object.values(formObject).every((res) => res === "");
    if (checkVal) {
      const dataObj = (data) => [
        ...data,
        { ...formObject, id: tableData.length },
      ];
      setTableData(dataObj);
     
      const isEmpty = { medication: "", time: "" };
      setFormObject(isEmpty);
    }
  };

  // console.log(showAlert, "showAlert");
  return (
    <Fragment>
      { showAlert.show && <Alert text={showAlert.title} /> }
      <Form
        onValChange={onValChange}
        formObject={formObject}
        onFormSubmit={onFormSubmit}
      />
      <h2>Reminder list</h2>
      <Table
        tableData={tableData}
        onEdit={(editedReminder) => {
          //setTableData
          const index = tableData.findIndex(
            (item) => item.id === editedReminder.id
          );
          tableData[index] = editedReminder;
          setTableData(tableData);
        }}
      />
    </Fragment>
  );
}

export default Profile;
