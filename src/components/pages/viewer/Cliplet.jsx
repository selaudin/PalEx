import React, {useRef, useEffect, useState} from 'react';
import Form from "react-bootstrap/Form";
import {Table} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import CropImage from "./CropImage";

function Cliplet(props){
    let categories = props.getCategories();
    console.log(categories);
    // let categories = [
    //     {
    //         color: "aqua",
    //         id: 8,
    //         name: "α",
    //         supercategory: "Greek"
    //     }
    // ];
    let annotations = props.getAnnotations();
    let width = props.getWidth();
    let height = props.getHeigh();
    let url = 'http://localhost/'+props.getURL();
    const [crop, setCrop] = useState({
        unit: 'px', // Can be 'px' or '%'
        x: 50,
        y: 50,
        width: 100,
        height: 100
    });

    useEffect(()=>{

    },[categories])


    let tempHeight=0;
    let tempWidth=0;

    return(
        <div>
            <div className="wrapper">
                <Table striped responsive className={'table-image'} size="lg" style={{position: 'absolute'}}>
                    <thead id="tableHead">
                        <tr>
                            <th>Categories</th>
                            {/*<th>Bt1</th>*/}
                            {/*<th>Bt2</th>*/}
                            {/*<th>Bt3</th>*/}
                            <th>----</th>
                            <th>----</th>
                            <th>----</th>
                            <th>----</th>
                            <th>----</th>
                            <th>----</th>
                            <th>----</th>
                            <th>----</th>
                            <th>----</th>
                        </tr>
                    </thead>
                    <tbody id="tableBody" key={'cliplets'}>
                        {categories.map((cat) => (
                            <tr key={cat.name}>
                                <td style={{padding: '1rem'}}>{cat.name.toUpperCase()}</td>
                                {
                                    annotations.map((anno) => (
                                        anno.category_id === cat.id &&
                                        <td style={{paddingRight: anno.bbox[2], paddingBottom: anno.bbox[3]}} key={anno.id}>
                                            <img style={{
                                                position: 'absolute',
                                                overflow: 'clip',
                                                objectFit: 'cover',
                                                clip: 'rect('+anno.bbox[1]+'px,'+(anno.bbox[0]+anno.bbox[2])+'px,'+(anno.bbox[1]+anno.bbox[3])+'px,'+anno.bbox[0]+'px)',
                                                marginLeft: -anno.bbox[0],
                                                marginTop: -anno.bbox[1]
                                                }}
                                                src={url}
                                            />
                                        </td>
                                        // && console.log('rect('+anno.bbox[1]+'px,'+(anno.bbox[0]+anno.bbox[2])+'px,'+(anno.bbox[1]+anno.bbox[3])+'px,'+anno.bbox[0]+'px)')
                                        // && console.log(anno.bbox[0], anno.bbox[1], anno.bbox[2], anno.bbox[3])

                                    ))
                                }


                                {/*<td>*/}
                                {/*    <img style={{*/}
                                {/*        position: 'absolute',*/}
                                {/*        clip: 'rect(10px,20px,200px,0px)'}}*/}
                                {/*         src={url}*/}
                                {/*    />*/}
                                {/*</td>*/}

                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default Cliplet;