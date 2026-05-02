import List "mo:core/List";
import StatsTypes "../types/stats";
import TaskTypes "../types/task";
import GoalTypes "../types/goal";
import FocusTypes "../types/focus";
import CommonTypes "../types/common";
import Principal "mo:core/Principal";

module {
  public type Stats = StatsTypes.Stats;
  public type UserId = CommonTypes.UserId;

  public func computeStats(
    tasks : List.List<TaskTypes.Task>,
    goals : List.List<GoalTypes.Goal>,
    sessions : List.List<FocusTypes.FocusSession>,
    userId : UserId,
    now : CommonTypes.Timestamp
  ) : Stats {
    let oneDayNs : Int = 86_400_000_000_000;
    let dayStart : Int = now - (now % oneDayNs);
    let tasksToday = tasks.filter(func(t) {
      Principal.equal(t.userId, userId) and t.isCompleted and t.createdAt >= dayStart
    }).size();
    let focusMins = sessions.filter(func(s) { Principal.equal(s.userId, userId) }).foldLeft(0, func(acc, s) { acc + s.duration });
    let streak = computeStreak(tasks, userId, now);
    let summary = goals.filter(func(g) { Principal.equal(g.userId, userId) }).map<GoalTypes.Goal, StatsTypes.GoalProgressSummary>(func(g) {
      { goalId = g.id; title = g.title; progressPercent = g.progressPercent };
    }).toArray();
    {
      tasksCompletedToday = tasksToday;
      totalFocusTime = focusMins;
      currentStreak = streak;
      goalProgressSummary = summary;
    };
  };

  public func computeStreak(
    tasks : List.List<TaskTypes.Task>,
    userId : UserId,
    now : CommonTypes.Timestamp
  ) : Nat {
    let oneDayNs : Int = 86_400_000_000_000;
    var streak : Nat = 0;
    var dayStart : Int = now - (now % oneDayNs);
    var continueLoop = true;
    label streakLoop while (continueLoop) {
      let hasCompletedInDay = tasks.any(func(t) {
        Principal.equal(t.userId, userId) and t.isCompleted and t.createdAt >= dayStart and t.createdAt < dayStart + oneDayNs
      });
      if (hasCompletedInDay) {
        streak += 1;
        dayStart := dayStart - oneDayNs;
      } else {
        continueLoop := false;
      };
    };
    streak;
  };
};
