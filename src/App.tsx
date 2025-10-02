import MonsterList from './components/MonsterList.tsx'
import ArchimonsterCounter from './components/ArchimonsterCounter.tsx'
import './App.css'

function App() {
  return (
    <div>
      <div className="header-section">
        <h1>Ocre App</h1>
        <ArchimonsterCounter />
      </div>
      <MonsterList />
    </div>
  )
}

export default App
