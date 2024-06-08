import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function ModalComponent({ data, onClose, onSave, editableFields, modalTitle }) {
  console.log(data)
  const [editedData, setEditedData] = useState({ ...data });
  const [isEditMode, setIsEditMode] = useState(false);

  const handleSave = () => {
    onSave(editedData);
    setIsEditMode(false);
  };

  const handleCancel = () => {
    setEditedData({ ...data });
    setIsEditMode(false);
  };

  const renderInputField = (field) => (
    <p>
      {field.label}:{" "}
      {isEditMode ? (
        <input
          className="form-control col-12"
          value={editedData[field.name]}
          onChange={(e) => setEditedData({ ...editedData, [field.name]: e.target.value })}
        />
      ) : (
        <b>{editedData[field.name]}</b>
      )}
    </p>
  );

  return (
    <Modal show={true} onHide={onClose} backdrop="static" keyboard={false} centered>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {editableFields.map((field) => renderInputField(field))}
      </Modal.Body>
      <Modal.Footer>
        {!isEditMode ? (
          <Button variant="red" onClick={() => setIsEditMode(true)}>
            Edit
          </Button>
        ) : (
          <>
            <Button variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default ModalComponent;
