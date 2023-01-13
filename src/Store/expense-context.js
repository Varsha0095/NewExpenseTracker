import React from "react";

const ExpContext = React.createContext({
    expenses: [],
    total: 0,
    addExpense: (expense) => {},
    removeExpense: (id) => {},
    updateExpense: (expense) => {}
});

export default ExpContext;