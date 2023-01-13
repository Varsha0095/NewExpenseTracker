import React from "react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AuthContext from "./auth-context";
import ExpContext from "./expense-context";

const ExpenseContextProvider = (props) => {
  const [expList, setExpList] = useState([]);
  const [totalAmt, setTotalAmt] = useState(0);
  const authCtx = useContext(AuthContext);

  let email = authCtx.email;
  let mail = email.replace("@", "").replace(".", "");

  useEffect(() => {
    const getExpenses = () => {
      axios
        .get(
          `https://expense-tracker-b43a5-default-rtdb.firebaseio.com/expenses/${mail}.json`
        )
        .then((res) => {
          if (res.status === 200) {
            const data = res.data;
            let exp_List = [];
            let exp_total_amt = 0;

            for (const key in data) {
              const expenseObj = {
                id: key,
                amount: data[key].amount,
                description: data[key].description,
                category: data[key].category,
              };
              exp_List.push(expenseObj);
            }
            exp_List.forEach((expense) => (exp_total_amt += +expense.amount));
            setTotalAmt(exp_total_amt);
            setExpList(exp_List);
          } else {
            alert("could not fetch data");
          }
        })
        .catch((error) => {
          console.log("could NOT fetch data");
        });
    };
    getExpenses();
  }, []);

  //adding expense
  const addExpenseHandler = (expense) => {
    axios
      .post(
        `https://expense-tracker-b43a5-default-rtdb.firebaseio.com/expenses/${mail}.json`,
        expense
      )
      .then((res) => {
        console.log("res", res);
        if (res.status === 200) {
          console.log("Data stored");
          const expenseObj = {
            id: res.data.name,
            ...expense,
          };
          setExpList((expList) => [...expList, expenseObj]);
          setTotalAmt((total) => (total += +expense.amount));
        } else {
          alert("Error storing data");
        }
      })
      .catch((error) => {
        console.log("Error in storing data");
      });
  };
  //delete expense
  const removeExpenseHandler = (id) => {
    axios
      .delete(
        `https://expense-tracker-b43a5-default-rtdb.firebaseio.com/expenses/${mail}/${id}.json`
      )
      .then((res) => {
        if (res.status === 200) console.log("Expense deleted successfully");
        expList.splice(expList.indexOf(id), 1);
        setExpList([...expList]);
        setTotalAmt((total) => (total -= +id.amount));
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  //edit expense
  const editExpenseHandler = (expense) => {
    console.log(expense);
    axios
      .put(
        `https://expense-tracker-b43a5-default-rtdb.firebaseio.com/expenses/${mail}/${expense.id}.json`,
        expense
      )
      .then((res) => {
        if (res.status === 200) console.log("Expense edited successfully");
        const expObj = {
          id: res.data.name,
        };
        setExpList([...expList, expObj]);
        setTotalAmt((total) => total += +expense.amount);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const expCtxValue = {
    expenses: expList,
    total: totalAmt,
    addExpense: addExpenseHandler,
    removeExpense: removeExpenseHandler,
    updateExpense: editExpenseHandler,
  };

  return (
    <ExpContext.Provider value={expCtxValue}>
      {props.children}
    </ExpContext.Provider>
  );
};

export default ExpenseContextProvider;
