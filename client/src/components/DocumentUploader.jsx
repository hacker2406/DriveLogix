import React from "react";

const DocumentUploader = ({ onUpload, value, onChange }) => (
  <form
    className="flex items-center gap-2"
    onSubmit={e => {
      e.preventDefault();
      onUpload(value.file, value.type);
      onChange({ file: null, type: "" });
      e.target.reset();
    }}
  >
    <select
      required
      className="border rounded px-2 py-1"
      value={value.type || ""}
      onChange={e => onChange({ ...value, type: e.target.value })}
    >
      <option value="">Select type</option>
      <option value="insurance">Insurance</option>
      <option value="registration">Registration</option>
      <option value="puc">PUC</option>
      <option value="other">Other</option>
    </select>
    <input
      type="file"
      required
      accept="image/*,application/pdf"
      onChange={e => onChange({ ...value, file: e.target.files[0] })}
    />
    <button
      type="submit"
      className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
    >
      Upload
    </button>
  </form>
);

export default DocumentUploader;