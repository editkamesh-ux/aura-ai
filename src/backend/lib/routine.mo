import List "mo:core/List";
import RoutineTypes "../types/routine";
import Principal "mo:core/Principal";

module {
  public type RoutineItem = RoutineTypes.RoutineItem;
  public type RoutineItemPublic = RoutineTypes.RoutineItemPublic;
  public type CreateRoutineInput = RoutineTypes.CreateRoutineInput;
  public type UpdateRoutineInput = RoutineTypes.UpdateRoutineInput;
  public type UserId = RoutineTypes.UserId;
  public type ItemId = RoutineTypes.ItemId;

  public func listRoutines(
    routines : List.List<RoutineItem>,
    userId : UserId
  ) : [RoutineItemPublic] {
    routines.filter(func(r) { Principal.equal(r.userId, userId) }).map<RoutineItem, RoutineItemPublic>(func(r) { toPublic(r) }).toArray();
  };

  public func createRoutine(
    routines : List.List<RoutineItem>,
    nextId : Nat,
    userId : UserId,
    input : CreateRoutineInput
  ) : RoutineItemPublic {
    let item : RoutineItem = {
      id = nextId;
      userId;
      var name = input.name;
      var startTime = input.startTime;
      var endTime = input.endTime;
      var category = input.category;
      var isEnabled = input.isEnabled;
      var daysOfWeek = input.daysOfWeek;
    };
    routines.add(item);
    toPublic(item);
  };

  public func updateRoutine(
    routines : List.List<RoutineItem>,
    userId : UserId,
    input : UpdateRoutineInput
  ) : ?RoutineItemPublic {
    switch (routines.find(func(r) { r.id == input.id and Principal.equal(r.userId, userId) })) {
      case (?item) {
        item.name := input.name;
        item.startTime := input.startTime;
        item.endTime := input.endTime;
        item.category := input.category;
        item.isEnabled := input.isEnabled;
        item.daysOfWeek := input.daysOfWeek;
        ?toPublic(item);
      };
      case null { null };
    };
  };

  public func deleteRoutine(
    routines : List.List<RoutineItem>,
    userId : UserId,
    id : ItemId
  ) : Bool {
    let sizeBefore = routines.size();
    let filtered = routines.filter(func(r) { not (r.id == id and Principal.equal(r.userId, userId)) });
    let sizeAfter = filtered.size();
    if (sizeAfter < sizeBefore) {
      routines.clear();
      routines.append(filtered);
      true;
    } else { false };
  };

  public func toPublic(item : RoutineItem) : RoutineItemPublic {
    {
      id = item.id;
      name = item.name;
      startTime = item.startTime;
      endTime = item.endTime;
      category = item.category;
      isEnabled = item.isEnabled;
      daysOfWeek = item.daysOfWeek;
    };
  };
};
