import CommonTypes "common";

module {
  public type UserId = CommonTypes.UserId;
  public type ItemId = CommonTypes.ItemId;

  public type GoalCategory = {
    #health; #career; #finance; #learning; #fitness; #personal; #other;
  };

  public type Goal = {
    id : ItemId;
    userId : UserId;
    var title : Text;
    var category : GoalCategory;
    var targetDate : ?CommonTypes.Timestamp;
    var progressPercent : Nat;
    var linkedTaskIds : [ItemId];
  };

  public type GoalPublic = {
    id : ItemId;
    title : Text;
    category : GoalCategory;
    targetDate : ?CommonTypes.Timestamp;
    progressPercent : Nat;
    linkedTaskIds : [ItemId];
  };

  public type CreateGoalInput = {
    title : Text;
    category : GoalCategory;
    targetDate : ?CommonTypes.Timestamp;
  };

  public type UpdateGoalInput = {
    id : ItemId;
    title : Text;
    category : GoalCategory;
    targetDate : ?CommonTypes.Timestamp;
    progressPercent : Nat;
    linkedTaskIds : [ItemId];
  };
};
