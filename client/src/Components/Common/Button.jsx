import styles from "../../Style/Button.module.css";

const Button = ({ text }) => {
    return <button className={styles.Button}>{text}</button>;
};

export default Button;
