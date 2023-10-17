import React, {useEffect, useState} from "react";
import {Table} from "react-bootstrap";

function Cliplet4(props) {
//     let categories = props.getCategories();
//     let annotations = props.getAnnotations();
//     let url = props.getURL();
//     let [tempStyle, setTempStyle] = useState(null);
//     let selectedCategories = props.getSelectedCategories();
//     let selectedFilters = props.getSelectedFilters();
//     console.log('selectedFilters', selectedFilters);
//     // console.log('selectedCategories length', selectedCategories.length);

//     // let selectedFilters = {
//     //     "BaseType": {
//     //         "BaseType": false,
//     //         "bt1": false,
//     //         "bt2": true,
//     //         "bt3": false,
//     //         "bt4": false,
//     //         "bt5": false
//     //     },
//     //     "FootMarkType": {
//     //         "FootMarkType": false,
//     //         "ft1": false,
//     //         "ft2": false,
//     //         "ft3": false,
//     //         "ft4": false,
//     //         "ft5": false,
//     //         "ft6": false,
//     //         "ft7": false,
//     //         "ft8": false,
//     //         "ft9": false
//     //     }
//     // };

//     // const filters = [
//     //     {name: "BaseType", items: ["bt1", "bt2", "bt3", "bt4", "bt5"]},
//     //     {name: "FootMarkType", items: ["ft1", "ft2", "ft3", "ft4", "ft5", "ft6", "ft7", "ft8", "ft9"]}
//     // ];

//     // let filters = selectedFilters;

//     useEffect(() => {

//     }, [categories])

//     useEffect(() => {
//         categories.filter(catt => selectedCategories.includes(catt.id.toString())).map((cat)=>(
//             console.log('effect', cat)
//         ))

//     }, [selectedCategories])

//     let handleEvent = (event) => {
//         event.preventDefault();
//         if (event.type === "mousedown") {
//             setTempStyle(event.target.getAttribute('style'))
//             event.target.style.clip = ''
//             event.target.style.zIndex = 1
//             // console.log("Mouse Down", event.target.style)
//         } else {
//             event.target.style = tempStyle
//             // console.log("Mouse Up", event.target.style)
//         }
//     }

//     return (
//         <div className="tg-wrap">
//             <Table striped responsive className={'table-image table-bordered'} size="lg" style={{}}>
//                 <thead>
//                 <tr>
//                     {/* <th className="tg-baqh" rowSpan="2">
//                         Categories
//                     </th>
//                     {Object.entries(selectedFilters).flatMap(([filterName, filterValues]) => {
//                         const shouldRenderFilter =
//                             filterValues.hasOwnProperty(filterName) &&
//                             (filterValues[filterName] ||
//                                 Object.values(filterValues).some((value) => value === true));

//                         if (shouldRenderFilter) {
//                             const filterItems = Object.entries(filterValues).filter(([itemName]) => itemName !== filterName);

//                             return (
//                                 <th
//                                     className="tg-baqh"
//                                     colSpan={filterItems.reduce((count, [itemName, itemValue]) => {
//                                         if (itemValue) {
//                                             return count + 1;
//                                         }
//                                         return count;
//                                     }, 0)}
//                                     style={{ textAlign: 'center' }}
//                                     key={filterName}
//                                 >
//                                     {filterName}
//                                 </th>
//                             );
//                         }
//                         return null;
//                     })} */}
//                 </tr>
//                 <tr>
//                     {Object.entries(selectedFilters).flatMap(([filterName, filterValues]) => {
//                         const shouldRenderFilter =
//                             filterValues.hasOwnProperty(filterName) &&
//                             (filterValues[filterName] ||
//                                 Object.values(filterValues).some((value) => value === true));

//                         if (shouldRenderFilter) {
//                             const filterItems = Object.entries(filterValues).filter(([itemName]) => itemName !== filterName);

//                             return filterItems.flatMap(([itemName, itemValue]) => {
//                                 if (itemValue) {
//                                     return (
//                                         <th className="tg-0lax" style={{ textAlign: 'center' }} key={itemName}>
//                                             {itemName}
//                                         </th>
//                                     );
//                                 }
//                                 return null;
//                             });
//                         }
//                         return null;
//                     })}
//                 </tr>
//                 </thead>



//                 <tbody>
//                 {categories.filter(catt => selectedCategories.length === 0 ||
//                     (selectedCategories.length !== 0 && selectedCategories.includes(catt.id.toString()))).map((cat) => (
//                     <tr>
//                         <td className="tg-0lax">{cat.name.toUpperCase()}</td>
//                         {
//                             Object.entries(filters).flatMap(([filterName, filterItems]) =>
//                                 Object.entries(filterItems).flatMap(([itemName, itemValue]) => {
//                                     if (itemName !== filterName && itemValue) {
//                                         return (
//                                             <td style={{padding: '0px', textAlign: 'center'}}>
//                                                 {annotations.filter((anno) => {
//                                                     return anno.category_id === cat.id &&
//                                                         anno.tags[filterName] !== undefined &&
//                                                         anno.tags[filterName].includes(itemName);
//                                                 }).map((anno) => (
//                                                     <span
//                                                         style={{
//                                                             marginTop: anno.bbox[3] + 5,
//                                                             marginRight: anno.bbox[2] + 10,
//                                                             display: 'inline-block'
//                                                         }}
//                                                         filter={anno.tags[filterName]}
//                                                     >
//                                                 <img onMouseUp={handleEvent} onMouseDown={handleEvent} style={{
//                                                     position: 'absolute',
//                                                     overflow: 'clip',
//                                                     objectFit: 'cover',
//                                                     clip: `rect(${anno.bbox[1]}px, ${anno.bbox[0] + anno.bbox[2]}px, ${anno.bbox[1] + anno.bbox[3]}px, ${anno.bbox[0]}px)`,
//                                                     marginLeft: -anno.bbox[0],
//                                                     marginTop: -(anno.bbox[1] + anno.bbox[3]),
//                                                     zIndex: 0
//                                                 }}
//                                                      src={url} alt={`Annotation ${anno.id}`}
//                                                 />
//                                             </span>
//                                                 ))}
//                                             </td>
//                                         );
//                                     }
//                                     return [];
//                                 })
//                             )
//                         }
//                     </tr>
//                 ))
//                 }
//                 </tbody>

//             </Table>
//         </div>
//     );
return null;
}


export default Cliplet4;
