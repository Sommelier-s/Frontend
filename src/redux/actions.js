import axios from 'axios';


export const GENERATED_USER_ID = "GENERATED_USER_ID";

export const GET_ALL_WINE = "GET_ALL_WINE";
export const GET_ALL_LIQUOR = "GET_ALL_LIQUOR";

export const GET_ALL_CATEGORY_WINE = "GET_ALL_CATEGORY_WINE";
export const GET_ALL_CATEGORY_LIQUOR = "GET_ALL_CATEGORY_LIQUOR";

export const ALL_DRINKS = "ALL_DRINKS";
export const GENERATED_COPY_ALL_DRINKS = "GENERATED_COPY_ALL_DRINKS";

export const FILTER_SEARCH_BY_NAME = "FILTER_SEARCH_BY_NAME";
export const FILTER_CATEGORY_WINE = "FILTER_CATEGORY_WINE";
export const FILTER_CATEGORY_LIQUOR = "FILTER_CATEGORY_LIQUOR";

export const FILTER_ORDER = "FILTER_ORDER";
export const FILTER_PRICE = "FILTER_PRICE";


//Variable con la url base
const desarrolloApp = "http://localhost:3001";
let wineLocal = [];
let liquorLocal = [];

const userId = window.localStorage.getItem("userId");
const userIdParseado = JSON.parse(userId);


export const generatedUserId = () => {
    return { type: GENERATED_USER_ID };
}

export const getAllWine = () => {
    return async function (dispatch) {

        const response = await axios.get(`${desarrolloApp}/wine`)
        wineLocal = response.data.data;
        dispatch({ type: GET_ALL_WINE, payload: response.data.data })
    }


}



export const getAllLiquor = () => {
    return async function (dispatch) {
        const response = await axios.get(`${desarrolloApp}/liquor`)
        liquorLocal = response.data.data;
        dispatch({ type: GET_ALL_LIQUOR, payload: response.data.data })
    }
        ;
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
        const response = await axios.get(`${desarrolloApp}/category_wine`)

        dispatch({ type: GET_ALL_CATEGORY_WINE, payload: response.data.data })
    }
}

export const getAllCategoryLiquor = () => {
    return async function (dispatch) {
        const response = await axios.get(`${desarrolloApp}/category_liquor`)

        dispatch({ type: GET_ALL_CATEGORY_LIQUOR, payload: response.data.data })
    }
}


export const filterSearchByName = (name) => {
    return async function (dispatch) {
        const search = await axios.get(`${desarrolloApp}/both_drinks/name?name=${name}`);
        dispatch({ type: FILTER_SEARCH_BY_NAME, payload: search.data.data })
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


