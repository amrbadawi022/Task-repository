import { useState } from "react";

function Table(props) {
  const [current, setCurrent] = useState({
    id: "",
    medication: "",
    time: "",
  });
  const [isEdit, setIsEdit] = useState(false);

  function handleUpdateReminder() {
    //console.log(current);
    props.onEdit(current);
    setCurrent({
      id: "",
      medication: "",
      time: "",
    });
    setIsEdit(false);
  }

  function handleChange(field, event) {
    const updated = { ...current, [field]: event.target.value };
    setCurrent(updated);
  }

  // console.log(props.tableData, "props.tableData");

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Medication</th>
          <th>Time</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.tableData.map(({ id, medication, time }, index) => {
          return (
            <>
              {isEdit && current.id === id ? (
                <tr key={index + "current"}>
                  <td>
                    <input
                      className="form-control"
                      type="text"
                      value={current.medication}
                      onChange={(event) => handleChange("medication", event)}
                    />
                  </td>
                  <td>
                    <input
                      className="form-control"
                      type="datetime-local"
                      value={current.time}
                      onChange={(event) => handleChange("time", event)}
                    />
                  </td>
                  <td>
                    <button
                      aria-label="Update"
                      onClick={() => handleUpdateReminder()}
                    >
                      Update
                    </button>
                    <button
                      aria-label="Cancel"
                      onClick={() => setIsEdit(false)}
                    >
                      X
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={index}>
                  <td>{medication}</td>
                  <td>{time}</td>
                  <td>
                    <button
                      aria-label="Close"
                      onClick={() => {
                        setCurrent({ id, medication, time });
                        setIsEdit(true);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              )}
            </>
          );
        })}
      </tbody>
    </table>
  );
}
export default Table;
