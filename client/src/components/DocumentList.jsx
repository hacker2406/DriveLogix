import React from "react";

const DocumentList = ({ documents, onDelete }) => (
  <ul className="space-y-2">
    {documents.map(doc => (
      <li key={doc._id} className="flex items-center gap-4">
        <span className="font-medium">{doc.type}</span>
        <a
          href={doc.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          View
        </a>
        <span className="text-gray-400 text-xs">
          {doc.uploadedAt ? new Date(doc.uploadedAt).toLocaleDateString() : ""}
        </span>
        <button
          onClick={() => onDelete(doc._id)}
          className="px-2 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100"
        >
          Delete
        </button>
      </li>
    ))}
  </ul>
);

export default DocumentList;