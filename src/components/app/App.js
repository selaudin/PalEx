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

    useEffect(() => {
        const fetchFile = async (id) => {
            try {
                const response = await fetch(`../${id}.json`);
                console.log(response);
                const fileData = await response.json();
                setCurrentFile(fileData);
            } catch (error) {
                console.error('Error fetching file:', error);
            }
        };

        // Get the filename parameter from the URL
        const { pathname } = window.location;
        const filename = pathname.split('/').pop(); // Get the last part of the URL path
        if (filename) {
            fetchFile(filename);
        }
    }, []); // Run once on component mount


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
                <div style={{fontFamily: 'Verdana', padding: '20px 20px 0 20px', marginTop: '1%', marginBottom: '2%'}}>
                    <div style={{height: '100%'}}>
                        <BrowserRouter>
                            <Route
                                exact
                                path="/"
                                render={(props) => (
                                    <div>
                                        <h1 style={{ textAlign: "center", marginTop: "20%" }}>
                                            Welcome to PalEx
                                        </h1>
                                        <div>
                                            <p>
                                                PalEx is a web-based platform for visualizing annotated images. It is
                                                designed to be user-friendly and easy to use. It is also designed to be
                                                flexible and customizable, allowing users to filter and analyze annotations.
                                            </p>
                                            <p>
                                                To get started, simply upload a COCO JSON file with annotations.
                                            </p>
                                            <p>
                                                <a href="/palex">Go to PalEx</a>
                                            </p>
                                        </div>
                                    </div>
                                )}
                            />
                            <Route
                                exact={true}
                                path="/palex"
                                render={(props) => {
                                    return (
                                    <div>
                                        <h1 style={{textAlign: 'center'}}>PalEx</h1>
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
                                )}}
                            />
                            <Route
                                path="/palex/:filePathURLParam"
                                render={(props) => {
                                    const { filePathURLParam } = props.match.params; // Access the id parameter from the URL
                                    // console.log(filePathURLParam);
                                    return (
                                        <div>
                                            <h1 style={{textAlign: 'center'}}>PalEx</h1>
                                            <div>
                                                <input id="file" type="file" onChange={handleFileChange}/>
                                            </div>
                                            <br/>
                                            {currentFile && <Index
                                                {...props} // Pass down route props
                                                fileNameURLParam={filePathURLParam}
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
                                    )}}
                            />
                        </BrowserRouter>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default App;
