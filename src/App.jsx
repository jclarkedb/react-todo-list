import './App.css'
import { useState } from 'react'

function App() {
  const [listItems, setListItems] = useState([])

  function addTask(event) {
    event.preventDefault()
    const formData = event.currentTarget.task.value.trim()
    formData && setListItems((prev) => { return ([...prev, {
      text: formData,
      isStruck: false
    }]) })
    event.currentTarget.task.value = ''
    event.currentTarget.task.focus()
  }

  function removeItem(index) {
    setListItems((prev) => {
      prev.splice(index, 1)
      return ([...prev])
    })
  }

  function strikeItem(index) {
    setListItems((prev) => {
      prev[index].isStruck = !prev[index].isStruck
      return ([...prev])
    })
  }

  const listElements = (listItems.length > 0) && listItems.map((item, index) => {
    const struckItemClass = item.isStruck ? "list-item struck" : "list-item unstruck"
    
    return (<li key={index} className={index > 0 ? "top-border" : ""}>
    <span
    onClick={() => strikeItem(index)}
    className={struckItemClass}>{item.text}</span>
    <span className="delete" onClick={() => removeItem(index)}>x</span></li>)
  })

  return (
    <main>
        <form onSubmit={addTask}>
          <label htmlFor="task"></label>
          <input type="text" id="task" name="task" />
          <button type="submit">Add Task</button>
        </form>
        <section className='list-items'>
        <h2 className="title">To-do List</h2>
          <ul>
            {listElements}
          </ul>
        </section>
    </main>
  )
}

export default App
