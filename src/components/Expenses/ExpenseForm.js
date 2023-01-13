import { useContext, useRef, useState } from "react";
import { Row, Col } from "react-bootstrap";
import classes from "./ExpenseForm.module.css";
import ExpenseItem from "./ExpenseItem";
import ExpContext from "../../Store/expense-context";

const ExpenseForm = (props) => {
  const expCtx = useContext(ExpContext);
  const expenseAmountInputRef = useRef();
  const expenseDescriptionInputRef = useRef();
  const expenseCategoryInputRef = useRef();

  const [expenses, setExpenses] = useState([]);

  const addExpenseHandler = (event) => {
    event.preventDefault();
    expCtx.addExpense({
      id: expenses.id,
      amount: expenseAmountInputRef.current.value,
      description: expenseDescriptionInputRef.current.value,
      category: expenseCategoryInputRef.current.value,
    })
}
  
  const editExpenseHandler = (expense) => {
    // event.preventDefault();
    console.log(expense);
    console.log(expenses);
    expenseAmountInputRef.current.value = expense.amount
    expenseDescriptionInputRef.current.value = expense.description
    expenseCategoryInputRef.current.value = expense.category
    expCtx.updateExpense({
      id: expense.id,
      amount: expenseAmountInputRef.current.value,
      description: expenseDescriptionInputRef.current.value,
      category: expenseCategoryInputRef.current.value,
    });
    setExpenses([...expenses, expense]);
  };

  return (
    <section>
      <form onSubmit={addExpenseHandler} className={classes.form}>
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
          <button>Add Expense</button>
        </div>
      </form>

      <Col>
        <ExpenseItem expenses={expenses} onEdit={editExpenseHandler} />
      </Col>
      <Col>
        {expenses.length < 1 && <div>No expenses are added Yet !!</div>}
      </Col>
    </section>
  );
};

export default ExpenseForm;


    // const amount = expenseAmountInputRef.current.value;
    // const description = expenseDescriptionInputRef.current.value;
    // const category = expenseCategoryInputRef.current.value;


    // const newArr = [...expenses];
    // let expenseObj = {
    //   amount,
    //   description,
    //   category,
    // };
    // // setExpenses([...expenses, expenseObj]);
    // // let email = localStorage.getItem('email');
    // let email = authCtx.email;
    // let mail = email.replace("@", "").replace(".", "");
    // try{
    //     const res = await axios.post(
    //         `https://expense-tracker-b43a5-default-rtdb.firebaseio.com/expenses/${mail}.json`,
    //         expenseObj
    //       );
    //       console.log("res", res);
    //       if (res.status === 200) {
    //         console.log("Expense stored in database");
    //           setExpenses([...expenses, res])
    //         const expense = {
    //           id: res.data.name,
    //           ...expenseObj,
    //         };
    //         console.log(expense);
    //     }
    // }catch(error){
    //     console.log(error);
    // }
    // const res = await axios.post(
    //   `https://expense-tracker-b43a5-default-rtdb.firebaseio.com/expenses/${mail}.json`,
    //   expenseObj
    // );
    // console.log("res", res);
    // if (res.status === 200) {
    //   alert("Expense stored in database");
    //     setExpenses([...expenses, res])
    //   const expense = {
    //     id: res.data.name,
    //     ...expenseObj,
    //   };
    //   console.log(expense);
    // } else {
    //   console.log("something went wrong");

      // expenseAmountInputRef.current.value = expense.amount;
    // expenseDescriptionInputRef.current.value = expense.description;
    // // expenseCategoryInputRef.current.value = expense.category;
    // let expenseObj = {
    //   id: IsEditing,
    //   amount: expenseAmountInputRef.current.value,
    //   description: expenseDescriptionInputRef.current.value,
    //   category: expenseCategoryInputRef.current.value,
    // };
    // let email = authCtx.email;
    // let mail = email.replace("@", "").replace(".", "");
    // const res = await axios.put(
    //   `https://expense-tracker-b43a5-default-rtdb.firebaseio.com/expenses/${mail}/${expenseObj.id}.json`,
    //   expenseObj
    // );
    // if (res.status === 200)
    //   console.log("expense edited successfully", res.data);
    // setExpenses([...expenses, expenseObj]);
    // setIsEditing(false);

    
  // .then((res) => {
  //     console.log('edited expense', res);
  //     const data = res.data;
  //     console.log(data);
  //     expenseAmountInputRef.current.value = data.amount;
  //     expenseDescriptionInputRef.current.value = data.description;
  //     expenseCategoryInputRef.current.value = data.category;
  // }).catch((err) => {
  //     console.log('could not edit expense');
  // })
  // axios.get('https://expense-tracker-b43a5-default-rtdb.firebaseio.com/.json').then((res) => {
  //     console.log('Fetched Data', res.data);
  // })
  // useEffect(() => {
  //     localStorage.setItem('expenses', JSON.stringify(expenses))
  //     axios.get('https://expense-tracker-b43a5-default-rtdb.firebaseio.com/.json',{
  //         expenses
  //     }).then((res) => {
  //         console.log('Fetched Data', res.data);
  //     })
  // },[expenses])