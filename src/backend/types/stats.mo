module {
  public type GoalProgressSummary = {
    goalId : Nat;
    title : Text;
    progressPercent : Nat;
  };

  public type Stats = {
    tasksCompletedToday : Nat;
    totalFocusTime : Nat;
    currentStreak : Nat;
    goalProgressSummary : [GoalProgressSummary];
  };
};
