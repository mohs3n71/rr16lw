import React from 'react'
import {render} from 'react-dom'
import {Provider as StoreProvider} from 'react-redux'
import {Router, Switch, Route, Redirect} from 'react-router'
import {createBrowserHistory} from 'history'
import {setLocale} from './utils/moments'

import {IntlProvider} from 'react-intl'
import head from 'lodash/head'
import {create} from 'jss'
import rtl from 'jss-rtl'
import {StylesProvider, jssPreset} from '@material-ui/core/styles'

import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles'

import toLower from 'lodash/toLower'

import initiateStore from './store'

import Dashboard from '../src/routes/Dashboard'

const history = createBrowserHistory()
const store = initiateStore(window.__INITIAL_STATE__, history)

let locale

switch(navigator.language) {
  case 'en-US':
    locale = {
      code: navigator.language
    }
    break
  default:
    locale = {
      code: 'fa-IR'
    }
}

const theme = createMuiTheme({
  direction: 'rtl' // Both here and <body dir="rtl">
})

// Configure JSS
const jss = create({plugins: [...jssPreset().plugins, rtl()]})

setLocale(toLower(locale.code))
head(document.getElementsByTagName('html')).setAttribute('lang', locale.code)

render(
  <StoreProvider store={store}>
    <IntlProvider locale={locale.code} messages={locale.messages}>
      <ThemeProvider theme={theme}>
        <StylesProvider jss={jss}>
          <Router history={history}>
            <Switch>
              <Redirect exact={true} from='/' to='/dashboard'/>
              <Route path='/dashboard' component={Dashboard}/>
            </Switch>
          </Router>
        </StylesProvider>
      </ThemeProvider>
    </IntlProvider>
  </StoreProvider>,
  document.getElementById('content')
)
