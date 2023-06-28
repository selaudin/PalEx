import React, {useEffect, useState} from "react";
import {Table} from "react-bootstrap";

function Cliplet3(props) {
    let categories = props.getCategories();
    let annotations = props.getAnnotations();
    let width = props.getWidth();
    let height = props.getHeigh();
    let url = props.getURL();
    let [tempStyle, setTempStyle] = useState(null);
    // let selectedCategories = props.getSelectedCategories();

    const data = [
        {category: "A", bt1: "", bt2: "", bt3: "", bt4: "", bt5: ""},
        {category: "B", bt1: "", bt2: "", bt3: "", bt4: "", bt5: ""},
        {category: "C", bt1: "", bt2: "", bt3: "", bt4: "", bt5: ""}
    ];

    const filters = [
        {name: "BaseType", items: ["bt1", "bt2", "bt3", "bt4", "bt5"]},
        {name: "FootMarkType", items: ["ft1", "ft2", "ft3", "ft4", "ft5"]}
    ];

    useEffect(() => {

    }, [categories])

    let handleEvent = (event) => {
        event.preventDefault();
        if (event.type === "mousedown") {
            setTempStyle(event.target.getAttribute('style'))
            event.target.style.clip = ''
            event.target.style.zIndex = 1
            // console.log("Mouse Down", event.target.style)
        } else {
            event.target.style = tempStyle
            // console.log("Mouse Up", event.target.style)
        }
    }

    return (
        <div className="tg-wrap">
            <Table striped responsive className={'table-image table-bordered'} size="lg" style={{}}>
                <thead>
                <tr>
                    <th className="tg-baqh" rowSpan="2">
                        Categories
                    </th>
                    {filters.map((cat) => (
                        <th className="tg-baqh" colSpan="5" style={{textAlign: 'center'}}>
                            {cat.name}
                        </th>
                    ))}
                </tr>
                <tr>
                    {filters.map((cat) => (
                        cat.items.map((item) => (
                            <th className="tg-0lax" style={{textAlign: 'center'}}>
                                {item}
                            </th>
                        ))
                    ))}
                </tr>
                </thead>
                <tbody>
                {categories.map((cat) => (
                    <tr>
                        <td className="tg-0lax">{cat.name.toUpperCase()}</td>
                        {
                            filters.map((filter) => (
                                filter.items.map((item) => (
                                        <td style={{padding: '0px', textAlign: 'center'}}>
                                            {annotations.map((anno) => {
                                                if (anno.category_id === cat.id && anno.tags[filter.name] !== undefined && anno.tags[filter.name].includes(item)) {
                                                    return (
                                                        // console.log(anno.tags[filter.name])
                                                        <span
                                                            style={{
                                                                marginTop: anno.bbox[3]+ 5,
                                                                // marginLeft: anno.bbox[2] - 25,
                                                                marginRight: anno.bbox[2]+10,
                                                                display: 'inline-block'
                                                            }}
                                                            filter={anno.tags[filter.name]}
                                                        >
                                                            <img onMouseUp={handleEvent} onMouseDown={handleEvent} style={{
                                                                position: 'absolute',
                                                                overflow: 'clip',
                                                                objectFit: 'cover',
                                                                clip: `rect(${anno.bbox[1]}px, ${anno.bbox[0] + anno.bbox[2]}px, ${anno.bbox[1] + anno.bbox[3]}px, ${anno.bbox[0]}px)`,
                                                                marginLeft: -anno.bbox[0],
                                                                marginTop: -(anno.bbox[1] + anno.bbox[3]),
                                                                zIndex: 0
                                                            }}
                                                                 src={url} alt={`Annotation ${anno.id}`}
                                                            />
                                                        </span>
                                                    )
                                                }
                                            })}
                                        </td>
                                    )
                                )
                            ))
                        }
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
}


export default Cliplet3;
