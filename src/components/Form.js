function Form({ onValChange, formObject, onFormSubmit }) {
  return (
    <div className="row mb-4">
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Medication"
          onChange={onValChange}
          value={formObject.medication}
          name="medication"
        />
      </div>

      <div className="mb-3">
        <input
          type="datetime-local"
          className="form-control"
          placeholder="Time"
          onChange={onValChange}
          value={formObject.time}
          name="time"
        />
      </div>
      <div className="d-grid">
        <input
          type="submit"
          onClick={onFormSubmit}
          className="btn btn-success"
        />
      </div>
    </div>
  );
}
export default Form;
