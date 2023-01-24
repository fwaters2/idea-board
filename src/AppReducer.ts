import { v4 as uuid } from "uuid";
import { initialState } from "./constants";
import { AppState, Idea, SortKey } from "./types";

interface CreateAction {
  type: "CREATE_IDEA";
}

interface FetchAction {
  type: "FETCH_IDEAS";
}

interface UpdateAction {
  type: "UPDATE_IDEA";
  cardId: string;
  updatedIdea: Partial<Idea>;
}

interface DeleteAction {
  type: "DELETE_IDEA";
  cardId: string;
}

interface SortAction {
  type: "SET_SORT_KEY";
  sortKey: SortKey;
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

export const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "CREATE_IDEA": {
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
    case "FETCH_IDEAS": {
      const ideas: Idea[] = fetchIdeas();
      return {
        ...state,
        ideas,
      };
    }
    case "UPDATE_IDEA": {
      const { cardId, updatedIdea } = action;
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
    case "DELETE_IDEA": {
      const { cardId } = action;
      const ideas = state.ideas.filter((idea: Idea) => idea.id !== cardId);
      postIdeas(ideas);
      return {
        ...state,
        ideas,
      };
    }
    case "SET_SORT_KEY": {
      const { sortKey } = action;
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
  }
};
