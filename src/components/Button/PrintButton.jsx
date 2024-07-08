
import { useEffect, useState } from 'react';
export default function PrintButton() {
  const [isPrinting, setIsPrinting] = useState(false);

  const handleButtonClick =() => {
      setIsPrinting(true);  
      setTimeout(() => {
        window.print();
      }, 300)
  };
  useEffect(() => {
    window.addEventListener("afterprint", () => {
      setIsPrinting(false);
    });
  }, []);

  return <button style={{
    position: "fixed",
    top: "10px",
    right: "15px",
    zIndex: "9999",
    backgroundColor: '#e0b224',
    color: "#fff",
    border: "none",
    visibility: isPrinting ? "hidden" : "visible",
    padding: "10px 20px",
    fontWeight: "bolder",
    borderRadius: "5px",
    cursor: "pointer",
  }} onClick={handleButtonClick}>Imprimer</button>;
}
