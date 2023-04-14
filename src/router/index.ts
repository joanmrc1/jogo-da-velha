import { createBrowserRouter } from 'react-router-dom'
import Home from '../components/Home'

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home
  },
])

export default router;

