//Import of actions
import {

    GET_ALL_WINE,
    GET_ALL_LIQUOR,
    GET_ALL_WINE_ACTIVE,
    GET_ALL_LIQUOR_ACTIVE,
    GET_ALL_CATEGORY_WINE,
    GET_ALL_CATEGORY_LIQUOR,
    GET_ALL_USERS,
    ALL_DRINKS,
    GENERATED_COPY_ALL_DRINKS,
    ALL_DRINKS_ACTIVE,
    GENERATED_COPY_ALL_DRINKS_ACTIVE,
    FILTER_SEARCH_BY_NAME,
    FILTER_CATEGORY_WINE,
    FILTER_CATEGORY_LIQUOR,
    FILTER_ORDER,
    FILTER_PRICE,
    GENERATED_USER_ID,
    ADD_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_QUANTITY,
    UPDATE_CART_EMPTY_STATUS,
    UPDATE_CART_FROM_LOCAL_STORAGE,
    UPDATE_AMOUNT,
    SAVE_PRODUCT,
    SAVE_USER,
    LOG_OUT_USER,
    GET_OFFER

} from "./actions";

//Global states
const initialState = {
    wine: [],
    liquor: [],
    allDrinks: [],
    copyAllDrinks: [],
    wineActive: [],
    liquorActive: [],
    allDrinksActive: [],
    copyAllDrinksActive: [],
    categoryWine: [],
    categoryLiquor: [],
    cart: [],
    offer: [],
    amount: 0,
    isCartEmpty: true,
    user: {},
    selectedProductMonth: [],
}

const setLocalStorage = (user) => {
    try {
        window.localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
        console.log(error.message)
    }
}

const setLocalStorageAmount = (amount) => {
    try {
        window.localStorage.setItem("amount", JSON.stringify(amount));
    } catch (error) {
        console.log(error.message)
    }
}

const setLocalStorageCart = (cart) => {
    try {
        window.localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
        console.log(error.message)
    }
}

//Reducer function
export default function reducer(state = initialState, { type, payload }) {
    switch (type) {
        //Guarda toda la informacion en el atributo wine del estado global
        case GET_OFFER:
            return {
                ...state,
                offer: payload
            }
        case SAVE_USER:
            setLocalStorage(payload);
            return {
                ...state,
                user: payload
            }
        case LOG_OUT_USER:
            setLocalStorage({});
            return {
                ...state,
                user: {}
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

        case GET_ALL_WINE_ACTIVE:
            return {
                ...state,
                wineActive: payload
            }
        //Guarda toda la informacion en el atributo liquor del estado global
        case GET_ALL_LIQUOR_ACTIVE:
            return {
                ...state,
                liquorActive: payload
            }
        //Guarda toda la informacion en el atributo users del estado global
        case GET_ALL_USERS:
            return {
                ...state,
                users: payload
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
        case ALL_DRINKS_ACTIVE:
            return {
                ...state,
                allDrinksActive: payload
            }
        //Crea una copia del atributo allDrinks en copyAllDrinks
        case GENERATED_COPY_ALL_DRINKS_ACTIVE:
            return {
                ...state,
                copyAllDrinksActive: state.allDrinksActive
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
                copyAllDrinksActive: payload
            }

        //Retorna las vinos que cumplen con requisito de la categoria
        case FILTER_CATEGORY_WINE:
            if (payload !== "Default") {
                return {
                    ...state,
                    copyAllDrinksActive: state.allDrinksActive.filter((drink) => drink?.Wine_categoryId === payload)
                }
            } else {
                return {
                    ...state,
                    copyAllDrinksActive: state.allDrinksActive
                }
            }
        //Retorna las licores que cumplen con requisito de la categoria
        case FILTER_CATEGORY_LIQUOR:
            if (payload !== "Default") {
                return {
                    ...state,
                    copyAllDrinksActive: state.allDrinksActive.filter((drink) => drink?.Liquor_categoryId === payload)
                }
            } else {
                return {
                    ...state,
                    copyAllDrinksActive: state.allDrinksActive
                }
            }


        //Retorna la informacion ordenada alfabeticamente, dependiendo del tipo de ordenamiento
        case FILTER_ORDER:
            switch (payload) {
                case "ascendente":
                    return {
                        ...state,
                        copyAllDrinksActive: [
                            ...state.copyAllDrinksActive.sort(function (a, b) {
                                return a.name.localeCompare(b.name)
                            }),
                        ]
                    }
                case "descendente":
                    return {
                        ...state,
                        copyAllDrinksActive: [
                            ...state.copyAllDrinksActive.sort(function (a, b) {
                                return b.name.localeCompare(a.name)
                            }),
                        ]
                    }
                default:
                    return {
                        ...state,
                        copyAllDrinksActive: state.copyAllDrinksActive
                    }

            }

        //Retorna la informacion ordenada por peso, dependiendo del tipo de ordenamiento
        case FILTER_PRICE:

            switch (payload) {
                case "ascendente":
                    return {
                        ...state,
                        copyAllDrinksActive: [
                            ...state.copyAllDrinksActive.sort((a, b) => a.price - b.price)
                        ]
                    }
                case "descendente":
                    return {
                        ...state,
                        copyAllDrinksActive: [
                            ...state.copyAllDrinksActive.sort((a, b) => b.price - a.price)
                        ]
                    }
                default:
                    return {
                        ...state,
                        copyAllDrinksActive: state.copyAllDrinksActive
                    }
            }

        //Agrega un producto al carro de compras
        case ADD_TO_CART:
            const existingProduct = state.cart.find((product) => product.id === payload.id);
            if (existingProduct) {
                const updatedCart = state.cart.map((product) => {
                    if (product.id === payload.id) {
                        return {
                            ...product, quantity: product.quantity + 1,
                        };
                    }
                    return product;
                });
                setLocalStorageCart(updatedCart)
                return {
                    ...state,
                    cart: updatedCart,
                };
            } else {
                setLocalStorageCart([...state.cart, { ...payload, quantity: 1 }])
                return {
                    ...state,
                    cart: [...state.cart, { ...payload, quantity: 1 }],
                };
            }
        case UPDATE_AMOUNT:
            setLocalStorageAmount(payload);
            return {
                ...state,
                amount: payload
            }
        case REMOVE_FROM_CART:
            const cartRemove = state.cart.filter((product) => product.id !== payload)
            setLocalStorageCart(cartRemove);
            return {
                ...state,
                cart: cartRemove
            };
        case UPDATE_QUANTITY:
            const { productId, quantity } = payload;
            const updatedCart = state.cart.map((product) => {
                if (product.id === productId) {
                    return {
                        ...product,
                        quantity,
                    };
                }
                return product;
            });
            setLocalStorageCart(updatedCart);
            return {
                ...state,
                cart: updatedCart,
            };
        case UPDATE_CART_EMPTY_STATUS:
            return {
                ...state,
                isCartEmpty: payload,
            };
        case UPDATE_CART_FROM_LOCAL_STORAGE:
            return {
                ...state,
                cart: payload,
            };

        //Producto del mes
        case SAVE_PRODUCT:

            return {
                ...state,
                selectedProductMonth: payload,
            };


        default:
            return {
                ...state
            }
    }
}