import React from "react";
import styles from './Button.module.css'; // Importando estilos CSS
const Button = ({ Text, onClick, style }) => {
  return (
    <button
      type="submit"
      className={styles.button}
      onClick={onClick}
      
    >
      {Text}
    </button>
  );
};

export default Button;
