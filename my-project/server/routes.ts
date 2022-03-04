import { AuthRouter} from './routers/auth'
import {PostRouter} from './routers/posts'
const ROUTES = [{
    path:'/auth',
    router : AuthRouter
},
{
    path:'/posts',
    router : PostRouter
},
]

export default ROUTES

