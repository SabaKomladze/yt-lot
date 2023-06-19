import "./Fillers.css";
import React, { useState } from "react";

const CreditCardForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [invalidInputs, setInvalidInputs] = useState([]);

  const handleSubmit = () => {
    const inputs = document.querySelectorAll(".credit-card-input");
    const invalidInputsArr = [];

    inputs.forEach((input) => {
      const inputValue = input.value.trim();
      const inputId = input.id;

      if (inputId === "cardNumber") {
        if (!/^\d{16}$/.test(inputValue)) {
          invalidInputsArr.push(inputId);
        }
      } else if (inputId === "expMonth" || inputId === "expYear") {
        if (!/^\d{1,2}$/.test(inputValue)) {
          invalidInputsArr.push(inputId);
        }
      } else if (inputId === "cvv") {
        if (!/^\d{3}$/.test(inputValue)) {
          invalidInputsArr.push(inputId);
        }
      } else if (inputId === "cardHolderName") {
        if (!/^[A-Za-z]+$/.test(inputValue)) {
          invalidInputsArr.push(inputId);
        }
      }
    });

    if (invalidInputsArr.length > 0) {
      setInvalidInputs(invalidInputsArr);
      setErrorMessage("Please fill in the form correctly.");
      return;
    }

    setInvalidInputs([]);
    setErrorMessage("");
  };

  const handleInputChange = (inputId) => {
    const updatedInvalidInputs = invalidInputs.filter(
      (input) => input !== inputId
    );
    setInvalidInputs(updatedInvalidInputs);
    setErrorMessage("");
  };

  const formatCardNumber = (inputValue) => {
    const digitsOnly = inputValue.replace(/\D/g, "");

    const groups = [];
    for (let i = 0; i < digitsOnly.length; i += 4) {
      groups.push(digitsOnly.substr(i, 4));
    }

    const formattedValue = groups.join(" ");

    return formattedValue;
  };

  const handleCardNumberChange = (event) => {
    const inputValue = event.target.value;
    const formattedValue = formatCardNumber(inputValue);
    event.target.value = formattedValue;
    handleInputChange("cardNumber");
  };

  const handleExpMonthChange = (event) => {
    const inputValue = event.target.value;
    const formattedValue = inputValue.padStart(2, "0");
    event.target.value = formattedValue;
    handleInputChange("expMonth");
  };

  const handleExpYearChange = (event) => {
    const inputValue = event.target.value;
    const formattedValue = inputValue.padStart(2, "0");
    event.target.value = formattedValue;
    handleInputChange("expYear");
  };

  return (
    <div className="credit-card-form">
      <h1 className="site-title">იუთუბ ლატარეა</h1>
      <h2 className="price">ფასი 2 ლარი</h2>
      <input
        type="text"
        className={`credit-card-input ${
          invalidInputs.includes("cardNumber") ? "invalid" : ""
        }`}
        id="cardNumber"
        placeholder="Card Number"
        onChange={handleCardNumberChange}
        maxLength={19}
      />
      <div className="exp-date-container">
        <input
          type="text"
          className={`credit-card-input exp-date-input ${
            invalidInputs.includes("expMonth") ? "invalid" : ""
          }`}
          id="expMonth"
          placeholder="MM"
          maxLength="2"
          onChange={handleExpMonthChange}
        />
        <span className="separator">/</span>
        <input
          type="text"
          className={`credit-card-input exp-date-input ${
            invalidInputs.includes("expYear") ? "invalid" : ""
          }`}
          id="expYear"
          placeholder="YY"
          maxLength="2"
          onChange={handleExpYearChange}
        />
      </div>
      <input
        type="text"
        className={`credit-card-input ${
          invalidInputs.includes("cvv") ? "invalid" : ""
        }`}
        id="cvv"
        placeholder="CVV"
        maxLength="3"
        onChange={() => handleInputChange("cvv")}
      />
      <input
        type="text"
        className={`credit-card-input ${
          invalidInputs.includes("cardHolderName") ? "invalid" : ""
        }`}
        id="cardHolderName"
        placeholder="Cardholder Name"
        onChange={() => handleInputChange("cardHolderName")}
      />
      <button className="submit-button" onClick={handleSubmit}>
        Submit
      </button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <a
        target="_blank"
        className="website-link"
        href="https://www.youtube.com/channel/UCPrl1QciEccQgXOGB2wJdUQ"
      >
        არხის მისამართი
      </a>
    </div>
  );
};

export default CreditCardForm;
