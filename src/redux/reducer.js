//Import of actions


//Global states
const initialState = {
    vinos: []
}

//Reducer function
export default function reducer(state = initialState, {type,payload}) {
    switch (type) {
        default:
            return {
                ...state
            }
    }
}