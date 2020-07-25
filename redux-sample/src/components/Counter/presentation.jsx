import React from "react";

const Counter = props => {
    console.log(props);

    return (
        <div>
            <div>{ props.count }</div>
            <button onClick={() => props.increment(1)}>+</button>
            <button onClick={() => props.decrement(1)}>-</button>
        </div>
    );
}
export default Counter;
