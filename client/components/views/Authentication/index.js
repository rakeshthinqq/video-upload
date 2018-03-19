// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  AUTHENTICATE
} from '~/store/constants'

import { Segment, Tab, Button } from 'semantic-ui-react'
// Local components
import { MainWrapper } from '~/components'
import { Login } from './Login'
import { Register } from './Register'

class Authentication extends Component {

  constructor(props) {
    super(props)
  }

  render = () => {
    const {
      user
    } = this.props

    const panes = [
      { menuItem: 'Sign-In', render: () => <Tab.Pane attached={false} style={{ borderRadius: '0', background: 'rgba(255,255,255,0.3)', padding: '10em' }}>{this && this.props ?
        <Login {...this.props} />
        : null}</Tab.Pane> },
      { menuItem: 'Sign-up', render: () => <Tab.Pane attached={false} style={{ borderRadius: '0', background: 'rgba(255,255,255,0.3)', padding: '10em' }}>
        {this && this.props ?
          <Register {...this.props} />
          : null}
      </Tab.Pane> },
    ]

    return <MainWrapper>
      <Segment style={{
        minHeight: '100vh',
        margin: 'auto',
        padding: '5em',
        textAlign: 'center',
        boxShadow: 'none',
        border: 'none',
        'backgroundAttachment': 'fixed',
      }}>

        {user ?
          <Button onClick={() => this.props.history.replace('/home')}>Go to Dashboard</Button>
          :
          <Tab
            menu={{ secondary: true, pointing: true }}
            panes={panes}
            class='popup-trial'
            style={{ margin: 'auto', maxWidth: '50vw' }}
          />}


      </Segment>
    </MainWrapper>
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
})

const mapDispatchToProps = (dispatch) => {
  return {
    authenticate: (user) => dispatch({
      type: AUTHENTICATE
    }),
  }
}

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(Authentication)

export { withRedux as Authentication }
