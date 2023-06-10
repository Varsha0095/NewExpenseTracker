import { useRef, useState } from "react";
import { Row, Col } from "react-bootstrap";
import classes from "./ExpenseForm.module.css";
import ExpenseList from "./ExpenseList";
// import ExpContext from "../../Store/expense-context";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { expenseAction } from "../../reduxStore/ExpenseReducer";

const ExpenseForm = (props) => {
  // const expCtx = useContext(ExpContext);
  // let email = localStorage.getItem('exp_email');
  // let mail = email.replace('@','').replace('.','');
  const url = `https://expensetracker-977e7-default-rtdb.firebaseio.com`;
  const updateUrl = `https://expensetracker-977e7-default-rtdb.firebaseio.com`;

  const dispatch = useDispatch();
  const expenseList = useSelector((state) => state.expense.expenseList);
  console.log(expenseList);

  const expenseAmountInputRef = useRef();
  const expenseDescriptionInputRef = useRef();
  const expenseCategoryInputRef = useRef();
  const [isEditing, setIsEditing] = useState();
  // const [expenses, setExpenses] = useState([]);
  const submitExpenseHandler = async(event) => {
    event.preventDefault();
    const expObj = {
      amount: expenseAmountInputRef.current.value,
      description: expenseDescriptionInputRef.current.value,
      category: expenseCategoryInputRef.current.value,
    };
    const res = await axios.post(`${url}/expense.json`, expObj);
    console.log("res",res);
    //resetting input values after submission
    expenseAmountInputRef.current.value = '';
    expenseDescriptionInputRef.current.value = '';
    expenseCategoryInputRef.current.value = '';

    if(res.status === 200){
      alert("Expense stored in database successfully");
      const expense = {
        id: res.data.name,
        ...expObj,
      };
      dispatch(expenseAction.addExpense(expense));
    }else{
      alert("Error while storing expense details");
    }
  };

  const editExpense = (expense) => {
    expenseAmountInputRef.current.value = expense.amount;
    expenseDescriptionInputRef.current.value = expense.description;
    expenseCategoryInputRef.current.value = expense.category;
    setIsEditing(expense.id);
  };
  const editExpenseHandler = async(event) => {
    event.preventDefault();
      const expObj = {
        id: isEditing,
        amount: expenseAmountInputRef.current.value,
        description: expenseDescriptionInputRef.current.value,
        category: expenseCategoryInputRef.current.value,
      };
      const res = await axios.put(
        `${updateUrl}/expense/${expObj.id}.json`,
        expObj
      )
      expenseAmountInputRef.current.value = '';
      expenseDescriptionInputRef.current.value = '';
      expenseCategoryInputRef.current.value = '';
      if(res.status === 200) console.log('expense edited successfully');
      dispatch(expenseAction.addExpense(expObj));
      setIsEditing(false);
  };

  return (
    <section>
      <form className={classes.form}>
        <Row className={classes.control}>
          <Col>
            <label htmlFor="amount">Expense Amount:</label>
          </Col>
          <Col>
            <input id="amount" type="number" ref={expenseAmountInputRef} />
          </Col>
        </Row>
        <Row className={classes.control}>
          <Col>
            <label htmlFor="description">Expense Description:</label>
          </Col>
          <Col>
            <input
              id="description"
              type="text"
              ref={expenseDescriptionInputRef}
            />
          </Col>
        </Row>
        <Row className={classes.control}>
          <Col>
            <label htmlFor="category">Expense Category:</label>
          </Col>
          <Col>
            <select id="category" name="expense" ref={expenseCategoryInputRef}>
              <option value="fuel">Fuel</option>
              <option value="food">Food</option>
              <option value="shopping">Shopping</option>
              <option value="bills">Bills</option>
            </select>
          </Col>
        </Row>
        <div className={classes.actions}>
          {!isEditing && <button onClick={submitExpenseHandler}>Add Expense</button>}
          {isEditing && <button onClick={editExpenseHandler}>Update Expense</button>}
        </div>
      </form>

      <Col>
        <ExpenseList expenses={expenseList} editExpense={editExpense} />
      </Col>
    </section>
  );
};

export default ExpenseForm;


//   const addExpenseHandler = (event) => {
//     event.preventDefault();
//     expCtx.addExpense({
//       id: expenses.id,
//       amount: expenseAmountInputRef.current.value,
//       description: expenseDescriptionInputRef.current.value,
//       category: expenseCategoryInputRef.current.value,
//     })
// }
  
//   const editExpenseHandler = (expense) => {
//     // event.preventDefault();
//     console.log(expense);
//     console.log(expenses);
//     expenseAmountInputRef.current.value = expense.amount
//     expenseDescriptionInputRef.current.value = expense.description
//     expenseCategoryInputRef.current.value = expense.category
//     expCtx.updateExpense({
//       id: expense.id,
//       amount: expenseAmountInputRef.current.value,
//       description: expenseDescriptionInputRef.current.value,
//       category: expenseCategoryInputRef.current.value,
//     });
//     setExpenses([...expenses, expense]);
//   };

