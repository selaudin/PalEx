import React, {useEffect, useRef, useState} from 'react'
import CanvasCreator from "./CanvasCreator";
import {Button} from "react-bootstrap";
import Collapse from 'react-bootstrap/Collapse';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Cliplet4 from "./Cliplet4";
import makeAnimated from 'react-select/animated';
// import './style.css';
import Select from "react-select";


// function Index(props) {
//     let [file, setFile] = useState('');
//     let [images, setImages] = useState([]); // array of all images
//     let [annotations, setAnnotations] = useState([]);
//     let [categories, setCategories] = useState([]);
//     let [texts, setTexts] = useState([]);
//     let [textList, setTextList] = useState([]);
//     let [imageAnnotations, setImageAnnotations] = useState([]);
//     let [imageList, setImageList] = useState([]); // images with certain width and height property for dropdown
//     let [selectedImage, setSelectedImage] = useState(''); // selected image
//     let [isActive, setActive] = useState(false);
//     let [isSelected, setIsSelected] = useState(false);
//     let [isImageListActive, setIsImageListActive] = useState(false);
//     let [externalLink, setExternalLink] = useState('');
//     let [selectedCategories, setSelectedCategories] = useState([]);
//     let [selectedFilters, setSelectedFilters] = useState({
//         "BaseType": {
//             "BaseType": true,
//             "bt1": true,
//             "bt2": true,
//             "bt3": true,
//             "bt4": true,
//             "bt5": true
//         },
//         "FootMarkType": {
//             "FootMarkType": true,
//             "ft1": true,
//             "ft2": true,
//             "ft3": true,
//             "ft4": true,
//             "ft5": true,
//             "ft6": true,
//             "ft7": true,
//             "ft8": true,
//             "ft9": true
//         }
//     });
//     let [showContent, setShowContent] = useState(true);
//
//     const changeSelectedCategories = (newSet) => {
//         setSelectedCategories(newSet);
//     }
//
//     const getSelectedCategories = () => {
//         return selectedCategories;
//     }
//
//     const changeSelectedFilters = (newSet) => {
//         setSelectedFilters(newSet);
//     }
//
//     const getSelectedFilters = () => {
//         return selectedFilters;
//     }
//
//     let canvas = useRef(null);
//     let width = props.getWidth();
//     let width2 = width / 2;
//     let height = props.getHeight();
//     let height2 = height / 2;
//
//     useEffect(() => {
//         file = props.file;
//         console.log(props.file);
//
//         annotations = file.annotations;
//         setAnnotations(file.annotations);
//
//         images = file.images;
//         setImages(file.images);
//
//         categories = file.categories;
//         setCategories(file.categories);
//
//         texts = file.texts;
//         setTexts(file.texts);
//
//         displayTMs();
//     }, [])
//
//     const displayTMs = () => {
//         texts.forEach((text) => {
//             textList.push({
//                 label: text.txt_ckn,
//                 value: text.txt_id,
//                 images: text.txt_image_ids,
//                 tm: text.tm
//             });
//         });
//
//         let textList2 = textList.sort((a, b) => a.tm - b.tm);
//         setTextList(textList2);
//         setActive(true);
//     }
//
//     const displayImages = (imagess) => {
//         setImageList([]);
//         imageList = [];
//         imagess.forEach((imagee) => {
//             images.forEach((image) => {
//                 if (imagee == image.id) {
//                     imageList.push({
//                         label: image.file_name,
//                         value: image.img_url,
//                         width: image.width,
//                         height: image.height
//                     });
//                 }
//             });
//         });
//         setImageList(imageList);
//         setIsImageListActive(true);
//         onDropdownSelected('nothing', imageList[0].value, imageList[0].width, imageList[0].height);
//     }
//
//     let onDropdownTMSelected = (e) => {
//         e.preventDefault();
//         setSelectedCategories([]);
//         setIsSelected(false);
//
//         const selectedOptions = Array.from(e.target.selectedOptions);
//         const selectedTMIDs = selectedOptions.map(option => JSON.parse(option.value));
//         console.log('selected TM IDs:', selectedTMIDs);
//
//         const selectedImages = selectedOptions.flatMap(option => option.getAttribute('images').match(/\d+/g));
//         console.log('selected images:', selectedImages);
//         displayImages(selectedImages);
//
//         const selectedTMs = selectedOptions.map(option => option.getAttribute('tm'));
//         console.log('selected TMs:', selectedTMs);
//         setExternalLink(selectedTMs[0]);
//     }
//
//     let onDropdownSelected = (e, img, width, height) => {
//         if (e.type == 'change') {
//             if (e.target.value !== '') {
//                 img = JSON.parse(e.target.value);
//                 //console.log('Image selected:', img);
//                 width = e.target.options[e.target.selectedIndex].getAttribute('width');
//                 // console.log('Width selected:', width);
//                 height = e.target.options[e.target.selectedIndex].getAttribute('height');
//                 // console.log('Height selected:', height);
//             }
//         } else if (img && width && height != null) {
//             console.log("done");
//         } else {
//             img = JSON.parse(e.getAttribute('value'));
//             width = e.getAttribute('width');
//             height = e.getAttribute('height');
//         }
//
//         props.OnUrlChange(img);
//         props.changeHeight(height);
//         props.changeWidth(width);
//         props.changeCategories(categories);
//
//         // get the image object with all properties from the json file
//         images.map((imagee) => {
//             if (img == imagee.img_url) {
//                 selectedImage = imagee;
//                 setSelectedImage(imagee);
//             }
//         });
//         console.log('selected image: ', selectedImage);
//         setIsSelected(true);
//
//         // retrieve the annotations and save them globally
//         setImageAnnotations([]);
//         let tmp = []; // to store annotations
//         annotations.forEach((annotation) => {
//             if (annotation.image_id == selectedImage.id) {
//                 tmp.push(annotation);
//             }
//         });
//         imageAnnotations = tmp;
//         setImageAnnotations(tmp);
//         props.changeAnnotations(tmp);
//     }
//
//     let onOptionSelectPrevious = (e) => {
//         e.preventDefault();
//         let select = document.getElementById('mySelect');
//         if (select.selectedIndex > 0) {
//             select.selectedIndex -= 1;
//             select.value = select.options[select.selectedIndex].value;
//             let element = select.options[select.selectedIndex];
//             onDropdownSelected(element);
//         }
//     }
//
//     let onOptionSelectNext = (e) => {
//         e.preventDefault();
//         let select = document.getElementById('mySelect');
//         if (select.selectedIndex < select.childElementCount - 1) {
//             select.selectedIndex += 1;
//             select.value = select.options[select.selectedIndex].value;
//             let element = select.options[select.selectedIndex];
//             onDropdownSelected(element);
//         }
//     }
//
//
//     return (
//         <div>
//             <Container fluid="xxxl">
//                 <h1 style={{textAlign: 'center'}}>PalEx2</h1>
//                 <Row>
//                     <Col sm={1} style={{display: 'flex', justifyContent: 'center', width: 'auto'}}>
//                         <button
//                             type="button"
//                             className="btn btn-primary"
//                             onClick={() => setShowContent(!showContent)}
//                             aria-controls="collapse-toolbar"
//                             aria-expanded={showContent}
//                         >
//                             ←/→
//                         </button>
//                     </Col>
//                     <Collapse in={showContent} dimension="height">
//                         <Col sm={2} id='FirstLayout'>
//                             {/*<TM listt={optionsFromTextList}/>*/}
//                             <h5>TM:</h5>
//                             <select id="TmSelect" onChange={onDropdownTMSelected}>
//                                 <option>-- Select a TM --</option>
//                                 {isActive && textList.map(text =>
//                                     <option
//                                         key={text.label}
//                                         value={JSON.stringify(text.value)}
//                                         images={text.images}
//                                         tm={text.tm}
//                                     >
//                                         {text.label}
//                                     </option>
//                                 )}
//                             </select>
//                             {isImageListActive &&
//                             <div>
//                                 <h5>Select your image:</h5>
//                                 <select id="mySelect" onChange={onDropdownSelected}>
//                                     {/*<option>-- Select an image --</option>*/}
//                                     {imageList.map(image =>
//                                         <option
//                                             key={image.label}
//                                             name={image.label}
//                                             width={image.width}
//                                             height={image.height}
//                                             value={JSON.stringify(image.value)}
//                                         >
//                                             {image.label}
//                                         </option>
//                                     )}
//                                 </select>
//                                 <span style={{display: 'block'}}>
//                                     <Button size="sm" style={{cursor: 'pointer', marginLeft: '5px', marginRight: '2px'}}
//                                             onClick={onOptionSelectPrevious}>
//                                         ←
//                                     </Button>
//                                     <Button size="sm" style={{cursor: 'pointer'}} onClick={onOptionSelectNext}>
//                                         →
//                                     </Button>
//                                 </span>
//                             </div>
//                             }
//                             {isSelected &&
//                             <p style={{fontSize: '12px'}}>
//                                 Click <a target='_blank' href={'https://papyri.info/dclp/' + externalLink}>HERE</a>
//                                 for more info on the papyri!
//                             </p>
//                             }
//                             {isSelected &&
//                             <CanvasCreator
//                                 getURL={props.getURL}
//                                 getWidth={props.getWidth}
//                                 getHeight={props.getHeight}
//                                 getAnnotations={props.getAnnotations}
//                                 getCategories={props.getCategories}
//                                 external={'https://papyri.info/dclp/' + externalLink}
//                                 getCanvas={canvas}
//                                 getSelectedCategories={getSelectedCategories}
//                                 changeSelectedCategories={changeSelectedCategories}
//                                 getSelectedFilters={getSelectedFilters}
//                                 changeSelectedFilters={changeSelectedFilters}
//                             />
//                             }
//                         </Col>
//                     </Collapse>
//                     {isSelected &&
//                     <Col sm={9} id='SecondLayout'>
//                         <Tabs style={{position: ""}}
//                               defaultActiveKey="viewer"
//                               id="uncontrolled-tab-example"
//                               className="mb-3"
//                         >
//                             <Tab eventKey="viewer" title="Viewer" style={{}}>
//                                 <div id='canvasLayout' className="Canvas" style={{
//                                     height: window.innerHeight * 0.8,
//                                     width: 'max-content',
//                                     overflow: 'scroll',
//                                     border: 'solid',
//                                     borderWidth: 'thin',
//                                     display: 'none'
//                                 }}>
//                                     <canvas className="can canvas" ref={canvas} width={width} height={height}
//                                             style={{transform: 'translate3d(' + width2 + ', ' + height2 + ', 0px) scale(1)'}}></canvas>
//                                 </div>
//                                 <span>
//                                     <b>Hint:</b> Use SHIFT+scroll wheel to zoom in/out!
//                                 </span>
//                             </Tab>
//                             <Tab eventKey="explorer" title="Explorer" style={{display: "flex"}}>
//                                 <Cliplet4
//                                     getSelectedFilters={getSelectedFilters}
//                                     getSelectedCategories={getSelectedCategories}
//                                     getCategories={props.getCategories}
//                                     getURL={props.getURL}
//                                     getAnnotations={props.getAnnotations}
//                                     getWidth={props.getWidth}
//                                     getHeigh={props.getHeight}
//                                 />
//                             </Tab>
//                         </Tabs>
//                     </Col>
//                     }
//                 </Row>
//             </Container>
//         </div>
//     )
// };

function Index(props) {
    let [file, setFile] = useState(props.file);
    let [images, setImages] = useState([]); // array of all images
    let [annotations, setAnnotations] = useState([]);
    let [categories, setCategories] = useState([]);
    let [texts, setTexts] = useState([]);
    let [textList, setTextList] = useState([]);
    let [imageAnnotations, setImageAnnotations] = useState([]);
    let [imageList, setImageList] = useState([]); // images with certain width and height property for dropdown
    let [selectedImage, setSelectedImage] = useState(''); // selected image
    let [isActive, setActive] = useState(false);
    let [isSelected, setIsSelected] = useState(false);
    let [isImageListActive, setIsImageListActive] = useState(false);
    let [externalLink, setExternalLink] = useState('');
    let [selectedCategories, setSelectedCategories] = useState([]);
    let [selectedFilters, setSelectedFilters] = useState({
        "BaseType": {
            "BaseType": true,
            "bt1": true,
            "bt2": true,
            "bt3": true,
            "bt4": true,
            "bt5": true
        },
        "FootMarkType": {
            "FootMarkType": true,
            "ft1": true,
            "ft2": true,
            "ft3": true,
            "ft4": true,
            "ft5": true,
            "ft6": true,
            "ft7": true,
            "ft8": true,
            "ft9": true
        }
    });
    let [showContent, setShowContent] = useState(true);
    let [fileNameURL, setFileNameURL] = useState(props.fileNameURLParam);
    let [imageIdUrl, setImageIdUrl] = useState(props.imageIdURLParam);

    // If we don't have the file name from the uploaded file then we get it from the URL
    useEffect(() => {
        if (!fileNameURL) {
            setFileNameURL(props.fileNameURLParam1);
        }
    },[])

    console.log('filePathURLParam:', fileNameURL);
    console.log('imageIdURLParam:', imageIdUrl);

    const changeSelectedCategories = (newSet) => {
        setSelectedCategories(newSet);
    }

    const getSelectedCategories = () => {
        return selectedCategories;
    }

    const changeSelectedFilters = (newSet) => {
        setSelectedFilters(newSet);
    }

    const getSelectedFilters = () => {
        return selectedFilters;
    }

    let canvas = useRef(null);
    let width = props.getWidth();
    let width2 = width / 2;
    let height = props.getHeight();
    let height2 = height / 2;

    useEffect(() => {
        file = props.file;
        console.log('file', props.file);

        annotations = file.annotations;
        setAnnotations(file.annotations);

        images = file.images;
        setImages(file.images);

        categories = file.categories;
        setCategories(file.categories);

        displayImages(images);
        setIsImageListActive(true);
    }, [props.file])

    useEffect(() => {
        if (fileNameURL && imageIdUrl) {
            console.log('fileNameURL:', fileNameURL);
            console.log('imageIdUrl:', imageIdUrl);
            let img = images.find(image => image.id == imageIdUrl);
            console.log('img:', img);
            if(img){
                onDropdownSelected(img, false);
            }
            else{
                console.log("Image not found")
                // if image not found the redirect to notfound route
                props.history.push(`/notfound`);
            }
        }
    },[fileNameURL, imageIdUrl])

    function extractConsecutiveDigits(input) {
        let matches = input.match(/\d+/g);
        if (matches) {
            return matches[0];
        }
    }

    function ImageNotFound() {
        return <div>Image not found</div>
    }

    const displayImages = (images) => {
        console.log('images:', images);
        images.forEach((image) => {
            let extractedTM = extractConsecutiveDigits(image.file_name);
            imageList.push({
                id: image.id,
                label: image.file_name,
                value: image.img_url,
                width: image.width,
                height: image.height,
                tm: extractedTM
            });
        });
        console.log("imageList", imageList[0])
        setImageList(imageList);

        // If we don't have the image id from the uploaded file, then we select the first image
        // but we have to redirect to the route that ends with the image id
        // in order for the image to be displayed
        if(fileNameURL && !imageIdUrl){
            onDropdownSelected(imageList[0], false, true);
        }
        onDropdownSelected(imageList[0], false, false);
    }

    let onDropdownTMSelected = (e, image) => {
        e.preventDefault();
        // setSelectedCategories([]);
        // setIsSelected(false);

        const selectedOptions = Array.from(e.target.selectedOptions);
        // const selectedTMIDs = selectedOptions.map(option => JSON.parse(option.value));
        // console.log('selected TM IDs:', selectedTMIDs);

        const selectedImages = selectedOptions.flatMap(option => option.getAttribute('images').match(/\d+/g));
        console.log('selected images:', selectedImages);
        displayImages(selectedImages);

        // Try to get the TM, so we can link it with the external link for papyri.info
        const selectedTMs = selectedOptions.map(option => option.getAttribute('tm'));
        console.log('selected TMs:', selectedTMs);
        setExternalLink(selectedTMs[0]);
    }

    let onDropdownSelected = (e, jsonparse=true, redirect=true) => {
        console.log("e.value", e.value)
        let img = ''

        // if we pass the image object directly, we can get the image url directly
        // otherwise we have to parse the value
        if(!jsonparse){
            img = e.img_url;
        }else{
            img = JSON.parse(e.value);
        }

        let id = e.id;
        let width = e.width;
        let height = e.height;
        let tm = e.tm;
        console.log("e: ",  e);
        console.log('ImageID selected:', id);
        console.log('Image selected:', img);
        console.log('Width selected:', width);
        console.log('Height selected:', height);
        console.log('TM selected:', tm);

        // redirect to route that ends with the image id
        // window.location.href = '/palex/' + fileNameURL + '/' + id;
        console.log(fileNameURL)
        if(redirect) {
            props.history.push(`/palex/${fileNameURL}/${id}`);
        }

        props.OnUrlChange(img);
        props.changeHeight(height);
        props.changeWidth(width);
        props.changeCategories(categories);

        // get the image object with all properties from the json file
        images.map((image) => {
            if (id === image.id) {
                selectedImage = image;
                setSelectedImage(image);
            }
        });
        console.log('selected image: ', selectedImage);
        setIsSelected(true);

        // retrieve the annotations and save them globally
        setImageAnnotations([]);
        let tmp = []; // to store annotations
        annotations.forEach((annotation) => {
            if (annotation.image_id == selectedImage.id) {
                tmp.push(annotation);
            }
        });
        console.log('annotations:', tmp);
        imageAnnotations = tmp;
        setImageAnnotations(tmp);
        props.changeAnnotations(tmp);

        // Try to get the TM, so we can link it with the external link for papyri.info

        console.log('selected TMs:', tm);
        setExternalLink(tm);
    }

    return (
        <div>
            {file &&
                <Container fluid="xxxl">
                    {/*<h1 style={{textAlign: 'center'}}>PalEx</h1>*/}
                    <Row>
                        <div style={{display: 'flex', justifyContent: 'center', width: 'automatic', paddingLeft: '15px', paddingRight: '15px'}}>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => setShowContent(!showContent)}
                                aria-controls="collapse-toolbar"
                                aria-expanded={showContent}
                            >
                                ←/→
                            </button>
                        </div>
                        <Collapse in={showContent} dimension="height">
                            <Col sm={2} id='FirstLayout'>
                                {isImageListActive &&
                                    <div>
                                        <h5>Select your image:</h5>
                                        <Select
                                            id="mySelect"
                                            options={imageList.map(image => ({
                                                id: image.id,
                                                label: image.label,
                                                value: JSON.stringify(image.value),
                                                width: image.width,
                                                height: image.height,
                                                tm: image.tm
                                            }))}
                                            onChange={onDropdownSelected}
                                            placeholder="-- Search for an image --"
                                            maxMenuHeight={700}
                                        />
                                    </div>
                                }
                                {isSelected &&
                                    <p style={{fontSize: '12px'}}>
                                        Click <a target='_blank' href={'https://www.trismegistos.org/text/' + externalLink}>HERE</a>
                                        for more info on the papyri!
                                    </p>
                                }
                                {isSelected &&
                                    <CanvasCreator
                                        getFile={file}
                                        getURL={props.getURL}
                                        getWidth={props.getWidth}
                                        getHeight={props.getHeight}
                                        getAnnotations={props.getAnnotations}
                                        getCategories={props.getCategories}
                                        getCanvas={canvas}
                                        getSelectedCategories={getSelectedCategories}
                                        changeSelectedCategories={changeSelectedCategories}
                                        getSelectedFilters={getSelectedFilters}
                                        changeSelectedFilters={changeSelectedFilters}
                                    />
                                }
                            </Col>
                        </Collapse>
                        {isSelected &&
                            <Col sm={8} id='SecondLayout'>
                                <Tabs style={{position: ""}}
                                      defaultActiveKey="viewer"
                                      id="uncontrolled-tab-example"
                                      className="mb-3"
                                >
                                    <Tab eventKey="viewer" title="Viewer" style={{}}>
                                        <div id='canvasLayout' className="Canvas" style={{
                                            height: window.innerHeight * 0.8,
                                            width: 'max-content',
                                            overflow: 'scroll',
                                            border: 'solid',
                                            borderWidth: 'thin',
                                            display: 'none'
                                        }}>
                                            <canvas className="can canvas" ref={canvas} width={width} height={height}
                                                    style={{transform: 'translate3d(' + width2 + ', ' + height2 + ', 0px) scale(1)'}}></canvas>
                                        </div>
                                        <span>
                                    <b>Hint:</b> Use SHIFT+scroll wheel to zoom in/out!
                                </span>
                                    </Tab>
                                    <Tab eventKey="explorer4" title="Explorer">
                                        <Cliplet4
                                            getSelectedFilters={getSelectedFilters}
                                            getSelectedCategories={getSelectedCategories}
                                            getCategories={props.getCategories}
                                            getURL={props.getURL}
                                            getAnnotations={props.getAnnotations}
                                            getWidth={props.getWidth}
                                            getHeigh={props.getHeight}
                                        />
                                    </Tab>
                                </Tabs>
                            </Col>
                        }
                    </Row>
                </Container>
            }
        </div>
    )
};

export default Index;