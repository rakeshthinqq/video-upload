// @flow
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
// Types Validation
import PropTypes from 'prop-types'
import { Segment, Dimmer, Loader } from 'semantic-ui-react'

type Props = {
  children: void
};
type State = {
  loadingToken: boolean
};

class MainWrapper extends Component<Props, State> {
  constructor(props: { children: void }) {
    super(props)

    this.state = {
      loadingToken: false
    }
  }

  // componentDidMount() {
  //   setTimeout(()=> {
  //     if (this) {
  //       this.setState({
  //         loadingToken: false
  //       })
  //     }
  //   }, 300)
  // }


  render() {

    const {
      children
    } = this.props

    const {
      loadingToken
    } = this.state

    return (
      <Fragment>
        {loadingToken ?
          <Segment style={{
            height: '100vh',
            top: '0px !important',
            position: 'absolute',
            width: '100vw',
            borderRadius: '0px',
            border: 'none'
          }}>
            <Dimmer active={loadingToken}>
              <Loader content='Loading' />
            </Dimmer>
          </Segment>
          :
          <div className='container' {...this.props}>
            {children}
          </div>
        }
      </Fragment>
    )
  }
}

MainWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.object,
    PropTypes.any
  ])
}

const mapStateToProps = (state: { user: { email: string } }) => ({
  user: state.auth.user
})

const withRedux = connect(
  mapStateToProps,
  null
)(MainWrapper)

export { withRedux as MainWrapper }
