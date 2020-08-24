import React, { Component } from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import './scss/style.scss'

const loading = (
    <div className="pt-3 text-center">
        <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

class App extends Component {
    constructor(props) {
        super(props)

        const jwt = localStorage.getItem('jwt')

        this.state = {
            authJwt: jwt ? jwt : false
        }

        console.log('constructor called')
    }

    authenticate(jwt, user) {
        console.log(`JWT: ${jwt}`)
        console.log(user)

        localStorage.setItem('jwt', jwt)

        this.setState({authJwt: jwt})
    }

    onLogout() {
        localStorage.setItem('jwt', false)
        this.setState({authJwt: false})
    }

    render() {
        console.log('render called')
        console.log(this.state)
        return (
            <HashRouter>
                <React.Suspense fallback={loading}>
                    {
                        this.state.authJwt ?
                            <Route path="/" name="Home" render={props => <TheLayout jwt={this.state.authJwt} onLogout={() => this.onLogout()} {...props} />} />
                        :
                        <Switch>
                            <Route exact path="/login" name="Login Page" render={props => <Login authenticate={(jwt, user) => this.authenticate(jwt, user)} {...props} />} />
                            <Route exact path="/register" name="Register Page" render={props => <Register {...props} />} />
                            <Route exact path="/404" name="Page 404" render={props => <Page404 {...props} />} />
                            <Route exact path="/500" name="Page 500" render={props => <Page500 {...props} />} />
                            <Redirect from="/*" to="/login" />
                        </Switch>
                    }
                </React.Suspense>
            </HashRouter>
        );
    }
}

export default App;
