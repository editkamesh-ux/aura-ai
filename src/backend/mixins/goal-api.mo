import List "mo:core/List";
import GoalTypes "../types/goal";
import GoalLib "../lib/goal";

mixin (
  goals : List.List<GoalTypes.Goal>,
  nextGoalId : Nat
) {
  public shared query ({ caller }) func listMyGoals() : async [GoalTypes.GoalPublic] {
    GoalLib.listGoals(goals, caller);
  };

  public shared ({ caller }) func createGoal(
    input : GoalTypes.CreateGoalInput
  ) : async GoalTypes.GoalPublic {
    let id = goals.size();
    GoalLib.createGoal(goals, id, caller, input);
  };

  public shared ({ caller }) func updateGoal(
    input : GoalTypes.UpdateGoalInput
  ) : async ?GoalTypes.GoalPublic {
    GoalLib.updateGoal(goals, caller, input);
  };

  public shared ({ caller }) func deleteGoal(id : Nat) : async Bool {
    GoalLib.deleteGoal(goals, caller, id);
  };
};
