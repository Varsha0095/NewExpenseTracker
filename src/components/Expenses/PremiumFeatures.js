import { themeAction } from "../../reduxStore/Theme";
import { useDispatch } from "react-redux";
import { useState, Fragment } from "react";
import { Button } from "react-bootstrap";
import classes from './Premium.module.css';

const PremiumFeatures = (props) => {
  const dispatch = useDispatch();
  const [isPremium, setIsPremium] = useState(false);

  const makeCSV = (rows) => {
    return rows.map((r) => r.join(",")).join("/n");
  };

  const expenseData = props.expenses.map((expense) => {
    return [expense.amount, expense.description, expense.category];
  });
  const data = [["Amount", "Description", "Category"], ...expenseData];

  const blob = new Blob([makeCSV(data)]);
  console.log(isPremium);

  const onClickHandler = () => {
    localStorage.setItem("premium_ac", true);
    setIsPremium(true);
  };
  const downloadFileHandler = () => {};
  const changeThemeHandler = () => {
    dispatch(themeAction.toggleTheme());
  };
  return (
    <Fragment>
      <div>
        <button onClick={onClickHandler} className={classes.premium}>Activate Premium</button>
      </div>
      {isPremium && (
        <a
          download="expense.csv"
          href={URL.createObjectURL(blob)}
          type="click"
          onClick={downloadFileHandler}
        >
          Download CSV file
        </a>
      )}
      {isPremium && (
        <Button variant="info" type="click" onClick={changeThemeHandler}>
          Change Theme
        </Button>
      )}
    </Fragment>
  );
};

export default PremiumFeatures;
