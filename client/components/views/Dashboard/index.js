// @flow
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
// Local components
import {
  MainWrapper
} from '~/components'

import {
  LOGOUT
} from '~/store/constants'

import {
  Segment,
  Button,
  List,
  Header,
  Modal,
  Divider,
  Statistic,
  Embed
} from 'semantic-ui-react'

import { type PlanType, type Props, type State } from './types'

class Dashboard extends Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      insurances: [],
      creatingInsurance: false
    }
  }

  componentDidMount = () => {
    const {
      user
    } = this.props

    if (!user) {
      this.props.history.replace('/')
    }
  }

  showCreateInsuranceModal = () => {
    this.setState({ creatingInsurance: true })
  }

  hideCreateInsuranceModal = () => {
    this.setState({ creatingInsurance: false })
  }


  render = () => {
    const {
      creatingInsurance,
      insurances
    } = this.state

    const {
      user
    } = this.props

    // Will sum all yearly insurances
    const sumYearly = insurances.reduce((prevVal, el) => {
      return prevVal + el.insuranceYearly
    }, 0)

    return <MainWrapper>
      <Fragment>
        <Segment style={{ borderRadius: '0' }}>
          <h1 className='logo' onClick={ () => this.props.history.replace('/') }>My videos</h1>

          User email : {user ? user.email : null}
          &nbsp; <Button icon='sign out' onClick={()=> {
            const {
              logout,
              history
            } = this.props

            new Promise((resolve) => {
              resolve(logout())
            }).then(
              history.replace('/')
            )

          }} />
          <br />
            <Embed
              icon='right circle arrow'
              placeholder='/public/thumb.png '
              url='http://res.cloudinary.com/dl7yeqhcy/video/upload/v1521137067/videoplayback_ishctt.mp4'
            />
          <br />
          <Divider />
        </Segment>
      </Fragment>
    </MainWrapper>
  }
}

const mapStateToProps = (state: { user: any }) => ({
  user: state.auth.user
})

const mapDispatchToProps = (dispatch: { logout: Function }) => {
  return {
    logout: () => dispatch({
      type: LOGOUT
    }),
  }
}

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)

export { withRedux as Dashboard }
