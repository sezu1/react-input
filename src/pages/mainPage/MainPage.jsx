import {useState} from 'react';

export function MainPage() {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([]);


  function changeValue (event){
      const {value} = event.target // const value = event.target.value;
      setInput(value)
  }

  function addTodo(event){
      event.preventDefault()
      let todo = {}
          if (todos.length === 0){
              todo = {
                  id: 1,
                  title: input,
                  status: false
                  }
      }
      else {
          todo = {
              id: todos[todos.length -1].id + 1,
              title: input,
              status: false
          }
      }
          setTodos([...todos, todo])
      setInput('')
  }

  function deleteTodo(id){
      const filteredTodos = todos.filter(todo => todo.id !== id)
      setTodos(filteredTodos)
  }


  function changeStatus(event){
     // console.dir(event.target)
      const {checked, value} = event.target
      // console.log(checked)
      const id = +value
      const newTodos = todos.map(todo => {
          if (todo.id === id){
              return {
                  ...todo,
                  status: checked
              }
          }else{
              return todo
          }
      })
      setTodos(newTodos)
  }


  function updateTodos(id){
          const newArr = todos.map(todo => {
                if (todo.id === id){
                    return {
                        ...todo,
                        title: input
                    }
                }
                else{
                    return todo
                }
          })
      console.log(newArr)
          setTodos(newArr)
          setInput('')
      }


     function deleteAll (){
      setTodos([])
     }


    return (
        <div>
            <h1>Main Page</h1>

            <form onSubmit={addTodo}>
                <input type='text' onInput={changeValue} value={input}/>
                    <button disabled={input === ''}>add todo</button>
                    {
                        todos.length > 0 && (<button onClick={deleteAll}>delete all</button>)
                    }
            </form>


            <ul>
                {todos.map((todo) => <li key={todo.id}>
                    <input
                        checked={todo.status}
                        type='checkbox' onChange={changeStatus}
                           value={todo.id}/>
                    {todo.status ? <s>{todo.title}</s> : <span>{todo.title}</span>}
                    <button  onClick={() => deleteTodo(todo.id)}>delete</button>
                    <button onClick={() => updateTodos(todo.id)} disabled={input === ''}>update</button>
                </li>)}
            </ul>
        </div>
    );
}

