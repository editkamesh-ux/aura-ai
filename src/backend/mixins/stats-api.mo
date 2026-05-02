import List "mo:core/List";
import StatsTypes "../types/stats";
import TaskTypes "../types/task";
import GoalTypes "../types/goal";
import FocusTypes "../types/focus";
import Time "mo:core/Time";
import StatsLib "../lib/stats";

mixin (
  tasks : List.List<TaskTypes.Task>,
  goals : List.List<GoalTypes.Goal>,
  focusSessions : List.List<FocusTypes.FocusSession>
) {
  public shared query ({ caller }) func getMyStats() : async StatsTypes.Stats {
    StatsLib.computeStats(tasks, goals, focusSessions, caller, Time.now());
  };
};
