import { Container } from "@mui/material"
import Header from "../components/Header"
import { useEffect, useState } from "react"
import axios from "axios";
import AddTodoComp from "../components/AddTodoComp";
import TodoList from "../components/TodoList";
import { notify, SweetIcon, SweetPosition } from "../helper/sweetAlert";

// interface ITodoType {
//     task : string;
//     isDone: boolean;
//     id : string | number; //* id değeri string yada number olabilir
//     todo?: string //? bu alan zorunlu değil optional. Eğer varsa type ı string
// }

const url = "https://634ac3fc5df952851418480f.mockapi.io/api/todos";

const Main = () => {
    // const [todos,setTodos] = useState([] as ITodoType[]) 
    // const [todos,setTodos] = useState<Array<ITodoType>>([]) 
    const [todos,setTodos] = useState<ITodoType[]>([]) //* yaygın olan kullanım
    console.log(todos)

    const getTodos = async ()=>{
        try {
            const {data} = await axios<ITodoType[]>(url)
            setTodos(data)
        } catch (error) {
            console.log(error)
        }
    }

    //* 1.yol
    // const addTodo = async (task:string) => {
    //     try {
            
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    //? 2.yol
    // type AddFn = (task:string) => Promise<void>;

    const addTodo:AddFn = async (task) => {
        try {
            await axios.post(url,{task,isDone:false})
            notify("Todo created!",SweetIcon.SUCCESS,SweetPosition.Center)
            getTodos()
        } catch (error) {
            console.log(error)
            notify("Todo not created!",SweetIcon.ERROR,SweetPosition.BottomEnd)
        }
    }
    const toggleTodo:ToggleFn = async (todo) => {
        try {
            await axios.put(`${url}/${todo.id}`,{...todo,isDone:!todo.isDone})
            notify("Todo updated!",SweetIcon.SUCCESS,SweetPosition.Center)
        } catch (error) {
            console.log(error)
            notify("Todo not updated!",SweetIcon.ERROR,SweetPosition.TopStart)
        } finally {
            getTodos()
        }
    }
    const deleteTodo:DeleteFn = async (id) => {
        try {
            await axios.delete(`${url}/${id}`)
            notify("Todo deleted!",SweetIcon.SUCCESS,SweetPosition.Center)
        } catch (error) {
            console.log(error)
            notify("Todo not deleted!",SweetIcon.ERROR,SweetPosition.TopStart)
        } finally {
            getTodos()
        }
    }

    useEffect(()=>{
        getTodos()
    },[])

    return (
        <Container>
            <Header/>
            <AddTodoComp addTodo={addTodo}/>
            <TodoList todos={todos} deleteTodo={deleteTodo} toggleTodo={toggleTodo}/>
        </Container> 
    )
}
export default Main