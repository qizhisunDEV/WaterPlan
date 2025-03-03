import { useState, useEffect } from "react"
import { useAddNewUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSave } from "@fortawesome/free-solid-svg-icons"
import { MAJORS } from "../../config/majors"

const USER_REGEX = /^{A-z}{3,20}$/
const PWD_REGEX = /^{A-z0-9!@#$%}{4,12}$/

const NewUserForm = () => {

  const [addNewUser, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useAddNewUserMutation()

  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [validUsername, setValidUsername] = useState(false)
  const [password, setPassword] = useState('')
  const [validPassword, setValidPassword] = useState(false)
  const [major, setMajor] = useState('')

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username))
  }, [username])

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password))
  }, [password])

  useEffect(() => {
    if (isSuccess) {
      setUsername('')
      setPassword('')
      setMajor('')
      navigate('/dash/users')
    }
  }, [isSuccess, navigate])

  const onUsernameChanged = e => setUsername(e.target.value)
  const onPasswordChanged = e => setPassword(e.target.value)
  const onMajorChanged = (e) => setMajor(e.target.value);
  /*const onMajorChanged = e => {
    const values = Array.from(
      e.target.selectedOptions, 
      (option) => option.value
    )
    setMajor(values)
  }*/

  const canSave = [validUsername, validPassword].every(Boolean) && !isLoading

  const onSaveUserClicked = async (e) => {
    e.preventDefault()
    if (canSave) {
      await addNewUser({ username, password, major })
    }
  }

  const options = Object.values(MAJORS).map(major => {
    return (
      <option
        key={major}
        value={major}
      > {major} </option>
    )
  })

  const errClass = isError ? "errmsg" : "offscreen"
  const validUserClass = !validUsername ? 'form__input--incomplete' : ''
  const validPwdClass = !validPassword ? 'form__input--incomplete' : ''
  const validMajorClass = ''

  const content = (
    <>
      <p className={errClass}>{error?.data?.message}</p>

      <form className="form" onSubmit={onSaveUserClicked}>
        <h2>New User</h2>
        <div className="form__action-buttons">
          <button
            className="icon-button"
            title="Save"
            disabled={!canSave}
          >
            <FontAwesomeIcon icon={faSave} />
          </button>
        </div>
        <label className="form__label" htmlFor="username">
          Username: <span className="nowrap">[3-20 letters]</span></label>
        <input
          className={`form__input ${validUserClass}`}
          id="username"
          name="username"
          type="text"
          autoComplete="off"
          value={username}
          onChange={onUsernameChanged}
        />

        <label className="form__label" htmlFor="password">
          Password: <span className="nowrap">[4-12 chars incl. !@#$%]</span></label>
        <input
          className={`form__input ${validPwdClass}`}
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={onPasswordChanged}
        />

        <label className="form__label" htmlFor="major">
          ASSIGNED MAJORS:</label>
        <select
          id="major"
          name="major"
          className={`form__input ${validMajorClass}`}
          multiple={true}
          size="3"
          type="major"
          value={major}
          onChange={onMajorChanged}
        >
          {options}
        </select>
      </form>
    </>
  )

  return content
}

export default NewUserForm
