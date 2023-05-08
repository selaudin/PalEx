import React, {useRef, useEffect, useState} from 'react';
import Form from 'react-bootstrap/Form';
import {setScale} from "../../../index";
import MultiLayerCheckbox from "./MultiLayerCheckbox";

function CanvasCreator(props){
    const [isLoaded, setIsLoaded] = useState(false);
    const [isPageLoaded, setIsPageLoaded] = useState(false);
    let [url, setUrl] = useState('');
    var imageObj1 = new Image();
    let [showAnnotations, setShowAnnotations] = useState(true);
    const [buttonText, setButtonText] = useState('Hide All');

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
    let filters = {
        "BaseType": [
            "bt1",
            "bt2",
            "bt3",
            "bt4",
            "bt5",
        ],
        "FootMarkType": [
            "ft1",
            "ft2",
            "ft3",
            "ft4",
            "ft5",
            "ft6",
            "ft7",
            "ft8",
            "ft9"
        ]
    }

    let canvas = props.getCanvas;
    let ctx = null;

    // url = 'https://app.d-scribes.philhist.unibas.ch/' + props.getURL();
    url = 'http://localhost/' + props.getURL();

    let width = props.getWidth()/2;
    let height = props.getHeight()/2;
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
    // console.log("url: ", url);
    // categories = assignColorToCategory(categories);
    // console.log("categories: ", categories);

    // when user changes TM, then reset the selected options
    useEffect(() => {
        let TMselect = document.getElementById('TmSelect');
        // console.log(TMselect);
        TMselect.onchange = () => {
            setTempSelectedCat([]);
            let node = document.querySelector('.can'); // select the canvas
            if(node!=null){ // if canvas exists, then transform the scale back to 1
                node.setAttribute('style','transform: translate3d('+width+', '+height+', 0px) scale(1);');
                console.log('transform: translate3d('+width+', '+height+', 0px) scale(1);');
                setScale(1);
            }
        }
    }, []);

    useEffect(() => {
        // display the canvas
        let tempCanvas = document.getElementById("canvasLayout");
        tempCanvas.style.display = 'block';
        tempCanvas.style.justifyContent = 'space-evenly';

        // change url
        categories = assignColorToCategory(categories, colors);
        setUrl(url);
    }, []);

    useEffect(() => {
        // draw image
        imageObj1.src = url;
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

        setSelectedCategories([]); // clean the selected categories when changing the image
        return () => {console.log("second time disp") };
    }, [url]);


    useEffect(() => {
        if (isLoaded) {
            setIsPageLoaded(true);
        }

        if(selectedCategories[0]==0){
            setSelectedCategories([]);
            console.log(selectedCategories[0]);
        }
        else if(selectedCategories.length!==0){ // if there are selected categories, then render the selected categories
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
            displayImageCategories(imageCategories, categories, tempSelectedCat, onDropdownSelected, onSelectAll, buttonText);
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
            displayImageCategories(imageCategories, categories, tempSelectedCat, onDropdownSelected, onSelectAll, buttonText);
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

        if(showAnnotations==true){
            setShowAnnotations(false);
            setButtonText('Show All')
            setIsLoaded(true);
        }
        else{
            setShowAnnotations(true);
            setButtonText('Hide All');
        }

    }

    useEffect(()=>{
        imageObj1.src = url;
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
                    <Form id="catt" className="mb-2" style={{border: 'solid'}}>
                        <div id="catt" className="mb-2" />
                    </Form>
                    <br/>
                </div>
                <div className="Tags" style={{marginLeft: '5px'}}>
                    <label>Tags</label>
                    <div className="mb-2" style={{border: 'solid'}}>
                        <MultiLayerCheckbox getFilters={filters}/>
                    </div>
                    <br/>
                    <br/>
                </div>
            </div>
        </div>
    );
}

function displayImageCategories(imageCategories, categories, selectedCategories, onDropdownSelected, onSelectAll, buttonText){
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
    label.innerText = buttonText;
    label.onclick = onSelectAll;

    // Create input element that accepts interactions for selecting and deselecting all
    let option = document.createElement('input');
    option.setAttribute('class','');
    option.onchange = onSelectAll;
    option.setAttribute('type', 'checkbox');
    option.innerText = "Hide All";

    // div.appendChild(option);
    div.appendChild(label);
    selectEl.appendChild(div);

    const objectWithNameC = categories.find(cat => cat.name === 'ϲ');

    categories.forEach((cat)=>{
        // Select the div to append the categories
        let selectEll = document.querySelector('#catt')

        // Create div parent that contains label and input
        let div = document.createElement('div');

        // Create label element that shows the letter
        let label = document.createElement('label');
        label.setAttribute('style','margin-left: 5px; margin-bottom: 0px;');

        if(cat.color=='black' || cat.color=='blue' || cat.color=='darkblue'){
            label.setAttribute('style','color: white; margin-left: 5px;');
        }

        // Create input element that accepts interactions
        let optionn = document.createElement('input');
        optionn.setAttribute('class','');
        optionn.onchange = onDropdownSelected;
        optionn.setAttribute('type', 'checkbox');

        if(cat.name=='σ'){
            label.innerText = objectWithNameC.name.toUpperCase();
            label.setAttribute('for', objectWithNameC.id);

            optionn.innerText = objectWithNameC.name;
            optionn.setAttribute('id', objectWithNameC.id);
            optionn.setAttribute('label', objectWithNameC.name);
        }
        else{
            label.setAttribute('for', cat.id);
            label.innerText = cat.name.toUpperCase();

            optionn.innerText = cat.name;
            optionn.setAttribute('id', cat.id);
            optionn.setAttribute('label', cat.name);
        }


        let isCatPresent = false;
        test.forEach((imgcat)=>{
            if(imgcat.name==cat.name){
                div.setAttribute('style', 'border: solid '+cat.color+'; background-color: '+cat.color);
                isCatPresent=true
            }
            else if(cat.name=='σ' && imgcat.name===objectWithNameC.name){
                div.setAttribute('style', 'border: solid '+objectWithNameC.color+'; background-color: '+objectWithNameC.color);
                isCatPresent=true
            }
        })
        if(isCatPresent==false){ //if a category is not part of the image, just black it out
            // console.log(cat, " not part")
            div.setAttribute('style', 'border: solid black; background-color: black');
            label.setAttribute('style','color: white; margin-left: 5px;');
            optionn.setAttribute('disabled','');
            optionn.setAttribute('style', ' -webkit-appearance: none; color: black');
        }


        // If category has been selected before, then make the category selected again on the next image
        selectedCategories.forEach((item)=>{
            if(item==cat.id.toString()){
                console.log("matched category!");
                optionn.setAttribute('checked','');
                optionn.setAttribute('selected', 'selected');
            }
        })

        if(cat.name!='ϲ') { // skip append of object c since we replaced 'σ' with 'ϲ' already
            div.appendChild(optionn);
            div.appendChild(label);
            selectEll.appendChild(div);
        }
    });
}

function assignColorToCategory(categories, colors){
    for(let i = 0; i < categories.length; i++) {
        categories[i].color = colors[i%140]; // %140 because there are 140 available colors
    }
    console.log(categories);
    return categories;
}

export default CanvasCreator;