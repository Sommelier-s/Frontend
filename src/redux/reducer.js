//Import of actions
import {

    GET_ALL_WINE,
    GET_ALL_LIQUOR,
    GET_ALL_CATEGORY_WINE,
    GET_ALL_CATEGORY_LIQUOR,
    ALL_DRINKS,
    GENERATED_COPY_ALL_DRINKS,
    FILTER_SEARCH_BY_NAME,
    FILTER_CATEGORY_WINE,
    FILTER_CATEGORY_LIQUOR,
    FILTER_ORDER,
    FILTER_PRICE,
    GENERATED_USER_ID,

} from "./actions";

//Global states
const initialState = {
    wine: [],
    liquor: [],
    allDrinks: [],
    copyAllDrinks: [],
    categoryWine: [],
    categoryLiquor: [],
    userId: "309602f1-2195-4986-b90a-b37dc4043526",

}

const setLocalStorage = (id) => {
    try {
        window.localStorage.setItem("userId", JSON.stringify(id));
    } catch (error) {
        console.log(error.message)
    }
}

//Reducer function
export default function reducer(state = initialState, { type, payload }) {
    switch (type) {
        //Guarda toda la informacion en el atributo wine del estado global
        case GENERATED_USER_ID:
            setLocalStorage(state.userId);
            return {
                ...state
            }
        case GET_ALL_WINE:
            return {
                ...state,
                wine: payload
            }
        //Guarda toda la informacion en el atributo liquor del estado global
        case GET_ALL_LIQUOR:
            return {
                ...state,
                liquor: payload
            }
        case ALL_DRINKS:
            return {
                ...state,
                allDrinks: payload
            }
        //Crea una copia del atributo allDrinks en copyAllDrinks
        case GENERATED_COPY_ALL_DRINKS:
            return {
                ...state,
                copyAllDrinks: state.allDrinks
            }

        //Guarda todos las categorias de los vinos traidos en el atributo categoryWine del estado global
        case GET_ALL_CATEGORY_WINE:
            return {
                ...state,
                categoryWine: payload
            }
        //Guarda todos las categorias de los licores traidos en el atributo categoryLiquor del estado global
        case GET_ALL_CATEGORY_LIQUOR:
            return {
                ...state,
                categoryLiquor: payload
            }

        //Retorna las razas que se encontraron con ese nombre
        case FILTER_SEARCH_BY_NAME:
            return {
                ...state,
                copyAllDrinks: payload
            }

        //Retorna las vinos que cumplen con requisito de la categoria
        case FILTER_CATEGORY_WINE:
            if (payload !== "Default") {
                return {
                    ...state,
                    copyAllDrinks: state.copyAllDrinks.filter((drink) => drink?.Wine_categoryId === payload)
                }
            } else {
                return {
                    ...state,
                    copyAllDrinks: state.allDrinks
                }
            }
        //Retorna las licores que cumplen con requisito de la categoria
        case FILTER_CATEGORY_LIQUOR:
            if (payload !== "Default") {
                return {
                    ...state,
                    copyAllDrinks: state.allDrinks.filter((drink) => state.allDrinks.category?.includes(payload))
                }
            } else {
                return {
                    ...state,
                    copyAllDrinks: state.allDrinks
                }
            }


        //Retorna la informacion ordenada alfabeticamente, dependiendo del tipo de ordenamiento
        case FILTER_ORDER:
            switch (payload) {
                case "ascendente":
                    return {
                        ...state,
                        copyAllDrinks: [
                            ...state.copyAllDrinks.sort(function (a, b) {
                                return a.name.localeCompare(b.name)
                            }),
                        ]
                    }
                case "descendente":
                    return {
                        ...state,
                        copyAllDrinks: [
                            ...state.copyAllDrinks.sort(function (a, b) {
                                return b.name.localeCompare(a.name)
                            }),
                        ]
                    }
                default:
                    return {
                        ...state,
                        copyAllDrinks: state.copyAllDrinks
                    }

            }

        //Retorna la informacion ordenada por peso, dependiendo del tipo de ordenamiento
        case FILTER_PRICE:

            switch (payload) {
                case "ascendente":
                    return {
                        ...state,
                        copyAllDrinks: [
                            ...state.copyAllDrinks.sort((a, b) => a.price - b.price)
                        ]
                    }
                case "descendente":
                    return {
                        ...state,
                        copyAllDrinks: [
                            ...state.copyAllDrinks.sort((a, b) => b.price - a.price)
                        ]
                    }
                default:
                    return {
                        ...state,
                        copyAllDrinks: state.copyAllDrinks
                    }
            }
        default:
            return {
                ...state
            }
    }
}