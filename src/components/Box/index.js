import styles from "./Box.module.css";

const Box = ({ data, onClick, selectedGenre }) => {
  return (
    <div
      className={
        selectedGenre.includes(data.id)
          ? styles.containerTerpilih
          : styles.container
      }
      onClick={onClick}
    >
      <p className={styles.title}>{data.name}</p>
    </div>
  );
};

export default Box;
