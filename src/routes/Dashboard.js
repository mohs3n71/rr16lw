import React, {PureComponent, Fragment} from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'

import Header from '../components/Header'

class Dashboard extends PureComponent {

  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {

    return (
      <Fragment>
        <CssBaseline/>
        <Header/>
      </Fragment>
    )
  }

}

export default Dashboard