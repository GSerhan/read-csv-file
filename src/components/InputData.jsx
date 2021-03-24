import React from "react";

const inputData = props => {

    const {labelName, placeholderInput, inputType, inputValue, sendInputValue, inputUse} = props;


    return (
        <div className="input-group flex-nowrap">
            <label className="d-flex align-items-center w-100">
                <span className="input-group-label">{labelName}:</span>
                <input type={inputType} className="form-control ml-3" placeholder={placeholderInput} value={inputValue} onChange={e => sendInputValue({from: inputUse, input:e.target.value})} />
            </label>
        </div>
    )
};

export default inputData;
