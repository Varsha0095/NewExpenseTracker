import { useDispatch } from "react-redux";
import { expenseAction } from "../../reduxStore/ExpenseReducer";
import axios from "axios";
import { Container } from "react-bootstrap";
import classes from './ExpenseItem.module.css';

const ExpenseItem = (props) => {
  // let email = localStorage.getItem('exp_email');
  // let mail = email.replace('@','').replace('.','');
  const dispatch = useDispatch();

  const url = `https://expense-tracker-b43a5-default-rtdb.firebaseio.com`;
   
  const removeExpense = async() => {
    const res = await axios.delete(`${url}/expense/${props.expense.id}.json`);
    if(res.status === 200) console.log('expense deleted successfully');
    dispatch(expenseAction.removeExpense(props.expense));
  };

  const editExpense = () => {
    dispatch(expenseAction.removeExpense(props.expense));

    props.editExpense(props.expense);
  };
  return(
    <Container 
      style={{display: "flex", border: "4px solid grey", width: "400px"}}>
        <div className={classes.list}>
          Amount: ${props.expense.amount}
          <br />
          Description: {props.expense.description}
          <br />
          Category: {props.expense.category}
          <br />
        </div>
        <div>
          <button className={classes.buttonEdit} onClick={editExpense}>Edit</button>
          </div>
          <div>
          <button className={classes.buttonDel} onClick={removeExpense}>Delete</button>
        </div>
      </Container>
  )
}

export default ExpenseItem;







// import { useContext, useState } from "react";
// import classes from "./ExpenseItem.module.css";
// import ExpContext from "../../Store/expense-context";

// const ExpenseItem = (props) => {
//   const expCtx = useContext(ExpContext);
//   const [expenses, setExpenses] = useState([]);
//   console.log(expenses);


//   const onRemove = (id) => {
//     expCtx.removeExpense(id);
//   };

//   return (
//     <table className={classes.table}>
//       <thead>
//         <tr>
//           <th>Expense Amount</th>
//           <th>Expense Description</th>
//           <th>Expense Category</th>
//           <th>Delete Expense</th>
//           <th>Edit Expense</th>
//         </tr>
//         <tr style={{color: 'black'}}>Total Amount: $100</tr>
//       </thead>
//       <tbody>
//         {expCtx.expenses.map((exp) => {
//           return (
//             <tr key={exp.id}>
//               <td>{exp.amount}</td>
//               <td>{exp.description}</td>
//               <td>{exp.category}</td>
//               <td>
//                 <button
//                   onClick={() => onRemove(exp.id)}
//                   className={classes.buttonDel}
//                 >
//                   Delete
//                 </button>
//               </td>
//               <td>
//                 <button
//                   onClick={() => props.onEdit(exp.id)}
//                   className={classes.buttonEdit}
//                 >
//                   Edit
//                 </button>
//               </td>
//             </tr>
//           );
//         })}
//       </tbody>
//     </table>
//   );
// };
// export default ExpenseItem;


