import React from 'react'
import {render} from 'react-dom'
import {Provider as StoreProvider} from 'react-redux'
import {Router, Switch, Route} from 'react-router'
import {createBrowserHistory} from 'history'
import {setLocale} from './utils/moments'

import {IntlProvider} from 'react-intl'
import head from 'lodash/head'
import {ConfigProvider} from 'antd'
import enUSLocaleProvider from 'antd/lib/locale-provider/en_US'
import faLocaleProvider from 'antd/lib/locale-provider/fa_IR'

import {ThemeProvider} from 'styled-components'
import 'antd/dist/antd.less'

import toLower from 'lodash/toLower'

import initiateStore from './store'

const history = createBrowserHistory()
const store = initiateStore(window.__INITIAL_STATE__, history)

let locale

switch (navigator.language) {
    case 'en-US':
        locale = {
            code: navigator.language,
            antd: enUSLocaleProvider
        }
        break
    default:
        locale = {
            code: 'fa-IR',
            antd: faLocaleProvider
        }
}

setLocale(toLower(locale.code))
head(document.getElementsByTagName('html')).setAttribute('lang', locale.code)


render(
    <StoreProvider store={store}>
        <IntlProvider locale={locale.code} messages={locale.messages}>
            <ConfigProvider locale={locale.antd}>
                <ThemeProvider theme={process.env.THEME}>
                    <Router history={history}>
                        <Switch>

                        </Switch>
                    </Router>
                </ThemeProvider>
            </ConfigProvider>
        </IntlProvider>
    </StoreProvider>,
    document.getElementById('content')
)
