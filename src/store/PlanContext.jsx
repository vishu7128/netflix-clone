import { createContext, useReducer } from "react";

// Initial state for the context
const defaultContext = {
  // Initial selected value
  selected: "basic", 
  setPlan: () => {},
  removePlan: () => {},
};

// Create the context
export const PlanContext = createContext(defaultContext);

// Reducer function to handle state changes
function planReducer(state, action) {
  switch (action.type) {
    case "set_plan":
      return { ...state, selected: action.payload }; // Update selected value
    case "remove_plan":
      return { ...state, selected: null }; // Clear selected value
    default:
      return state;
  }
}

// Context provider component
// eslint-disable-next-line react/prop-types
export function PlanContextProvider({ children }) {
  const [planState, planDispatch] = useReducer(planReducer, {selected:'basic'});

  // Dispatch function to set plan
  function setPlan(planId) {
    planDispatch({ type: "set_plan", payload: planId });
  }

  // Dispatch function to remove plan
  function removePlan() {
    planDispatch({ type: "remove_plan" });
  }

  // Context value to provide
  const PlanCtxValue = {
    selected: planState.selected,
    setPlan,
    removePlan
  };

  return (
    <PlanContext.Provider value={PlanCtxValue}>{children}</PlanContext.Provider>
  );
}
