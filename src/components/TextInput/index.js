import { Input } from "antd";
import styles from "./TextInput.module.css";

const TextInput = ({ label, ...props }) => {
  return (
    <div className={styles.container}>
      <p className={styles.label}>{label}</p>
      <Input {...props} />
    </div>
  );
};

export default TextInput;
