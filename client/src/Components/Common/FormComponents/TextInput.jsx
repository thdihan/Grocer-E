import classes from "../../../Style/FormComponents/TextInput.module.css";
export default function TextInput({ className, labelText, id, ...rest }) {
    return (
        <div className={`${classes["text-input"]} ${classes.className}`}>
            <label htmlFor={id}>{labelText}</label>
            <input {...rest} id={id} />
        </div>
    );
}
