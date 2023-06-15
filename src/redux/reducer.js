//Import of actions


//Global states
const initialState = {
    wine:[],
    liquor: [],
    allDrink: [],

}

//Reducer function
export default function reducer(state = initialState, { type, payload }) {
    switch (type) {
        default:
            return {
                ...state
            }
    }
}