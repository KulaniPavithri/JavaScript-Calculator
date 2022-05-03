import ReactDOM  from 'react-dom';
import React from 'react';
import Calculator from './JavaScriptCalculator';
const App = () => {
    return (
        <div>
            <Calculator/>
        </div>
    );
}

ReactDOM.render(<App/>, document.getElementById("root"));

