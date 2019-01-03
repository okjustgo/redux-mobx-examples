import { TodoStore, TodoItem } from "./TodoStore";
import { FilterStore, VisibilityFilters } from "./FilterStore";
import {CreateStore, View, Actions } from './StoreHelper';

export class StoreState {
  todoStore = new TodoStore();
  filterStore = new FilterStore();  
}

export class StoreView extends View<StoreState> {
  /* State */
  get visibilityFilter() {
    return this.state.filterStore.view.visibilityFilter;
  }

  get todos() {
    return this.state.todoStore.view.todos;
  }

  /* Computed */
  get completedTodosCount() {
    return this.state.todoStore.view.completedTodosCount;
  }
  
  /* Utility */  
    get visibleTodos(): TodoItem[] {
      switch (this.visibilityFilter) {
        case VisibilityFilters.SHOW_ALL:
          return this.todos;
        case VisibilityFilters.SHOW_COMPLETED:
          return this.todos.filter(t => t.completed);
        case VisibilityFilters.SHOW_ACTIVE:
          return this.todos.filter(t => !t.completed);
        default:
          throw new Error("Unknown filter: " + this.visibilityFilter);
      }
    }
}

export class StoreActions extends Actions<StoreState> {
  /* Actions */
  private _nextTodoId = 0;
  addTodo(text: string) {
    return this.state.todoStore.actions.addTodo({
      id: this._nextTodoId++,
      text
    });
  }
  toggleTodo = this.state.todoStore.actions.toggleTodo;
  removeTodo = this.state.todoStore.actions.removeTodo;
  setVisibilityFilter = this.state.filterStore.actions.setVisibilityFilter;
}

const Store = CreateStore(StoreState, StoreView, StoreActions);
export { Store };

export { VisibilityFilters };
