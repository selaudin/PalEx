import React, { useState } from 'react';

function MultiLayerCheckbox(props) {
    const [filters, setFilters] = useState({
        BaseType: ['bt1', 'bt2', 'bt3', 'bt4', 'bt5'],
        FootMarkType: ['ft1', 'ft2', 'ft3', 'ft4', 'ft5', 'ft6', 'ft7', 'ft8', 'ft9'],
    });

    const initialCheckboxes = Object.fromEntries(
        Object.entries(filters).map(([key, value]) => [
            key,
            { [key]: false, ...Object.fromEntries(value.map((v) => [v, false])) },
        ])
    );

    const [checkboxes, setCheckboxes] = useState(initialCheckboxes);
    // console.log(checkboxes);

    const handleCheckboxChange = (event, parentKey, childKey) => {
        if (childKey === parentKey) return;

        const updatedCheckboxes = { ...checkboxes };
        updatedCheckboxes[parentKey][childKey] = event.target.checked;

        const allChecked = Object.entries(updatedCheckboxes[parentKey])
            .filter(([key]) => key !== parentKey)
            .every(([, checked]) => checked);

        updatedCheckboxes[parentKey][parentKey] = allChecked;

        setCheckboxes(updatedCheckboxes);
        props.changeSelectedFilters(updatedCheckboxes);
    };

    const handleParentCheckboxChange = (event, parentKey) => {
        const updatedCheckboxes = { ...checkboxes };
        const isChecked = event.target.checked;

        Object.keys(updatedCheckboxes[parentKey]).forEach((childKey) => {
            updatedCheckboxes[parentKey][childKey] = isChecked;
        });

        setCheckboxes(updatedCheckboxes);
        props.changeSelectedFilters(updatedCheckboxes);
    };

    const checkboxList = Object.entries(checkboxes).map(([parentKey, children]) => (
        <div key={parentKey}>
            <label style={{fontWeight: 'bold'}}>
                <input
                    type="checkbox"
                    checked={children[parentKey]}
                    onChange={(event) => handleParentCheckboxChange(event, parentKey)}
                />
                {parentKey}
            </label>
            {Object.entries(children)
                .filter(([key]) => key !== parentKey)
                .map(([childKey, checked]) => (
                    <div key={childKey}>
                        <label>
                            <input
                                type="checkbox"
                                checked={checked}
                                onChange={(event) => handleCheckboxChange(event, parentKey, childKey)}
                            />
                            {childKey}
                        </label>
                    </div>
                ))}
        </div>
    ));

    return <div>{checkboxList}</div>;
}

export default MultiLayerCheckbox;
