import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login'
import DashLayout from './components/DashLayout'
import Welcome from './features/auth/Welcome'
import MajorList from './features/majors/MajorList'
import UserList from './features/users/UserList'
import EditUser from './features/users/EditUser'
import NewUserForm from './features/users/NewUserForm'
import EditMajor from './features/majors/EditMajor'
import NewMajor from './features/majors/EditMajor'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        <Route path="dash" element={<DashLayout />}>

          <Route index element={<Welcome />} />

          <Route path="users">
            <Route index element={<UserList />} />
            <Route path=":id" element={<EditUser />} />
            <Route path="new" element={<NewUserForm />} />
          </Route>

          <Route path="majors">
            <Route index element={<MajorList />} />
            <Route path=":id" element={<EditMajor />} />
            <Route path="new" element={<NewMajor />} />
          </Route>

        </Route>{/* End Dash */}

      </Route>
    </Routes>
  );
}

export default App;
