import React, {useEffect} from "react";

function Cliplet2(props) {
    let categories = props.getCategories();
    let annotations = props.getAnnotations();
    let width = props.getWidth();
    let height = props.getHeigh();
    let url = 'http://localhost/' + props.getURL();

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

    return (
        <div className="tg-wrap">
            <table className="tg">
                <thead>
                <tr>
                    <th className="tg-baqh" rowSpan="2">
                        Categories
                    </th>
                    {filters.map((cat) => (
                        <th key={cat.name} className="tg-baqh" colSpan="5" style={{textAlign: 'center'}}>
                            {cat.name}
                        </th>
                    ))}
                </tr>
                <tr>
                    {filters.map((cat) => (
                        cat.items.map((item) => (
                            <th key={item} className="tg-0lax" style={{textAlign: 'center'}}>
                                {item}
                            </th>
                        ))
                    ))}
                </tr>
                </thead>
                <tbody>
                {categories.map((cat) => (
                    <tr key={cat.name}>
                        <td className="tg-0lax" style={{fontWeight: 'bold'}}>{cat.name.toUpperCase()}</td>
                        {
                            filters.map((filter) => (
                                // <td style={{padding: '5px'}} key={filter.name}>
                                filter.items.map((item) => (
                                        <td style={{padding: '0px', textAlign: 'center'}} key={filter.name}>
                                            {annotations.map((anno) => {
                                                if (anno.category_id === cat.id && anno.tags[filter.name] !== undefined && anno.tags[filter.name].includes(item)) {
                                                    // console.log(anno.tags[filter.name]);
                                                    return (
                                                        <div style={{
                                                            display: 'inline-block',
                                                            paddingRight: anno.bbox[2] + 5,
                                                            paddingBottom: anno.bbox[3] + 5
                                                        }} key={anno.id}>
                                                            <img key={item} style={{
                                                                position: 'absolute',
                                                                overflow: 'clip',
                                                                objectFit: 'cover',
                                                                clip: `rect(${anno.bbox[1]}px, ${anno.bbox[0] + anno.bbox[2]}px, ${anno.bbox[1] + anno.bbox[3]}px, ${anno.bbox[0]}px)`,
                                                                marginLeft: -anno.bbox[0],
                                                                marginTop: -anno.bbox[1]
                                                            }}
                                                                 src={url} alt={`Annotation ${anno.id}`}
                                                            />
                                                        </div>
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
            </table>
        </div>
    );
}


export default Cliplet2;


// <tbody>
// {categories.map((cat) => (
//     <tr key={cat.name}>
//         <td className="tg-0lax">{cat.name.toUpperCase()}</td>
//         {annotations.map((anno) => {
//             if (anno.category_id === cat.id) {
//                 const filteredItems = filters.map((filter) => {
//                     return filter.items.filter((item) => anno.tags[filter.name] !== undefined && anno.tags[filter.name].includes(item))
//                         .map((item) => (
//                             <img key={item} style={{
//                                 position: 'absolute',
//                                 overflow: 'clip',
//                                 objectFit: 'cover',
//                                 clip: `rect(${anno.bbox[1]}px, ${anno.bbox[0] + anno.bbox[2]}px, ${anno.bbox[1] + anno.bbox[3]}px, ${anno.bbox[0]}px)`,
//                                 marginLeft: -anno.bbox[0],
//                                 marginTop: -anno.bbox[1]
//                             }}
//                                  src={url} alt={`Annotation ${anno.id}`} />
//                         ));
//                 }).reduce((prev, curr) => prev.concat(curr), []); // Concatenate filtered items into a single array
//                 return (
//                     <td style={{paddingRight: anno.bbox[2], paddingBottom: anno.bbox[3]}} key={anno.id}>
//                         {filteredItems}
//                     </td>
//                 );
//             }
//             return null;
//         })}
//     </tr>
// ))}
// </tbody>