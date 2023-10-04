import React from "react";


    const CustomButton = ({ color, text, onClick }) => {
        const buttonStyle = {
          backgroundColor: color,
          color: 'white', 
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        };
      
        return (
          <button style={buttonStyle} onClick={onClick}>
            {text}
          </button>
        );
      };

export default CustomButton;