import List "mo:core/List";
import TaskTypes "../types/task";
import CommonTypes "../types/common";
import Principal "mo:core/Principal";

module {
  public type Task = TaskTypes.Task;
  public type TaskPublic = TaskTypes.TaskPublic;
  public type CreateTaskInput = TaskTypes.CreateTaskInput;
  public type UpdateTaskInput = TaskTypes.UpdateTaskInput;
  public type UserId = TaskTypes.UserId;
  public type ItemId = TaskTypes.ItemId;

  public func listTasks(
    tasks : List.List<Task>,
    userId : UserId
  ) : [TaskPublic] {
    tasks.filter(func(t) { Principal.equal(t.userId, userId) }).map<Task, TaskPublic>(func(t) { toPublic(t) }).toArray();
  };

  public func createTask(
    tasks : List.List<Task>,
    nextId : Nat,
    userId : UserId,
    input : CreateTaskInput,
    now : CommonTypes.Timestamp
  ) : TaskPublic {
    let task : Task = {
      id = nextId;
      userId;
      var title = input.title;
      var category = input.category;
      var priority = input.priority;
      var dueDate = input.dueDate;
      var isCompleted = false;
      createdAt = now;
    };
    tasks.add(task);
    toPublic(task);
  };

  public func updateTask(
    tasks : List.List<Task>,
    userId : UserId,
    input : UpdateTaskInput
  ) : ?TaskPublic {
    switch (tasks.find(func(t) { t.id == input.id and Principal.equal(t.userId, userId) })) {
      case (?task) {
        task.title := input.title;
        task.category := input.category;
        task.priority := input.priority;
        task.dueDate := input.dueDate;
        task.isCompleted := input.isCompleted;
        ?toPublic(task);
      };
      case null { null };
    };
  };

  public func deleteTask(
    tasks : List.List<Task>,
    userId : UserId,
    id : ItemId
  ) : Bool {
    let sizeBefore = tasks.size();
    let filtered = tasks.filter(func(t) { not (t.id == id and Principal.equal(t.userId, userId)) });
    let sizeAfter = filtered.size();
    if (sizeAfter < sizeBefore) {
      tasks.clear();
      tasks.append(filtered);
      true;
    } else { false };
  };

  public func countCompletedToday(
    tasks : List.List<Task>,
    userId : UserId,
    dayStart : CommonTypes.Timestamp
  ) : Nat {
    tasks.filter(func(t) {
      Principal.equal(t.userId, userId) and t.isCompleted and t.createdAt >= dayStart
    }).size();
  };

  public func toPublic(task : Task) : TaskPublic {
    {
      id = task.id;
      title = task.title;
      category = task.category;
      priority = task.priority;
      dueDate = task.dueDate;
      isCompleted = task.isCompleted;
      createdAt = task.createdAt;
    };
  };
};
