import React, { useReducer } from 'react';

export default (reducer, actions, defaultValue) => {
    const Context = React.createContext();

    const Provider = ({ children }) => {
        const [state, dispatch] = useReducer(reducer, defaultValue);

        // boundActions are going to be the functions that we use to somehow change the state
        const boundActions = {};
        for (let key in actions) {
            boundActions[key] = actions[key](dispatch);
        }

        return (
            // value prop is the actual information that gets shared with all of the child components!
            <Context.Provider value={{ state, ...boundActions }}>
                {children}
            </Context.Provider>
        );
    };

    // Provider is our component that's going to make our data available to everything else inside of our application
    // Context is the Context object that we're going to use to get access to that information from one of our child components
    return { Context, Provider };
}; 