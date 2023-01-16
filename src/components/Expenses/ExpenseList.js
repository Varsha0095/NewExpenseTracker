import ExpenseItem from "./ExpenseItem";
import { useSelector } from "react-redux";
import PremiumFeatures from "./PremiumFeatures";

const ExpenseList = (props) => {
    const total = useSelector((state) => state.expense.total);

    return(
        <>
            <h2>Total = ${total}</h2>
            {total >= 10000 && <PremiumFeatures expenses={props.expenses} />}
            {props.expenses.map((expense) => {
                return(
                    <ExpenseItem 
                        key={expense.id}
                        expense={expense}
                        editExpense={props.editExpense}
                    />
                )
            })}
        </>
    )
};

export default ExpenseList;