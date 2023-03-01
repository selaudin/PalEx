import React, {createContext} from 'react';

const ImageContext = createContext({
    state: false,
    image: '',
    images: [],
    totalAmount: 0,
    addItem: (item) => {},
    removeItem: (id) => {},
});

export default ImageContext;