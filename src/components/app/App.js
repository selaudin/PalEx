import * as React from 'react';
import './App.css';
import Notfound from "../NotFound";
import Index from "../pages/viewer";
// import cocoFile from '../../coco-homer32-3-new.json';
// import cocoFile from '../../coco.json';
import {useEffect, useState} from "react";
import {BrowserRouter, BrowserRouter as Router, Route, useParams} from 'react-router-dom';
import CanvasCreator from "../pages/viewer/CanvasCreator";

function App() {
    const [curURL, setCurURL] = React.useState(null);
    const [width, setWidth] = React.useState(null);
    const [height, setHeight] = React.useState(null);
    const [annotations, setAnnotations] = React.useState([]);
    const [categories, setCategories] = React.useState([]);
    const [file, setFile] = useState(null);
    const [currentFile, setCurrentFile] = useState('');

    useEffect(() => {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setCurrentFile(JSON.parse(e.target.result));
                CanvasCreator.setKey(prevKey => prevKey + 1);
            }
            reader.readAsText(file);
        }
    }, [file]); // Add currentFile as a dependency


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

    const handleFileChange = (e) => {
        if (e.target.files) {
            setCurrentFile('');
            setFile(e.target.files[0]);
        }
    };

    return (
        <div>
            <section id="mainContent">
                <h1 style={{textAlign: 'center'}}>PalEx</h1>
                <div style={{fontFamily: 'Verdana', padding: '20px 20px 0 20px', marginTop: '1%', marginBottom: '2%'}}>
                    <div style={{height: '100%'}}>
                        <BrowserRouter>
                            <Route
                                exact
                                path="/coco"
                                render={(props) => (
                                    <div>
                                        <div>
                                            <input id="file" type="file" onChange={handleFileChange}/>
                                        </div>
                                        <br/>
                                        {currentFile && <Index
                                            {...props} // Pass down route props
                                            file={currentFile}
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
                                        />}
                                    </div>
                                )}
                            />
                        </BrowserRouter>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default App;
