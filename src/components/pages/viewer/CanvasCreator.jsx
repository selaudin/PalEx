import React, {useRef, useEffect, useState, useReducer, useContext} from 'react';
import Form from 'react-bootstrap/Form';
import {setScale} from "../../../index";

function CanvasCreator(props){
    const [isLoaded, setIsLoaded] = useState(false);
    const [isPageLoaded, setIsPageLoaded] = useState(false);
    let [urll, setUrl] = useState('');
    var imageObj1 = new Image();
    const colors = [
        'aliceblue',
        'antiquewhite',
        'aqua',
        'aquamarine',
        'azure',
        'beige',
        'bisque',
        // 'black',
        'red', // here color replaced
        'blue',
        'blueviolet',
        'brown',
        'burlywood',
        'cadetblue',
        'chartreuse',
        'chocolate',
        'coral',
        'cornflowerblue',
        'cornsilk',
        'crimson',
        'cyan',
        'darkblue',
        'darkcyan',
        'darkgoldenrod',
        'darkgray',
        'darkgreen',
        'darkkhaki',
        'darkmagenta',
        'darkolivegreen',
        'darkorange',
        'darkorchid',
        'darkred',
        'darksalmon',
        'darkseagreen',
        'darkslateblue',
        'darkslategray',
        'darkturquoise',
        'darkviolet',
        'deeppink',
        'deepskyblue',
        'dimgray',
        'dodgerblue',
        'firebrick',
        'floralwhite',
        'forestgreen',
        'fuchsia',
        'gainsboro',
        'ghostwhite',
        'gold',
        'goldenrod',
        'gray',
        'green',
        'greenyellow',
        'honeydew',
        'hotpink',
        'indianred',
        'indigo',
        'ivory',
        'khaki',
        'lavender',
        'lavenderblush',
        'lawngreen',
        'lemonchiffon',
        'lightblue',
        'lightcoral',
        'lightcyan',
        'lightgoldenrodyellow',
        'lightgreen',
        'lightgrey',
        'lightpink',
        'lightsalmon',
        'lightseagreen',
        'lightskyblue',
        'lightslategray',
        'lightsteelblue',
        'lightyellow',
        'lime',
        'limegreen',
        'linen',
        'magenta',
        'maroon',
        'mediumaquamarine',
        'mediumblue',
        'mediumorchid',
        'mediumpurple',
        'mediumseagreen',
        'mediumslateblue',
        'mediumspringgreen',
        'mediumturquoise',
        'mediumvioletred',
        'midnightblue',
        'mintcream',
        'mistyrose',
        'moccasin',
        'navajowhite',
        'navy',
        'navyblue',
        'oldlace',
        'olive',
        'olivedrab',
        'orange',
        'orangered',
        'orchid',
        'palegoldenrod',
        'palegreen',
        'paleturquoise',
        'palevioletred',
        'papayawhip',
        'peachpuff',
        'peru',
        'pink',
        'plum',
        'powderblue',
        'purple',
        'blanchedalmond', // color replaced with red
        'rosybrown',
        'royalblue',
        'saddlebrown',
        'salmon',
        'sandybrown',
        'seagreen',
        'seashell',
        'sienna',
        'silver',
        'skyblue',
        'slateblue',
        'slategray',
        'snow',
        'springgreen',
        'steelblue',
        'tan',
        'teal',
        'thistle',
        'tomato',
        'turquoise',
        'violet',
        'wheat',
        'white',
        'whitesmoke',
        'yellow',
        'yellowgreen'
    ];

    // const canvas = useRef(null);
    let canvas = props.getCanvas;
    let ctx = null;

    // urll = 'https://app.d-scribes.philhist.unibas.ch/' + props.getURL();
    urll = 'http://localhost/' + props.getURL();

    let width = props.getWidth();
    let height = props.getHeight();
    let annotations =  props.getAnnotations();
    let categories = props.getCategories();
    let external = props.external;
    let [selectedCategories, setSelectedCategories] = useState(props.getSelectedCategories);
    let [imageCategories, setImageCategories] = useState([]);
    let [tempSelectedCat, setTempSelectedCat]= useState([]); //create a var that stores the selectedCat

    // console.log("width: ", width);
    // console.log("height: ", height);
    // console.log("annotations: ", annotations);
    // console.log("categories: ", categories);
    // console.log("external: ", external);
    // console.log("url: ", urll);
    // categories = assignColorToCategory(categories);
    // console.log("categories: ", categories);

    // when user changes TM, then reset the selected options
    useEffect(() => {
        let TMselect = document.getElementById('TmSelect');
        console.log(TMselect);
        TMselect.onchange = () => {
            setTempSelectedCat([]);
            let node = document.querySelector('.can'); // select the canvas
            if(node!=null){ // if it exists, then transform the scale to 1
                node.setAttribute('style','transform: translate3d(0px, 0px, 0px) scale(1);');
                setScale(1);
            }
        }
    }, []);

    useEffect(() => {
        // display the canvas
        let tempCanvas = document.getElementById("canvasLayout");
        tempCanvas.style.display = 'block';

        // change url
        categories = assignColorToCategory(categories, colors);
        let cleanURL = 'http://localhost' + props.getURL().substring(1);
        setUrl(cleanURL);
    }, []);

    useEffect(() => {
        // draw image
        // setSelectedCategories([]); // clean the selected categories when changing the image
        imageObj1.src = urll;
        imageObj1.onload = function() {
            if(ctx == null){
                ctx = canvas.current.getContext("2d");
                // Use same handler for pointer{up,cancel,out,leave} events since
                // the semantics for these events - in this app - are the same.

                // ctx.canvas.width  = window.innerWidth;
                // ctx.canvas.height = window.innerHeight;
                // ctx.scale(0.5,0.5,0.5);
            }
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.beginPath();
            ctx.drawImage(imageObj1, 0, 0);
            setIsLoaded(true);
        }
        setIsLoaded(false);

        // reset the scale when image is changed
        let node = document.querySelector('.can');
        if(node!=null){
            // node.setAttribute('style','transform: translate3d(0px, 0px, 0px) scale(1);');
            // setScale(1);
        }

        setSelectedCategories([]);
        return () => {console.log("second time disp") };
    }, [urll]);


    useEffect(() => {
        if (isLoaded) {
            setIsPageLoaded(true);
        }

        if(selectedCategories[0]==0){
            setSelectedCategories([]);
            console.log(selectedCategories[0]);
        }
        else if(selectedCategories.length!==0){
            // tempSelectedCat = selectedCategories; // save
            console.log('selectedCategories: ', selectedCategories);
            selectedCategories.forEach((cat) => {
                annotations.forEach((anno) => {
                    if (cat == anno.category_id) {
                        categories.forEach((catt) => {
                            if(catt.id == cat){
                                // console.log('--anno found--', anno);
                                // let color = '#db3232';
                                let color = catt.color;
                                let Info = { x: anno.bbox[0], y: anno.bbox[1], h: anno.bbox[3] , w: anno.bbox[2] };
                                let Style = { borderColor: color, borderWidth: 6 };
                                drawRect(Info, Style);
                            }
                        })
                    }
                });
            })
        }
        else if(tempSelectedCat.length!==0){
            setImageCategories([]);
            imageCategories = [];
            categories.forEach((category) => {
                annotations.forEach((anno) => {
                    if (category.id === anno.category_id) {
                        // console.log(category);
                        imageCategories.push(category);

                        tempSelectedCat.forEach((temp)=>{
                            if(temp==anno.category_id.toString()){
                                let color = category.color;
                                let Info = { x: anno.bbox[0], y: anno.bbox[1], h: anno.bbox[3] , w: anno.bbox[2] };
                                let Style = { borderColor: color, borderWidth: 4 };
                                drawRect(Info, Style);
                            }
                        })
                    }
                });
            })
            console.log(tempSelectedCat, selectedCategories);
            setImageCategories(imageCategories);
            displayImageCategories(imageCategories, categories, tempSelectedCat, onDropdownSelected, onSelectAll);
        }
        else{
            setImageCategories([]);
            imageCategories = [];
            categories.forEach((category) => {
                annotations.forEach((anno) => {
                    if (category.id === anno.category_id) {
                        // console.log(category);
                        imageCategories.push(category);
                        let color = category.color;
                        let Info = { x: anno.bbox[0], y: anno.bbox[1], h: anno.bbox[3] , w: anno.bbox[2] };
                        let Style = { borderColor: color, borderWidth: 4 };
                        drawRect(Info, Style);
                    }
                });
            })
            console.log(tempSelectedCat, selectedCategories);
            setImageCategories(imageCategories);
            displayImageCategories(imageCategories, categories, tempSelectedCat, onDropdownSelected, onSelectAll);
        }


    },[isLoaded]);

    // draw rectangle
    const drawRect = (info, style = {}) => {
        const { x, y, w, h } = info;
        const { borderColor = 'black', borderWidth = 3 } = style;

        ctx = canvas.current.getContext("2d");

        ctx.beginPath();
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = borderWidth;
        ctx.rect(x, y, w, h);
        ctx.stroke();
    }

    let onDropdownSelected = (e) => {
        e.preventDefault();
        e.target.setAttribute('checked','');
        setSelectedCategories([]);
        e.target.setAttribute('selected', 'selected');
        let values = Array.prototype.slice.call(document.querySelectorAll('#catt input:checked'),0).map(function(v,i,a) {
            // v.setAttribute('style', 'background-color: white');
            v.setAttribute('selected', 'selected');
            // console.log(v.id);
            return v.id;
        });
        setSelectedCategories(values);
        setTempSelectedCat(values);
    }

    let onSelectAll = (e) => {
        e.preventDefault();
        setSelectedCategories([]);
        setTempSelectedCat([]);
    }

    useEffect(()=>{
        imageObj1.src = urll;
        imageObj1.onload = function() {
            ctx = canvas.current.getContext("2d");
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.beginPath();
            ctx.drawImage(imageObj1, 0, 0);
            setIsLoaded(true);
        }
        setIsLoaded(false);

    },[selectedCategories])


    return(
        <div className="App">
            <div className="wrapper">
                <div className="Categories">
                    <label htmlFor="lang">Categories</label>
                    <br/>
                    <Form id="catt" className="mb-3" style={{border: 'solid'}}>
                        <div id="catt" className="mb-3" />
                    </Form>
                    <br/>
                </div>
            </div>
        </div>
    );
}

function displayImageCategories(imageCategories, categories, selectedCategories, onDropdownSelected, onSelectAll){
    let test = [...new Set(imageCategories)];
    // console.log("Displaying the categories of the image!", test);
    // console.log("Selected categories, ", selectedCategories);

    let selectEl = document.querySelector('#catt');

    // clear the options of the categories when changing the image
    while (selectEl.firstChild) {
        selectEl.removeChild(selectEl.firstChild);
    }

    // Create div parent that contains label and input
    let div = document.createElement('div');
    div.setAttribute('style', 'border: solid');

    // Create label element that shows the letter
    let label = document.createElement('button');
    label.setAttribute('for', 'selectAll');
    label.setAttribute('value', 0);
    label.setAttribute('style','background: white;')
    label.innerText = "Show All";
    label.onclick = onSelectAll;

    div.appendChild(label);
    selectEl.appendChild(div);

    categories.forEach((cat)=>{
        // Select the div to append the categories
        let selectEll = document.querySelector('#catt')

        // Create div parent that contains label and input
        let div = document.createElement('div');

        // Create label element that shows the letter
        let label = document.createElement('label');
        label.setAttribute('for', cat.id);
        label.setAttribute('style','margin-left: 5px; margin-bottom: 0px;');
        label.innerText = cat.name.toUpperCase();
        if(cat.color=='black' || cat.color=='blue'){
            label.setAttribute('style','color: white; margin-left: 5px;');
        }

        // Create input element that accepts interactions
        let optionn = document.createElement('input');
        optionn.setAttribute('class','');
        optionn.onchange = onDropdownSelected;
        optionn.setAttribute('type', 'checkbox');
        optionn.setAttribute('id', cat.id);
        optionn.setAttribute('label', cat.name);
        optionn.innerText = cat.name;

        let isCatPresent = false;
        test.forEach((imgcat)=>{
            if(imgcat.name==cat.name){
                // console.log(imgcat.name, cat.name)
                div.setAttribute('style', 'border: solid '+cat.color+'; background-color: '+cat.color);
                isCatPresent=true
            }
        })
        if(isCatPresent==false){ //if a category is not part of the image, just gray it out
            // console.log(cat, " not part")
            div.setAttribute('style', 'border: solid black; background-color: black');
            label.setAttribute('style','color: white; margin-left: 5px;');
            optionn.setAttribute('disabled','');
        }



        // If category has been selected before, then make the category selected again on the next image
        selectedCategories.forEach((item)=>{
            if(item==cat.id.toString()){
                console.log("matched category!");
                optionn.setAttribute('checked','');
                optionn.setAttribute('selected', 'selected');
            }
        })

        div.appendChild(optionn);
        div.appendChild(label);
        selectEll.appendChild(div);
    });
}

function assignColorToCategory(categories, colors){
    // categories.forEach((category) => {
    //     let value = category.name;
    //     let hex = value.charCodeAt(0).toString(16);
    //     if(hex.length===3){
    //         hex = hex+'a';
    //     }
    //     else if(hex.length===2){
    //         hex = hex+'aa';
    //     }
    //     console.log('F1'+hex);
    //     category.color = '#'+hex+'13';  //generateRandomColor();
    //     //category.color = generateRandomColor();
    // })
    // return categories;

    for(let i = 0; i < categories.length; i++) {
        categories[i].color = colors[i%140]; // %140 because there are 140 available colors
    }
    console.log(categories);
    return categories;
}

function Borders(info, style = {}) {
    const { x, y, w, h } = info;
    const { borderColor = 'black', borderWidth = 1 } = style;

    const canvas = useRef();
    const canvasEle = canvas.current;
    let ctx = canvasEle.getContext("2d");
    ctx.beginPath();
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = borderWidth;
    ctx.rect(x, y, w, h);
    ctx.stroke();
}

function generateRandomColor(){
    let maxVal = 0xFFFFFF; // 16777215
    let randomNumber = Math.random() * maxVal;
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);
    return `#${randColor.toUpperCase()}`
}

export default CanvasCreator;