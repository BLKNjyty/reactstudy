import About from "../components/About"
import Home from "../components/Home"
import Message from "../components/Home/Message"
import News from "../components/Home/News"
import { Navigate } from "react-router-dom"
import Detail from "../components/Home/Message/Detail"

export default [
    {
      path:'/about',
      element:<About/>
    },
    {
      path:'/home',
      element:<Home/>,
      children:[
        {
            path:'news',
            element:<News/>
        },
        {
          path:'message',
          element:<Message/>,
          children:[
            {
              // path:'detail/:id/:title',
              path:'detail',
              element:<Detail/>
            }
          ]
      }
      ]
    },
    {
      path:'/',
      element:<Navigate to="/about"/>
    }
  ]