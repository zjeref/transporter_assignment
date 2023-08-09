import React from "react";
import { createContext } from "react";

export const GlobalState = createContext();

export const initialState = {
    activeModal:"",
    loggedIn : false,
    loggedUser : {},
}

export const reducer = (state, action) => {
    switch (action.type) {
        case "FIRE_MODAL": {
            return {
                ...state,
                activeModal: action.payload
            }
        }
        case "IS_LOGGED": {
            return {
                ...state,
                loggedIn: action.payload
            }
        }
        case "SET_USER": {
            return {
                ...state,
                loggedUser: action.payload
            }
        }
        case "CURRENT_CHAT":{
            return {
                ...state,
                currentChat: action.payload
            }
        }
        default: {
            return state
        }
    }
}
