import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import './index.css'
import Root, {
    loader as rootLoader,
    action as rootAction,
} from "./routes/root";
import ErrorPage from "./error-page.jsx";
import Contact, {
    loader as contactLoader,
    action as contactAction,
} from "./routes/contact";
import EditContact ,{action as editAction} from "./routes/edit.jsx";
import { action as destroyAction } from "./routes/destroy";
import Index from "./routes/index.jsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        loader: rootLoader,
        action: rootAction,
        children:[
            {
                errorElement: <ErrorPage />,
                //之所以在children外包裹一层children,是因为当子页面出现异常，都会在root的outlet处显示异常，不会整个页面报异常
                children:[
                    // 注意是{index:true}而不是{path: ""}。它告诉路由器，当用户在父路由的确切路径上时，匹配并呈现该路由，所以在<Outlet>中没有其他要呈现的子路由。
                    {index: true, element: <Index/>},
                    {
                        // 参数传递：contactId
                        path: "contacts/:contactId",
                        element: <Contact/>,
                        loader: contactLoader,
                        action: contactAction,
                    },
                    {
                        path: "contacts/:contactId/edit",
                        element: <EditContact/>,
                        loader: contactLoader,
                        action: editAction,
                    },
                    {
                        path: "contacts/:contactId/destroy",
                        action: destroyAction,
                        // 定义自己的异常，不使用服路由的异常
                        errorElement: <div>Oops! There was an error.</div>,
                    },
                ],
            }
        ]

     },
    //不使用outlet占位且不放在children下面，当http://127.0.0.1:5173/contacts/1是这样的url，整个页面是个人联系方式，没有左侧的导航栏
    // {
    //     path: "contacts/:contactId",
    //     element: <Contact />,
    // },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
