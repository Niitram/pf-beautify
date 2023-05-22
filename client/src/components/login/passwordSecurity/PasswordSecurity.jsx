import styles from "./PasswordSecurity.module.css";

const regexMediumHigh = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
const regexMediumLow1 = /^(?=.*\d.*)(?=.*[a-zA-Z].*).{6,}$/;
const regexMediumLow2 = /^(?=.*[A-Z])[a-zA-Z]{6,}$/;
const regexHigh = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/;

const checkSecurity = (password) => {
  let security = "";
  if (password.length >= 6) {
    security = "Low";
    if (password.match(regexMediumLow1) || password.match(regexMediumLow2))
      security = "Medium-low";
    if (password.match(regexMediumHigh)) security = "Medium-high";
    if (password.match(regexHigh)) security = "High";
  }
  return security;
};

const PasswordSecurity = ({ password }) => {
  return (
    <div>
      {password.length >= 6 && (
        <p className={styles[checkSecurity(password)]}>
          Password Security: {checkSecurity(password)}
        </p>
      )}
    </div>
  );
};

export default PasswordSecurity;
