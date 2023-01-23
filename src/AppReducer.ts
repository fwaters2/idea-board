import { v4 as uuid } from "uuid";
import { initialState } from "./constants";
import { AppState, Idea, SortKey } from "./types";

export enum ActionKind {
  CREATE_IDEA = "CREATE_IDEA",
  FETCH_IDEAS = "FETCH_IDEAS",
  UPDATE_IDEA = "UPDATE_IDEA",
  DELETE_IDEA = "DELETE_IDEA",
  SET_SORT_KEY = "SET_SORT_KEY",
}

interface CreateAction {
  type: ActionKind.CREATE_IDEA;
}

interface FetchAction {
  type: ActionKind.FETCH_IDEAS;
}

interface UpdateAction {
  type: ActionKind.UPDATE_IDEA;
  payload: {
    cardId: string;
    updatedIdea: Partial<Idea>;
  };
}

interface DeleteAction {
  type: ActionKind.DELETE_IDEA;
  payload: {
    cardId: string;
  };
}

interface SortAction {
  type: ActionKind.SET_SORT_KEY;
  payload: {
    sortKey: SortKey;
  };
}

export type AppAction =
  | CreateAction
  | FetchAction
  | UpdateAction
  | DeleteAction
  | SortAction;

const postIdeas = (ideas: Idea[]) =>
  localStorage.setItem("ideas", JSON.stringify(ideas));

const fetchIdeas = () => {
  const ideas = localStorage.getItem("ideas");
  return ideas ? JSON.parse(ideas) : [];
};

export const appReducer: (state: AppState, action: AppAction) => AppState = (
  state,
  action
) => {
  switch (action.type) {
    case ActionKind.CREATE_IDEA: {
      const newIdea: Idea = {
        id: uuid(),
        title: "New Idea",
        description: "Click me to add a description",
        created: new Date(),
      };
      const ideas = [...state.ideas, newIdea];
      postIdeas(ideas);
      return {
        ...state,
        ideas,
        // reset sortkey and direction
        sortKey: initialState.sortKey,
        sortDirection: initialState.sortDirection,
      };
    }
    case ActionKind.FETCH_IDEAS: {
      const ideas: Idea[] = fetchIdeas();
      return {
        ...state,
        ideas,
      };
    }
    case ActionKind.UPDATE_IDEA: {
      const { cardId, updatedIdea } = action.payload;
      const ideas = state.ideas.map((idea: Idea) => {
        if (idea.id === cardId) {
          return {
            ...idea,
            ...updatedIdea,
          };
        }
        return idea;
      });
      postIdeas(ideas);
      return {
        ...state,
        ideas,
      };
    }
    case ActionKind.DELETE_IDEA: {
      const { cardId } = action.payload;
      const ideas = state.ideas.filter((idea: Idea) => idea.id !== cardId);
      postIdeas(ideas);
      return {
        ...state,
        ideas,
      };
    }
    case ActionKind.SET_SORT_KEY: {
      const { sortKey } = action.payload;
      const sortDirection =
        state.sortKey === sortKey && state.sortDirection === "asc"
          ? "desc"
          : "asc";
      return {
        ...state,
        sortKey,
        sortDirection,
      };
    }
    default:
      throw new Error();
  }
};
