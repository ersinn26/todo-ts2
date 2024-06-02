import DeleteOutline from "@mui/icons-material/DeleteOutline";
import { IconButton, ListItem, ListItemText } from "@mui/material";
import { FC } from "react";

// interface ITodoListItem  {
//     todo: ITodoType;
//     deleteTodo:DeleteFn;
//     toggleTodo:ToggleFn
// }

interface ITodoListItem extends ITodoListFn {
  todo: ITodoType;
}

const TodoListItem: FC<ITodoListItem> = ({ todo, deleteTodo, toggleTodo }) => {
  return (
    <ListItem
      disableGutters
      sx={{ padding: "1rem", cursor: "pointer" }}
      secondaryAction={
        <IconButton aria-label="comment">
          <DeleteOutline sx={{ "&:hover": { color: "red" } }} onClick={()=>deleteTodo(todo.id)} />
        </IconButton>
      }
    >
      <ListItemText sx={{wordWrap:"break-word"}} primary={todo.task} onClick={()=>toggleTodo(todo)} />
    </ListItem>
  );
};
export default TodoListItem;
