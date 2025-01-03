import { Goal } from "@shared/models/goal.model"

export const isGoalComplete = (activityKM: number, goal: Goal): boolean => {
    return activityKM + goal.total >= goal.km
}