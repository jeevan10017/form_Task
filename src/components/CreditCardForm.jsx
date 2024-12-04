const CreditCardForm = ({ formData, handleInputChange, handleSubmit, formErrors }) => {
    const { cardNumber, expirationDate, cvv, cardName } = formData;
  
    const formatCardNumber = (value) =>
      value.replace(/\D/g, "").replace(/(\d{4})/g, "$1 ").trim();
  
    const formatExpDate = (value) =>
      value.replace(/\D/g, "").replace(/(\d{2})(\d{1,2})/, "$1/$2");
  
    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-300">Card Number</label>
          <input
            type="text"
            maxLength="19"
            placeholder="XXXX XXXX XXXX XXXX"
            value={cardNumber || ""}
            onChange={(e) =>
              handleInputChange("cardNumber", formatCardNumber(e.target.value))
            }
            className={`w-full p-3 border rounded-lg bg-gray-800 text-gray-100 focus:ring-orange-500 focus:border-orange-500 ${
              formErrors.cardNumber ? "border-red-500" : "border-gray-600"
            }`}
          />
          {formErrors.cardNumber && (
            <p className="text-sm text-red-500">{formErrors.cardNumber}</p>
          )}
        </div>
        <div className="flex space-x-4">
          <div>
            <label className="block text-gray-300">Exp. Date</label>
            <input
              type="text"
              maxLength="5"
              placeholder="MM/YY"
              value={expirationDate || ""}
              onChange={(e) =>
                handleInputChange("expirationDate", formatExpDate(e.target.value))
              }
              className={`w-full p-3 border rounded-lg bg-gray-800 text-gray-100 focus:ring-orange-500 focus:border-orange-500 ${
                formErrors.expirationDate ? "border-red-500" : "border-gray-600"
              }`}
            />
            {formErrors.expirationDate && (
              <p className="text-sm text-red-500">{formErrors.expirationDate}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-300">CVV</label>
            <input
              type="text"
              maxLength="3"
              placeholder="123"
              value={cvv || ""}
              onChange={(e) =>
                handleInputChange("cvv", e.target.value.replace(/\D/g, ""))
              }
              className={`w-full p-3 border rounded-lg bg-gray-800 text-gray-100 focus:ring-orange-500 focus:border-orange-500 ${
                formErrors.cvv ? "border-red-500" : "border-gray-600"
              }`}
            />
            {formErrors.cvv && (
              <p className="text-sm text-red-500">{formErrors.cvv}</p>
            )}
          </div>
        </div>
        <div>
          <label className="block text-gray-300">Card Holder Name</label>
          <input
            type="text"
            placeholder="John Doe"
            value={cardName || ""}
            onChange={(e) => handleInputChange("cardName", e.target.value)}
            className={`w-full p-3 border rounded-lg bg-gray-800 text-gray-100 focus:ring-orange-500 focus:border-orange-500 ${
              formErrors.cardName ? "border-red-500" : "border-gray-600"
            }`}
          />
          {formErrors.cardName && (
            <p className="text-sm text-red-500">{formErrors.cardName}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-lg transition-all duration-200"
        >
          Submit
        </button>
      </form>
    );
  };
  
  export default CreditCardForm;
  