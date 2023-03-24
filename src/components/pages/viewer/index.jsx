import React, {useEffect, useRef, useState} from 'react'
import CanvasCreator from "./CanvasCreator";
import {Button} from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Cliplet from "./Cliplet";
import Test from "./TEST"

function Index(props){
    let [file, setFile]= useState('');
    let [images, setImages]= useState([]); // array of all images
    let [annotations, setAnnotations]= useState([]);
    let [categories, setCategories] = useState([]);
    let [texts, setTexts] = useState([]);
    let [textList, setTextList] = useState([]);
    let [imageAnnotations, setImageAnnotations] = useState([]);
    let [imageList, setImageList]= useState([]); // images with certain width and height property for dropdown
    let [selectedImage, setSelectedImage]= useState(''); // selected image
    let [isActive, setActive] = useState(false);
    let [isSelected, setIsSelected] =  useState(false);
    let [isImageListActive, setIsImageListActive] = useState(false);
    let [externalLink, setExternalLink] = useState('');
    let [selectedCategories, setSelectedCategories] = useState([]);

    const changeSelectedCategories = (newSet) =>{
        setSelectedCategories(newSet);
    }

    const getSelectedCategories = () => {
        return selectedCategories;
    }

    let canvas = useRef(null);
    let width = props.getWidth();
    let width2 = width/2;
    let height = props.getHeight();
    let height2 = height/2;

     useEffect( () => {
        file = props.file;
        console.log(props.file);

        annotations = file.annotations;
        setAnnotations(file.annotations);

        images = file.images;
        setImages(file.images);

        categories = file.categories;
        setCategories(file.categories);

        texts = file.texts;
        setTexts(file.texts);

        displayTMs();
    }, [])

    const displayTMs=()=>{
        texts.forEach((text) => {
            textList.push({
                label: text.txt_ckn,
                value: text.txt_id,
                images: text.txt_image_ids,
                tm: text.tm
            });
        });

        textList.sort((a, b) => a.tm-b.tm);
        setActive(true);
    }

    const displayImages=(imagess)=>{
        setImageList([]);
        imageList = [];
        imagess.forEach((imagee) => {
            images.forEach((image) => {
                if(imagee == image.id){
                    imageList.push({
                        label: image.file_name,
                        value: image.img_url,
                        width: image.width,
                        height: image.height
                    });
                }
            });
        });
        setImageList(imageList);
        setIsImageListActive(true);
        onDropdownSelected('nothing', imageList[0].value, imageList[0].width, imageList[0].height);
    }

    let onDropdownTMSelected = (e) => {
        e.preventDefault();
        setSelectedCategories([]);
        setIsSelected(false);
        if (e.target.value !== '') {
            const TM_ID = JSON.parse(e.target.value);
            console.log('selected TM\'s ID:', TM_ID);

            let imagess = e.target.options[e.target.selectedIndex].getAttribute('images');
            imagess = imagess.match(/\d+/g)
            console.log('selected TM\'s images:', imagess);
            displayImages(imagess);

            let TM = e.target.options[e.target.selectedIndex].getAttribute('tm');
            setExternalLink(TM);
        }
    }

    let onDropdownSelected = (e, img, width, height) => {
        if(e.type=='change'){
            if (e.target.value !== '') {
                img = JSON.parse(e.target.value);
                //console.log('Image selected:', img);
                width = e.target.options[e.target.selectedIndex].getAttribute('width');
                // console.log('Width selected:', width);
                height = e.target.options[e.target.selectedIndex].getAttribute('height');
                // console.log('Height selected:', height);
            }
        }
        else if(img && width && height != null){
            console.log("done");
        }
        else{
            img = JSON.parse(e.getAttribute('value'));
            width = e.getAttribute('width');
            height = e.getAttribute('height');
        }

        props.OnUrlChange(img);
        props.changeHeight(height);
        props.changeWidth(width);
        props.changeCategories(categories);

        // get the image object with all properties from the json file
        images.map((imagee)=>{
            if(img==imagee.img_url){
                selectedImage = imagee;
                setSelectedImage(imagee);
            };
        });
        console.log('selected image: ', selectedImage);
        setIsSelected(true);

        // retrieve the annotations and save them globally
        setImageAnnotations([]);
        let tmp = []; // to store annotations
        annotations.forEach((annotation)=>{
            if(annotation.image_id==selectedImage.id){
                tmp.push(annotation);
            }
        });
        imageAnnotations = tmp;
        setImageAnnotations(tmp);
        props.changeAnnotations(tmp);
    }

    let onOptionSelectPrevious = (e) => {
        e.preventDefault();
        let select = document.getElementById('mySelect');
        if(select.selectedIndex>0) {
            select.selectedIndex -= 1;
            select.value = select.options[select.selectedIndex].value;
            let element = select.options[select.selectedIndex];
            onDropdownSelected(element);
        }
    }

    let onOptionSelectNext = (e) => {
        e.preventDefault();
        let select = document.getElementById('mySelect');
        if(select.selectedIndex<select.childElementCount-1){
            select.selectedIndex += 1;
            select.value = select.options[select.selectedIndex].value;
            let element = select.options[select.selectedIndex];
            onDropdownSelected(element);
        }
    }

    return(
        <div >
            <Container fluid="xxl">
                <h1 style={{textAlign: 'center'}}>PalEx</h1>
                <Tabs
                    defaultActiveKey="profile"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="viewer" title="Viewer" style={{}}>
                        <Row>
                            <Col sm={2} id='FirstLayout'>
                                <h5>TM:</h5>
                                <select id="TmSelect" onChange={onDropdownTMSelected}>
                                    <option>-- Select a TM --</option>
                                    {isActive && textList.map(text =>
                                        <option
                                            key={text.label}
                                            value={JSON.stringify(text.value)}
                                            images={text.images}
                                            tm={text.tm}
                                        >
                                            {text.label}
                                        </option>
                                    )}
                                </select>
                                {isImageListActive &&
                                <div>
                                    <h5>Select your image:</h5>
                                    <select id="mySelect" onChange={onDropdownSelected}>
                                        {/*<option>-- Select an image --</option>*/}
                                        {imageList.map(image =>
                                            <option
                                                key={image.label}
                                                name={image.label}
                                                width={image.width}
                                                height={image.height}
                                                value={JSON.stringify(image.value)}
                                            >
                                                {image.label}
                                            </option>
                                        )}
                                    </select>
                                    <Button size="sm" style={{cursor: 'pointer', marginLeft: '5px', marginRight: '2px'}} onClick={onOptionSelectPrevious}>
                                        ←
                                    </Button>
                                    <Button size="sm" style={{cursor: 'pointer'}} onClick={onOptionSelectNext}>
                                        →
                                    </Button>
                                </div>
                                }
                                { isSelected &&
                                <p>Click <a target='_blank' href={'https://papyri.info/dclp/'+externalLink} >HERE</a> for more info on the papyri!</p>
                                }
                                { isSelected &&
                                <CanvasCreator
                                    getURL={props.getURL}
                                    getWidth={props.getWidth}
                                    getHeight={props.getHeight}
                                    getAnnotations={props.getAnnotations}
                                    getCategories={props.getCategories}
                                    external={'https://papyri.info/dclp/'+externalLink}
                                    getCanvas={canvas}
                                    getSelectedCategories={getSelectedCategories}
                                    changeSelectedCategories={changeSelectedCategories}
                                />
                                }
                            </Col>
                            { isSelected &&
                            <Col sm={10} id='SecondLayout'>
                                <div id='canvasLayout' className="Canvas" style={{
                                    height: window.innerHeight * 0.7,
                                    width: window.innerWidth / 1.5,
                                    overflow: 'scroll',
                                    border: 'solid',
                                    borderWidth: 'thin',
                                    display: 'none'
                                }}>
                                    <canvas className="can canvas" ref={canvas} width={width} height={height} style={{transform: 'translate3d('+width2+', '+height2+', 0px) scale(1)'}}></canvas>
                                </div>
                                <span>
                                <b>Hint:</b> Use SHIFT+scroll wheel to zoom in/out!
                            </span>
                            </Col>
                            }
                        </Row>
                    </Tab>
                    <Tab eventKey="explorer" title="Explorer">
                       <Cliplet
                           getCategories={props.getCategories}
                           getURL={props.getURL}
                           getAnnotations={props.getAnnotations}
                           getWidth={props.getWidth}
                           getHeigh={props.getHeight}
                       />
                    </Tab>
                    <Tab eventKey="tester" title="Test">
                        <Test></Test>
                    </Tab>
                </Tabs>
            </Container>
        </div>
    )
};

export default Index;