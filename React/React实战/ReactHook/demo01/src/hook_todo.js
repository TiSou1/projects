import React, {useState, useEffect, useMemo, useRef, useCallback} from 'react';


let idSeq = Date.now()
function Control(props) {
    const {addTodo} = props;
    const inputRef = useRef()
    const onSubmit = (e) => {
        e.preventDefault();
        const newText = inputRef.current.value.trim();
        if (newText.length === 0) {
            return
        }
        addTodo({
            id: idSeq++,
            text: newText,
            complate: false
        })
        inputRef.current.value = ''
    }
    return (
        <div className='control'>
            <h1>todos</h1>
            <form action="" onSubmit={onSubmit}>
                <input type="text"
                       ref={inputRef}
                       className='new-todo'
                       placeholder='what needs to be done?'/>
            </form>
        </div>
    )
}

function TodoItem(propos) {
  const { todo, toggleTodo, removeTodo } = propos
  const onChange = () => {
    toggleTodo(todo.id)
  }
  const onRemove = () => {
    removeTodo(todo.id)
  }
  return(
    <li className='todo-item'>
      <input type="checkbox" onChange={onChange} checked={todo.complate}/>
      <label className={todo.complate ? 'complate' : ''}>{todo.text}</label>
      <button onClick={onRemove}>&#xd7;</button>
    </li>
  )
}


function Todos(props) {
    const {removeTodo, toggleTodo, todos } = props;
    return (
      <ul>
        {
          todos.map( todo => {
            return (
              <TodoItem
                key={todo.id}
                todo={todo}
                toggleTodo={toggleTodo}
                removeTodo={removeTodo}
              />
            )
          })
        }
      </ul>
    )
}
const TODE_KEY = '_todo_key_'



function TodoList() {
    const [todos, setTodos] = useState([])
    const addTodo = useCallback((todo) => {
        console.log(todos.length);
        console.log("todoS更新:"+todo.text);
        setTodos(todos => [...todos, todo]);
    },[])

    // const addTodo = useMemo(()=>{      
    //   console.log(todos.length);
    //     return (todo)=>{
    //       console.log("todoS更新:"+todo.text);
    //       setTodos(todos => [...todos, todo]);
    //     }
       
    // },[]);
    const removeTodo = useCallback((id) => {
        setTodos(todos => todos.filter(todo => {
            return todo.id !== id
        }))
    }, [])

    const toggleTodo = useCallback((id) => {
        setTodos(todos => todos.map(todo => {
            return todo.id === id
                ? {
                    ...todo,
                    complate: !todo.complate
                }
                : todo
        }))
    }, [])
    //本地存储
    useEffect(() => {
      const todos = JSON.parse(localStorage.getItem(TODE_KEY));
      setTodos(todos)
    },[])
    useEffect(()=> {
    
      localStorage.setItem(TODE_KEY, JSON.stringify(todos))
    },[todos])
    return (
        <div className='todo-list'>
            <Control addTodo={addTodo}></Control>
            <Todos removeTodo={removeTodo} toggleTodo={toggleTodo} todos={todos}></Todos>
        </div>
    )
}

export default TodoList;
