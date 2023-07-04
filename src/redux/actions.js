import axios from 'axios';

export const GENERATED_USER_ID = "GENERATED_USER_ID";

export const GET_ALL_WINE = "GET_ALL_WINE";
export const GET_ALL_LIQUOR = "GET_ALL_LIQUOR";
export const GET_ALL_USERS = "GET_ALL_USERS";

export const GET_ALL_CATEGORY_WINE = "GET_ALL_CATEGORY_WINE";
export const GET_ALL_CATEGORY_LIQUOR = "GET_ALL_CATEGORY_LIQUOR";

export const ALL_DRINKS = "ALL_DRINKS";
export const GENERATED_COPY_ALL_DRINKS = "GENERATED_COPY_ALL_DRINKS";

export const FILTER_SEARCH_BY_NAME = "FILTER_SEARCH_BY_NAME";
export const FILTER_CATEGORY_WINE = "FILTER_CATEGORY_WINE";
export const FILTER_CATEGORY_LIQUOR = "FILTER_CATEGORY_LIQUOR";

export const FILTER_ORDER = "FILTER_ORDER";
export const FILTER_PRICE = "FILTER_PRICE";

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const UPDATE_QUANTITY = "UPDATE_QUANTITY";
export const UPDATE_CART_EMPTY_STATUS = "UPDATE_CART_EMPTY_STATUS";
export const UPDATE_CART_FROM_LOCAL_STORAGE = "UPDATE_CART_FROM_LOCAL_STORAGE";
export const UPDATE_AMOUNT = "UPDATE_AMOUNT";

export const SAVE_PRODUCT = "SAVE_PRODUCT";
export const SAVE_USER = "SAVE_USER";
export const LOG_OUT_USER = "LOG_OUT_USER";

export const GET_OFFER = 'GET_OFFER'

//Variable con la url base
const desarrolloApp = "http://localhost:3001";
let wineLocal = [];
let liquorLocal = [];
let userLocal = [];

// const userId = window.localStorage.getItem("userId");
// const userIdParseado = JSON.parse(userId);

export const getOffer = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get('/offer');
            dispatch({ type: GET_OFFER, payload: response.data.data})
        } catch (error) {
            console.log(error.message);
        }
    }
}

export const saveUser = (user) => {
    return { type: SAVE_USER, payload: user };
}

export const logOutUer = () => {
    return { type: LOG_OUT_USER }
}

export const generatedUserId = () => {
    return { type: GENERATED_USER_ID };
}

export const getAllUsers = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`/auth/user`)
            userLocal = response.data.data;
            dispatch({ type: GET_ALL_USERS, payload: response.data.data })
        } catch (error) {
            console.log(error);
            //console.log(`status: ${error.response.data.status} messege: ${error.response.data.error}`)
        }
    }
}

export const getAllWine = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`/wine`)
            wineLocal = response.data.data;
            dispatch({ type: GET_ALL_WINE, payload: response.data.data })
        } catch (error) {
            console.log(error);
            //console.log(`status: ${error.response.data.status} message: ${error.response.data.error}`);
        }
    }
}



export const getAllLiquor = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`/liquor`)
            liquorLocal = response.data.data;
            dispatch({ type: GET_ALL_LIQUOR, payload: response.data.data })
        } catch (error) {
            console.log(error);
            //console.log(`status: ${error.response.data.status} message: ${error.response.data.error}`);
        }
    };

}


export const getAllDrinks = () => {
    const allDrinks = [...wineLocal, ...liquorLocal];
    return { type: ALL_DRINKS, payload: allDrinks };
}



export const generatedCopyAllDrinks = () => {
    return { type: GENERATED_COPY_ALL_DRINKS }
}


export const getAllCategoryWine = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`/category_wine`)
            dispatch({ type: GET_ALL_CATEGORY_WINE, payload: response.data.data })
        } catch (error) {
            console.log(error);
            //console.log(`status: ${error.response.data.status} message: ${error.response.data.error}`);
        }
    }
}

export const getAllCategoryLiquor = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`/category_liquor`)
            dispatch({ type: GET_ALL_CATEGORY_LIQUOR, payload: response.data.data })
        } catch (error) {
            console.log(error);
            //console.log(`status: ${error.response.data.status} message: ${error.response.data.error}`);
        }
    }
}


export const filterSearchByName = (name) => {
    return async function (dispatch) {
        try {
            const search = await axios.get(`/both_drinks/name?name=${name}`);
            dispatch({ type: FILTER_SEARCH_BY_NAME, payload: search.data.data })
        } catch (error) {
            console.log(error);
            //console.log(`status: ${error.response.data.status} message: ${error.response.data.error}`);
        }


    }
}

//Esta action recibe el tipo de categoria de vino a filtrar
export const filterCategoryWine = (category) => {
    return { type: FILTER_CATEGORY_WINE, payload: category }
}

//Esta action recibe el tipo de categoria de licor a filtrar
export const filterCategoryLiquor = (tipo) => {
    return { type: FILTER_CATEGORY_LIQUOR, payload: tipo }
}


//Esta action recibe el tipo orden alfabetico a ordenar
export const filterOrden = (orden) => {
    return { type: FILTER_ORDER, payload: orden };
}

//Esta action recibe el tipo de orden por peso a ordenar
export const filterPrice = (precio) => {
    return { type: FILTER_PRICE, payload: precio };
}

//Actions para el carro de compras
export const addToCart = (product) => {
    return { type: ADD_TO_CART, payload: product };
};

export const removeFromCart = (productId) => {
    return { type: REMOVE_FROM_CART, payload: productId };
}

export const updateQuantity = (productId, quantity) => {
    return { type: UPDATE_QUANTITY, payload: { productId, quantity }, };
}

export const updateCartEmptyStatus = (isEmpty) => {
    return { type: UPDATE_CART_EMPTY_STATUS, payload: isEmpty }
};

export const updateCartFromLocalStorage = (cart) => {
    return { type: UPDATE_CART_FROM_LOCAL_STORAGE, payload: cart };
};

export const updateAmount = (monto) => {
    return { type: UPDATE_AMOUNT, payload: monto };
}

//Action para el producto del mes
export const saveProductMonth = () => {
    return async function (dispatch) {
        try {
            const { data } = await axios.get('/both_drinks/product_month');
            dispatch({ type: SAVE_PRODUCT, payload: data.data})
        } catch (error) {
            console.log(error.message);
        }
    }
};
  