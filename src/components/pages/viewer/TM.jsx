import React from 'react';
import Select from "react-select";

function TM(props){
    let optionss = props.listt;
    console.log(optionss);

    const optionsFromTextList = optionss.map((tm) => {
        return {
            value: JSON.stringify(tm.value),
            label: tm.label
        };
    });

    return (
        <div className="container">
            <h5>TM:</h5>
            <div className="mt-5 m-auto w-50">
                <Select
                    options={optionsFromTextList}
                    onChange={(selectedOption) => console.log(selectedOption)}
                />
            </div>
        </div>
    );
}

export default TM;