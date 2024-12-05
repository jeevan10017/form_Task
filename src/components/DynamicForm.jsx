import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { z } from "zod";
import ProgressBar from "./ProgressBar";
import UserTable from "./Tables/UserTable";
import AddressTable from "./Tables/AddressTable";
import PaymentTable from "./Tables/PaymentTable";
import CreditCardForm from "./CreditCardForm";

const schemas = {
  "User Information": z.object({
    firstName: z.string().min(1, "First Name is required"),
    lastName: z.string().min(1, "Last Name is required"),
    age: z.string().optional(),
  }),
  "Address Information": z.object({
    street: z.string().min(1, "Street is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zipCode: z.string().regex(/^\d{5}$/, "Zip Code must be 5 digits").optional(),
  }),
  "Payment Information": z.object({
    cardNumber: z.string().regex(/^\d{16}$/, "Card number must be 16 digits"),
    expirationDate: z
      .string()
      .regex(/^\d{2}\/\d{2}$/, "Expiration date must be MM/YY format"),
    cvv: z.string().regex(/^\d{3}$/, "CVV must be 3 digits"),
    cardName: z.string().min(1, "Cardholder name is required"),
  }),
};

const apiResponses = {
  "User Information": [
    { name: "firstName", type: "text", label: "First Name", required: true },
    { name: "lastName", type: "text", label: "Last Name", required: true },
    { name: "age", type: "number", label: "Age", required: false },
  ],
  "Address Information": [
    { name: "street", type: "text", label: "Street", required: true },
    { name: "city", type: "text", label: "City", required: true },
    {
      name: "state",
      type: "dropdown",
      label: "State",
      options: ["California", "Texas", "New York"],
      required: true,
    },
    { name: "zipCode", type: "text", label: "Zip Code", required: false },
  ],
  "Payment Information": [],
};

const DynamicForm = () => {
  const [formType, setFormType] = useState("");
  const [formFields, setFormFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(() => {
    return JSON.parse(localStorage.getItem("submittedData")) || {
      userInformation: [],
      addressInformation: [],
      paymentInformation: [],
    };
  });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (formType) {
      setFormFields(apiResponses[formType]);
      setFormData({});
      setFormErrors({});
    }
  }, [formType]);

  useEffect(() => {
    const totalFields = formFields.length;
    const filledFields = Object.keys(formData).filter(
      (key) => formData[key] && formData[key].toString().trim() !== ""
    ).length;
    setProgress(totalFields > 0 ? (filledFields / totalFields) * 100 : 0);
  }, [formData, formFields]);

  useEffect(() => {
    localStorage.setItem("submittedData", JSON.stringify(submittedData));
  }, [submittedData]);

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    try {
      if (!schemas[formType]) {
        throw new Error("Invalid form type selected");
      }
  
      const sanitizedData = {
        ...formData,
        cardNumber: formData.cardNumber?.replace(/\s/g, ""), 
      };
  
      schemas[formType].parse(sanitizedData);
      setFormErrors({});
      return true;
    } catch (error) {
      if (error.issues) {
        const errors = {};
        error.issues.forEach((e) => {
          errors[e.path[0]] = e.message;
        });
        setFormErrors(errors);
      } else {
        toast.error(error.message || "An unknown error occurred.");
      }
      return false;
    }
  };
  
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const key = formType
        .toLowerCase()
        .replace(" ", "")
        .replace("information", "Information");
      setSubmittedData((prev) => ({
        ...prev,
        [key]: [...(prev[key] || []), formData], 
      }));
      setFormType("");
      setProgress(0);
      toast.success("Form submitted successfully!");
    } else {
      toast.error("Please fix the errors before submitting.");
    }
  };
  

  const renderField = (field) => {
    const { name, type, label, options } = field;
    const error = formErrors[name];
    const inputClass = `p-3 border rounded-lg bg-gray-800 border-gray-600 focus:ring-orange-400 ${
      error ? "border-red-500" : ""
    }`;

    if (type === "dropdown") {
      return (
        <div key={name} className="flex flex-col mb-4">
          <label className="font-medium text-gray-300">{label}</label>
          <select
            className={inputClass}
            value={formData[name] || ""}
            onChange={(e) => handleInputChange(name, e.target.value)}
          >
            <option value="">-- Select --</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
      );
    }

    return (
      <div key={name} className="flex flex-col mb-4">
        <label className="font-medium text-gray-300">{label}</label>
        <input
          type={type}
          className={inputClass}
          value={formData[name] || ""}
          onChange={(e) => handleInputChange(name, e.target.value)}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  };

  return (
    <div className="min-h-screen py-8 px-4 bg-gray-900 text-gray-100">
      <div className="max-w-4xl mx-auto p-6 shadow-lg rounded-xl bg-gray-800">
        <ProgressBar progress={progress} />
        <h1 className="text-3xl font-bold mb-4 text-center text-orange-500">
          Dynamic Form 
        </h1>
        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-300">
            Select Form Type
          </label>
          <select
            className="w-full p-3 border rounded-lg bg-gray-800 border-gray-600 text-gray-100 focus:ring-orange-400"
            value={formType}
            onChange={(e) => setFormType(e.target.value)}
          >
            <option value="">-- Select --</option>
            {Object.keys(apiResponses).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {formFields.length > 0 && formType !== "Payment Information" && (
          <form onSubmit={handleSubmit}>
            {formFields.map((field) => renderField(field))}
            <button
              type="submit"
              className="w-full p-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-gray-900"
            >
              Submit
            </button>
          </form>
        )}

        {formType === "Payment Information" && (
          <CreditCardForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            formErrors={formErrors}
          />
        )}

        {/* Render Tables */}
        {formType === "User Information" && (
          <UserTable data={submittedData.userInformation} />
        )}
        {formType === "Address Information" && (
          <AddressTable data={submittedData.addressInformation} />
        )}
        {formType === "Payment Information" && (
          <PaymentTable data={submittedData.paymentInformation} />
        )}
      </div>
    </div>
  );
};

export default DynamicForm;
