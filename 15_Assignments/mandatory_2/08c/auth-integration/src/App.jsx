
import Login from "./components/Login"
import Logout from "./components/Logout"
import Profile from "./components/Profile"
import { useAuth0 } from "@auth0/auth0-react"
function App() {
  const {isLoading, error} = useAuth0()

  return (
    <>
    <h1>Auth app</h1>
    {error && <div> {error.message}</div>}
    {!error && isLoading && <div>Loading...</div>}
    {!error && !isLoading && (
      <>
      <Login />
      <Logout />
      <Profile />
      </>
    )}
    </>
  )
}

export default App
