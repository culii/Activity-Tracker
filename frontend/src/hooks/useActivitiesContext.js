import { ActivitiesContext } from "../context/ActivityContext";
import { useContext } from "react";

export const useActivitiesContext = () => {
  const context = useContext(ActivitiesContext);

  if (!context) {
    throw Error(
      "useWorkoutContext must be used inside an ActivitiesContextProvider"
    );
  }

  return context;
};
