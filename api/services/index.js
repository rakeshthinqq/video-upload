import { list } from './list'
import { register, login } from './auth'

export default [
  { 'path': '/', 'callback': list, 'verb': 'get'},
  { 'path': '/register', 'callback': register, 'verb': 'post'},
  { 'path': '/login', 'callback': login, 'verb': 'post'},
]
