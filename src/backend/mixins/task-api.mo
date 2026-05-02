import List "mo:core/List";
import TaskTypes "../types/task";
import TaskLib "../lib/task";
import Time "mo:core/Time";

mixin (
  tasks : List.List<TaskTypes.Task>,
  nextTaskId : Nat
) {
  public shared query ({ caller }) func listMyTasks() : async [TaskTypes.TaskPublic] {
    TaskLib.listTasks(tasks, caller);
  };

  public shared ({ caller }) func createTask(
    input : TaskTypes.CreateTaskInput
  ) : async TaskTypes.TaskPublic {
    let id = tasks.size();
    TaskLib.createTask(tasks, id, caller, input, Time.now());
  };

  public shared ({ caller }) func updateTask(
    input : TaskTypes.UpdateTaskInput
  ) : async ?TaskTypes.TaskPublic {
    TaskLib.updateTask(tasks, caller, input);
  };

  public shared ({ caller }) func deleteTask(id : Nat) : async Bool {
    TaskLib.deleteTask(tasks, caller, id);
  };
};
