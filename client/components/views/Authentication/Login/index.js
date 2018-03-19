// @flow
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  AUTHENTICATE
} from '~/store/constants'

import { Button, Input, Form, Message } from 'semantic-ui-react'
import axios from 'axios'

type Props = {};
type State = {};

class Login extends Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      errorState: false
    }
  }

  login = () => {
    const {
      authenticate
    } = this.props

    const {
      email,
      password
    } = this.state

    const API_URI = process.env.API_URI || 'http://localhost:8000'

    axios.post(API_URI + '/login', {
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
      .catch((error) => {
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
      <h1>Sign In</h1>
      <Form>
        <Input value={email} onInput={(e: { target: { value: string }}) => this.setState({ email: e.target.value })}  placeholder='Email' style={{ width: '400px' }}/>
        <br/><br/>
        <Input value={password} onInput={(e: { target: { value: string }}) => this.setState({ password: e.target.value })} placeholder='Password' type='password' style={{ width: '400px' }}/>
        <br/><br/><br/>
        <Button disabled={email.length === 0 || password.length === 0} basic onClick={this.login}>Connect</Button>
        {errorState ?
          <Message negative>
            <Message.Header>Something wrong happened</Message.Header>
          </Message>
          : null}
      </Form>
    </Fragment>
  }
}

Login.propTypes = {
  authenticate: PropTypes.func,
  history: PropTypes.object
}

const mapStateToProps = (state: { user: { email: string } }) => ({
  user: state.auth.user
})

const mapDispatchToProps = (dispatch: Function) => {
  return {
    authenticate: (user: {}) => dispatch({
      type: AUTHENTICATE,
      user
    }),
  }
}

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

export { withRedux as Login }
