import { createContext, useReducer } from "react";

// export for use elsewhere
export const ActivitiesContext = createContext();

// dispatch logic
export const activitiesReducer = (state, action) => {
  switch (action.type) {
    // handle templates
    case "SET_ACTIVITIES":
      return {
        ...state,
        activities: action.payload,
      };
    // handle scheduled
    case "SET_SCHEDULED_ACTIVITIES":
      return {
        ...state,
        scheduledActivities: action.payload,
      };
    // handle form submit , seperate state first
    case "TEMPLATE_ADDED":
      return {
        ...state,
        activities: [action.payload.templateActivity, ...state.activities],
      };

    case "SCHEDULED_ACTIVITY_ADDED":
      return {
        ...state,
        scheduledActivities: [
          action.payload.scheduledActivity,
          ...state.scheduledActivities,
        ],
      };
    default:
      return state;
  }
};

// provide context to app component tree
export const ActivitiesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(activitiesReducer, {
    activities: [],
    scheduledActivities: [],
  });
  return (
    <ActivitiesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ActivitiesContext.Provider>
  );
};
