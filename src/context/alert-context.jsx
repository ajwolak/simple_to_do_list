import React, { createContext, useContext, useState, useEffect } from "react";

const AlertContext = createContext();

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};

export const AlertProvider = ({ children }) => {
  const [message, setMessage] = useState("");
  const [type, setType] = useState("info");
  const [visible, setVisible] = useState(false);

  const showAlert = (msg, alertType = "info") => {
    setMessage(msg);
    setType(alertType);
    setVisible(true);
    setTimeout(() => setVisible(false), 3000);
  };

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        setVisible(false);
      }, 3000);
    }
  }, [visible]);

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {visible && (
        <div
          className={`alert alert-${type} position-fixed top-0 start-50 translate-middle-x mt-3`}
          style={{ zIndex: 9999, minWidth: "300px" }}
        >
          {message}
        </div>
      )}
    </AlertContext.Provider>
  );
};
