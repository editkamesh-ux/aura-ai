import List "mo:core/List";
import RoutineTypes "../types/routine";
import RoutineLib "../lib/routine";

mixin (
  routines : List.List<RoutineTypes.RoutineItem>,
  nextRoutineId : Nat
) {
  public shared query ({ caller }) func listMyRoutines() : async [RoutineTypes.RoutineItemPublic] {
    RoutineLib.listRoutines(routines, caller);
  };

  public shared ({ caller }) func createRoutine(
    input : RoutineTypes.CreateRoutineInput
  ) : async RoutineTypes.RoutineItemPublic {
    let id = routines.size();
    RoutineLib.createRoutine(routines, id, caller, input);
  };

  public shared ({ caller }) func updateRoutine(
    input : RoutineTypes.UpdateRoutineInput
  ) : async ?RoutineTypes.RoutineItemPublic {
    RoutineLib.updateRoutine(routines, caller, input);
  };

  public shared ({ caller }) func deleteRoutine(id : Nat) : async Bool {
    RoutineLib.deleteRoutine(routines, caller, id);
  };
};
