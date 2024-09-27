import React, { useState } from "react";

export function Homepage() {
    const[isChecked,setIschecked] = useState(false);
    const handleCheckboxChange = () => {
        setIschecked(!isChecked);
    }
  return (
    <div className="App">
      <div className="top-bar">
        <h1>Top bar Menu</h1>
      </div>
      <div className="body-content">
        <label>
          <input 
             type="checkbox" 
             checked={isChecked}
             onChange={handleCheckboxChange} />
             Enable Input
        </label>
        <br/>
        <input
          type="text"
          placeholder="Enter Something..."
          disabled={!isChecked} 
        />
      </div>
    </div>
  );
}
