// @flow
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Input, Form, Message } from 'semantic-ui-react'
import axios from 'axios'

import {
  AUTHENTICATE
} from '~/store/constants'

type Props = {};
type State = {};

class Register extends Component<Props, State> {

  constructor(props: Props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      errorState: false
    }
  }

  register = () => {

    const {
      authenticate
    } = this.props

    const {
      email,
      password
    } = this.state

    const API_URI = process.env.API_URI || 'http://localhost:8000'

    axios.post(API_URI + '/register', {
      email,
      password
    })
      .then((response: { data: any }) => {
        const {
          data
        } = response

        if (data && !data.error) {
          const {
            user
          } = data

          new Promise((resolve: Function) => resolve(authenticate(user)))
            .then(() => {
              this.props.history.push('/home')
            })

          this.setState({ errorState: false })
        } else {
          this.setState({ errorState: true })
        }

      })
      .catch(() => {
        this.setState({ errorState: true })
      })
  }

  render = () => {
    const {
      email,
      password,
      errorState
    } = this.state

    return <Fragment>
      <h1>Sign Up</h1>
      <Form>
        <Input value={email} onInput={(e: { target: { value: string }}) => this.setState({ email: e.target.value })} placeholder='Email' style={{ width: '400px' }}/>
        <br/><br/>
        <Input value={password} onInput={(e: { target: { value: string }}) => this.setState({ password: e.target.value })} placeholder='Password' type='password' style={{ width: '400px' }}/>
        <br/><br/><br/>
        <Button disabled={email.length === 0 || password.length === 0} basic onClick={this.register}>Register</Button>
        {errorState ?
          <Message negative>
            <Message.Header>Something wrong happened</Message.Header>
          </Message>
          : null}
      </Form>
    </Fragment>
  }
}

Register.propTypes = {
  authenticate: PropTypes.func,
  history: PropTypes.object
}

const mapStateToProps = (state: { user: { email: string } }) => ({
  user: state.auth.user
})

const mapDispatchToProps = (dispatch: Function) => {
  return {
    authenticate: (user: { email: string }) => dispatch({
      type: AUTHENTICATE,
      user
    }),
  }
}

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(Register)

export { withRedux as Register }
