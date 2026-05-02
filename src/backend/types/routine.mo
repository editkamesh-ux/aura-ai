import CommonTypes "common";

module {
  public type UserId = CommonTypes.UserId;
  public type ItemId = CommonTypes.ItemId;

  public type DayOfWeek = {
    #monday; #tuesday; #wednesday; #thursday; #friday; #saturday; #sunday;
  };

  public type RoutineCategory = {
    #morning; #workout; #work; #evening; #sleep; #custom;
  };

  public type RoutineItem = {
    id : ItemId;
    userId : UserId;
    var name : Text;
    var startTime : Text;
    var endTime : Text;
    var category : RoutineCategory;
    var isEnabled : Bool;
    var daysOfWeek : [DayOfWeek];
  };

  public type RoutineItemPublic = {
    id : ItemId;
    name : Text;
    startTime : Text;
    endTime : Text;
    category : RoutineCategory;
    isEnabled : Bool;
    daysOfWeek : [DayOfWeek];
  };

  public type CreateRoutineInput = {
    name : Text;
    startTime : Text;
    endTime : Text;
    category : RoutineCategory;
    isEnabled : Bool;
    daysOfWeek : [DayOfWeek];
  };

  public type UpdateRoutineInput = {
    id : ItemId;
    name : Text;
    startTime : Text;
    endTime : Text;
    category : RoutineCategory;
    isEnabled : Bool;
    daysOfWeek : [DayOfWeek];
  };
};
