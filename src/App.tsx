import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'

type Todo = {
  id: string
  title: string
  completed: boolean
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState('')

  const remainingCount = useMemo(
    () => todos.filter((todo) => !todo.completed).length,
    [todos],
  )

  function addTodo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const title = newTodo.trim()
    if (!title) return

    setTodos((currentTodos) => [
      { id: crypto.randomUUID(), title, completed: false },
      ...currentTodos,
    ])
    setNewTodo('')
  }

  function toggleTodo(id: string) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    )
  }

  function deleteTodo(id: string) {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id))
  }

  return (
    <main className="app-shell">
      <section className="todo-card" aria-labelledby="app-title">
        <header className="todo-header">
          <p className="eyebrow">DAILY FOCUS</p>
          <h1 id="app-title">今日のタスク</h1>
          <p className="progress" aria-live="polite">
            {remainingCount === 0
              ? 'やりたいことをおしえてください！'
              : `残り ${remainingCount} 件のタスク`}
          </p>
        </header>

        <form className="add-form" onSubmit={addTodo}>
          <label className="sr-only" htmlFor="new-todo">新しいタスク</label>
          <input id="new-todo" value={newTodo} onChange={(event) => setNewTodo(event.target.value)} placeholder="新しいタスクを入力" maxLength={100} />
          <button type="submit">追加</button>
        </form>

        {todos.length === 0 ? (
          <div className="empty-state">
            <span aria-hidden="true">✓</span>
            <p>タスクはまだありません。<br />小さな一歩が世界を変える。</p>
          </div>
        ) : (
          <ul className="todo-list" aria-label="タスク一覧">
            {todos.map((todo) => (
              <li className={todo.completed ? 'todo-item is-complete' : 'todo-item'} key={todo.id}>
                <label className="todo-label">
                  <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
                  <span className="checkmark" aria-hidden="true">✓</span>
                  <span className="todo-title">{todo.title}</span>
                </label>
                <button className="delete-button" type="button" onClick={() => deleteTodo(todo.id)} aria-label={`「${todo.title}」を削除`}>削除</button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

export default App
