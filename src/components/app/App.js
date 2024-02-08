import * as React from 'react';
import './App.css';
import Notfound from "../NotFound";
import Index from "../pages/viewer";
import cocoFile from '../../coco-homer32-localcode3-new.json';

function App() {
    const [curURL, setCurURL] = React.useState(null);
    const [width, setWidth] = React.useState(null);
    const [height, setHeight] = React.useState(null);
    const [annotations, setAnnotations] = React.useState([]);
    const [categories, setCategories] = React.useState([]);

    // Update variables
    const OnUrlChange = (newUrl) => {
        setCurURL(newUrl);
    }

    const changeWidth = (newWidth) => {
        setWidth(newWidth);
    }

    const changeHeight = (newHeight) => {
        setHeight(newHeight);
    }

    const changeAnnotations = (newAnnotations) => {
        setAnnotations(newAnnotations);
    }

    const changeCategories = (newCategories) => {
        setCategories(newCategories);
    }

    // Get variables
    const getURL = () => {
        return curURL;
    }

    const getWidth = () => {
        return width;
    }

    const getHeight = () => {
        return height;
    }

    const getAnnotations = () => {
        return annotations;
    }

    const getCategories = () => {
        return categories;
    }

    return (
        <div>
            <section id="mainContent">
                <div style={{ fontFamily:'Verdana', padding: '20px 20px 0 20px', marginTop: '1%' , marginBottom: '2%'}}>
                    <div style={{height: '100%'}}>
                    <Index
                        file={cocoFile}
                        getURL={getURL}
                        getHeight={getHeight}
                        getWidth={getWidth}
                        getAnnotations={getAnnotations}
                        getCategories={getCategories}
                        OnUrlChange={OnUrlChange}
                        changeWidth={changeWidth}
                        changeHeight={changeHeight}
                        changeAnnotations={changeAnnotations}
                        changeCategories={changeCategories}
                    />
                    </div>
                </div>
            </section>
        </div>
    );
}

export default App;
