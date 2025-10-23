"use client";

export default function BackButton() {
  return (
    <button
      onClick={() => history.back()}
      className="text-sm text-gray-500 hover:text-gray-700 mb-4"
    >
      ← Go Back
    </button>
  );
}
