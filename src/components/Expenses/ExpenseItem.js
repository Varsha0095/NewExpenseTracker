import { useContext, useState } from "react";
import classes from "./ExpenseItem.module.css";
import ExpContext from "../../Store/expense-context";

const ExpenseItem = (props) => {
  const expCtx = useContext(ExpContext);
  const [expenses, setExpenses] = useState([]);
  console.log(expenses);


  const onRemove = (id) => {
    expCtx.removeExpense(id);
  };

  return (
    <table className={classes.table}>
      <thead>
        <tr>
          <th>Expense Amount</th>
          <th>Expense Description</th>
          <th>Expense Category</th>
          <th>Delete Expense</th>
          <th>Edit Expense</th>
        </tr>
        <tr style={{color: 'black'}}>Total Amount: $100</tr>
      </thead>
      <tbody>
        {expCtx.expenses.map((expense) => {
          return (
            <tr key={expense.id}>
              <td>{expense.amount}</td>
              <td>{expense.description}</td>
              <td>{expense.category}</td>
              <td>
                <button
                  onClick={() => onRemove(expense.id)}
                  className={classes.buttonDel}
                >
                  Delete
                </button>
              </td>
              <td>
                <button
                  onClick={() => props.onEdit(expense)}
                  className={classes.buttonEdit}
                >
                  Edit
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
export default ExpenseItem;


// const onEdit = (id) => {
  //   expCtx.updateExpense(id);
  // }
  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://expense-tracker-b43a5-default-rtdb.firebaseio.com/expenses/${mail}.json`
  //     )
  //     .then((res) => {
  //       console.log("fetched data", res.data);
  //       let expense = res.data;
  //       console.log(expense);
  //       let expenseArr = [];
  //       for (const key in expense) {
  //         expense[key].id = key;
  //         let item = expense[key];
  //         expenseArr.push(item);
  //         console.log(item);
  //       }

  //       console.log(expenseArr);
  //       setExpenses(expenseArr);
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // }, [mail]);

  // const removeExpenseHandler = (id) => {
  //   axios
  //     .delete(
  //       `https://expense-tracker-b43a5-default-rtdb.firebaseio.com/expenses/${mail}/${id}.json`
  //     )
  //     .then((res) => {
  //       console.log("Expense deleted successfully");
  //       const newArr = [...expenses];
  //       newArr.forEach((expense, index) => {
  //         console.log(expense.id);
  //         newArr.splice(index, 1)
  //         setExpenses(newArr);
  //       })
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // };