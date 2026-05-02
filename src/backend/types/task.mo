import CommonTypes "common";

module {
  public type UserId = CommonTypes.UserId;
  public type ItemId = CommonTypes.ItemId;

  public type TaskPriority = { #low; #medium; #high };

  public type TaskCategory = {
    #work; #personal; #health; #fitness; #learning; #other;
  };

  public type Task = {
    id : ItemId;
    userId : UserId;
    var title : Text;
    var category : TaskCategory;
    var priority : TaskPriority;
    var dueDate : ?CommonTypes.Timestamp;
    var isCompleted : Bool;
    createdAt : CommonTypes.Timestamp;
  };

  public type TaskPublic = {
    id : ItemId;
    title : Text;
    category : TaskCategory;
    priority : TaskPriority;
    dueDate : ?CommonTypes.Timestamp;
    isCompleted : Bool;
    createdAt : CommonTypes.Timestamp;
  };

  public type CreateTaskInput = {
    title : Text;
    category : TaskCategory;
    priority : TaskPriority;
    dueDate : ?CommonTypes.Timestamp;
  };

  public type UpdateTaskInput = {
    id : ItemId;
    title : Text;
    category : TaskCategory;
    priority : TaskPriority;
    dueDate : ?CommonTypes.Timestamp;
    isCompleted : Bool;
  };
};
