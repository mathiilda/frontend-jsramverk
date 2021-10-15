import React, { useState, useEffect } from "react";
import "./Popup.scss";

type Props = {
  callBack: any;
};

export function CreatePDF({ callBack }: Props) {
  return (
    <div className="popup bg-gray-100 rounded shadow w-1/5 p-4 absolute">
      A PDF have now been created. The PDF can be found in your
      <span className="text-yellow-600 underline">downloads</span> folder.
      <button
        className="rounded-lg p-1 pl-3 pr-3 bg-green-600 shadow mt-2 float-right mr-4"
        onClick={() => callBack()}
      >
        <p className="text-gray-100">OK</p>
      </button>
    </div>
  );
}
