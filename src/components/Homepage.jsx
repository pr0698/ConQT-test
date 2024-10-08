import React, { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import { ItemSuppDetails } from "./ItemSuppDetails";

export function Homepage() {
  const [isChecked, setIschecked] = useState(false);
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitPrice, setUnitPrice] = useState("21000");
  const [date, setDate] = useState("USD");
  const [country, setCountry] = useState("USD");
  const [isFormValid, setIsFormValid] = useState(false);

  const[supplierName, setSupplierName] = useState('');
  const [supplierCountry,setSupplierCountry] = useState('');
  const[state,setSate] = useState('');
  const[city,setCity] = useState('');
  const [email,setEmail] = useState('');
  const [phoneNumber,setPhoneNumber] = useState('');
  const [isSupplierFormValid,setSupplierFormValid] = useState(false);
  const [supplierStatusMessage,setSupplierStatusMessage] = useState('');

  useEffect(() => {
    if (itemName && quantity && /^[0-9]+$/.test(quantity)) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [itemName, quantity, date]);


  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(supplierName && supplierCountry && state && city && emailRegex.test(email) && phoneNumber){
        setSupplierFormValid(true);
    }else{
        setSupplierFormValid(false);
    }
  },[supplierName,supplierCountry,state,city,email,phoneNumber]);

  const handleCheckboxChange = () => {
    setIschecked(!isChecked);
  };

  const handleItemNameChange = (e) => {
    if (e.target.value <= 225) {
      setItemName(e.target.value);
    }
  };
  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setQuantity(value);
    }
  };

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setDate(selectedCountry);
    switch (selectedCountry) {
      case "USD":
        setUnitPrice("21000");
        break;
      case "EUR":
        setUnitPrice("18000");
        break;
      case "INR":
        setUnitPrice("1500000");
        break;
      default:
        setUnitPrice("21000");
    }
  };

  const handleSubmit = async (e) => {
    e.preventdfault();
    if (!isFormValid) return;
    const formData = {
      itemName,
      quantity,
      unitPrice,
      date,
      country,
    };

    try {
      const response = await axios.post(
        "https://apis-technical-test.conqt.com/Api/Item-Supplier/Save-Items-Suppliers",
        formData
      );
      alert("Data succesfully sent");
    } catch (err) {
      console.error("Error saving the data to the database", error);
      alert("Failed to save the data");
    }
  };
  return (
    <div className="App">
      <div className="top-bar">
        <h1>Inventory Management System</h1>
      </div>
      <div className="body-content">
        <label>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          Enable Inventory Form
        </label>
        <br />

        {isChecked && (
          <form className="inventory-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Item Name(max 225 characters):</label>

              <input
                type="text"
                value={itemName}
                onChange={handleItemNameChange}
                placeholder="ENTER THE ITEM NAME"
              />
            </div>

            <div className="form-group">
              <label>Quantity(max 10 digits):</label>
              <input
                type="text"
                value={quantity}
                onChange={handleQuantityChange}
                placeholder="Enter quantity"
              />
            </div>
            <div className="form-group">
              <label>Select Country:</label>
              <select value={country} onChange={handleCountryChange}>
                <option value="USD">USA</option>
                <option value="EUR">EUR</option>
                <option value="INR">INR</option>
              </select>
            </div>
            <div className="form-group">
              <label>
                Unit Price:{" "}
                {country === "USD" ? "$" : country === "EUR" ? "€" : "₹"}
                {unitPrice}
              </label>
            </div>
            <div className="form-group">
              <label>Date of Submission:</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <button type="submit" disable={!isFormValid}>
              Submit
            </button>
          </form>
        )}
      </div>
      <ItemSuppDetails/>
    </div>
  );
}

