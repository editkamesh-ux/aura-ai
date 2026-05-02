import Map "mo:core/Map";
import List "mo:core/List";

import ProfileTypes "types/profile";
import RoutineTypes "types/routine";
import TaskTypes "types/task";
import GoalTypes "types/goal";
import ChatTypes "types/chat";
import FocusTypes "types/focus";

import ProfileMixin "mixins/profile-api";
import RoutineMixin "mixins/routine-api";
import TaskMixin "mixins/task-api";
import GoalMixin "mixins/goal-api";
import ChatMixin "mixins/chat-api";
import FocusMixin "mixins/focus-api";
import StatsMixin "mixins/stats-api";
import AIMixin "mixins/ai-api";

actor {
  // --- Profile state ---
  let profiles = Map.empty<ProfileTypes.UserId, ProfileTypes.UserProfile>();

  // --- Routine state ---
  let routines = List.empty<RoutineTypes.RoutineItem>();
  let nextRoutineId : Nat = 0;

  // --- Task state ---
  let tasks = List.empty<TaskTypes.Task>();
  let nextTaskId : Nat = 0;

  // --- Goal state ---
  let goals = List.empty<GoalTypes.Goal>();
  let nextGoalId : Nat = 0;

  // --- Chat state ---
  let chatMessages = List.empty<ChatTypes.ChatMessage>();
  let nextChatId : Nat = 0;

  // --- Focus state ---
  let focusSessions = List.empty<FocusTypes.FocusSession>();
  let nextFocusId : Nat = 0;

  // --- Mixins ---
  include ProfileMixin(profiles);
  include RoutineMixin(routines, nextRoutineId);
  include TaskMixin(tasks, nextTaskId);
  include GoalMixin(goals, nextGoalId);
  include ChatMixin(chatMessages, nextChatId);
  include FocusMixin(focusSessions, nextFocusId);
  include StatsMixin(tasks, goals, focusSessions);
  include AIMixin();
};
