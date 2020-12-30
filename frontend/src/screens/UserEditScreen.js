import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUser } from '../actions/userAction'
import FormContainer from '../components/FormContainer'
import { USER_UPDATE_RESET } from '../constants/userConstants'


const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isAdmin, setAdmin] = useState(false)

  const dispatch = useDispatch()

  const userDetails = useSelector(state => state.userDetails)
  const { loading, error, user } = userDetails

  const userUpdate = useSelector(state => state.userUpdate)
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate
  
  useEffect(() => {
    if(successUpdate) {
      dispatch({ type: USER_UPDATE_RESET})
      history.push('/admin/userlist')
    } else {
      if(!user.name || user._id !== userId){
        dispatch(getUserDetails(userId))
      } else {
        setName(user.name)
        setEmail(user.email)
        setAdmin(user.isAdmin)
      }
    }
  }, [dispatch, user, userId, successUpdate, history])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUser({ _id: userId, name, email, isAdmin}))
  }


  return (
    <>
      <Link to='/admin/userlist' className='btn btn-dark my-3'>Go back</Link>
      <FormContainer>
      <h1>Edit User</h1>
      {loadingUpdate && <Loader/> }
      {errorUpdate && <Message variant='danger'>{error}</Message>}
      {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
         <Form onSubmit={submitHandler}>
         <Form.Group controlId='name'>
           <Form.Label>Name Address</Form.Label>
             <Form.Control 
               type='name' 
               placeholder='Enter name' 
               value={name} 
               onChange={(e) => setName(e.target.value)}
             ></Form.Control>
         </Form.Group>
         <Form.Group controlId='email'>
           <Form.Label>Email Address</Form.Label>
             <Form.Control 
               type='email' 
               placeholder='Enter email' 
               value={email} 
               onChange={(e) => setEmail(e.target.value)}
             ></Form.Control>
         </Form.Group>

         <Form.Group controlId='isAdmin'>
             <Form.Check 
               type='checkbox'
               label='Is Admin?'
               checked={isAdmin} 
               onChange={(e) => setAdmin(e.target.checked)}
             ></Form.Check>
         </Form.Group>
 
         <Button variant='primary' type='submit'>Update</Button>
       </Form>
      )}
    </FormContainer>
    </>
  )
}

export default UserEditScreen
