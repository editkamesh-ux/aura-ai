import List "mo:core/List";
import GoalTypes "../types/goal";
import Principal "mo:core/Principal";

module {
  public type Goal = GoalTypes.Goal;
  public type GoalPublic = GoalTypes.GoalPublic;
  public type CreateGoalInput = GoalTypes.CreateGoalInput;
  public type UpdateGoalInput = GoalTypes.UpdateGoalInput;
  public type UserId = GoalTypes.UserId;
  public type ItemId = GoalTypes.ItemId;

  public func listGoals(
    goals : List.List<Goal>,
    userId : UserId
  ) : [GoalPublic] {
    goals.filter(func(g) { Principal.equal(g.userId, userId) }).map<Goal, GoalPublic>(func(g) { toPublic(g) }).toArray();
  };

  public func createGoal(
    goals : List.List<Goal>,
    nextId : Nat,
    userId : UserId,
    input : CreateGoalInput
  ) : GoalPublic {
    let goal : Goal = {
      id = nextId;
      userId;
      var title = input.title;
      var category = input.category;
      var targetDate = input.targetDate;
      var progressPercent = 0;
      var linkedTaskIds = [];
    };
    goals.add(goal);
    toPublic(goal);
  };

  public func updateGoal(
    goals : List.List<Goal>,
    userId : UserId,
    input : UpdateGoalInput
  ) : ?GoalPublic {
    switch (goals.find(func(g) { g.id == input.id and Principal.equal(g.userId, userId) })) {
      case (?goal) {
        goal.title := input.title;
        goal.category := input.category;
        goal.targetDate := input.targetDate;
        goal.progressPercent := input.progressPercent;
        goal.linkedTaskIds := input.linkedTaskIds;
        ?toPublic(goal);
      };
      case null { null };
    };
  };

  public func deleteGoal(
    goals : List.List<Goal>,
    userId : UserId,
    id : ItemId
  ) : Bool {
    let sizeBefore = goals.size();
    let filtered = goals.filter(func(g) { not (g.id == id and Principal.equal(g.userId, userId)) });
    let sizeAfter = filtered.size();
    if (sizeAfter < sizeBefore) {
      goals.clear();
      goals.append(filtered);
      true;
    } else { false };
  };

  public func toPublic(goal : Goal) : GoalPublic {
    {
      id = goal.id;
      title = goal.title;
      category = goal.category;
      targetDate = goal.targetDate;
      progressPercent = goal.progressPercent;
      linkedTaskIds = goal.linkedTaskIds;
    };
  };
};
