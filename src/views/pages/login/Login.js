import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CInput,
    CInputGroup,
    CInputGroupPrepend,
    CInputGroupText,
    CRow,
    CAlert
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import _fetch from './../../../communication'

const Login = (props) => {
    const history = useHistory()

    const [username, _setUsername] = useState('')
    const [password, _setPassword] = useState('')
    const [errors, _setErrors] = useState([])
    const [loginSuccess, _setLoginSuccess] = useState(false)

    const onSubmit_Login = (event) => {
        const _username = username
        const _password = password

        event.target.reset()

        _fetch(
            'POST',
            '/auth/local',
            {
                identifier: _username,
                password: _password
            }
        ).then((response) => response.json()).then((data) => {
            console.log(data)

            if (data.error) {
                data.message.forEach((v) => {
                    if (typeof v.messages.forEach == 'function') {
                        _setErrors([...errors, ...v.messages])
                    }
                })
            }
            else if (
                (typeof data.user != 'undefined') &&
                (typeof data.jwt != 'undefined')
            ) {
                _setLoginSuccess(true)
                
                props.authenticate(data.jwt, data.user)

                console.log('redirecting...')        
                history.push('/')
            }
        })

        event.preventDefault()
    }

    const setUsername = (event) => {
        _setUsername(event.target.value)
    }
    const setPassword = (event) => {
        _setPassword(event.target.value)
    }

    return (
        <div className="c-app c-default-layout c-dark-theme flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md="8">
                        <CCardGroup>
                            <CCard className="p-4">
                                <CCardBody>
                                    <CForm onSubmit={onSubmit_Login}>
                                        <h1>Login</h1>
                                        <p className="text-muted">Entre na sua conta</p>
                                        {
                                            errors.map((v) => {
                                                return (
                                                    <CAlert key={v.id} color="danger" closeButton>
                                                        {v.message}
                                                    </CAlert>
                                                )
                                            })
                                        }
                                        {
                                            loginSuccess ?
                                                <CAlert color="success" closeButton>
                                                    Usuário identificado com sucesso, você será redirecionado em alguns segundos...
                                                </CAlert> :
                                                null
                                        }
                                        <CInputGroup className="mb-3">
                                            <CInputGroupPrepend>
                                                <CInputGroupText>
                                                    <CIcon name="cil-user" />
                                                </CInputGroupText>
                                            </CInputGroupPrepend>
                                            <CInput onChange={setUsername} type="text" placeholder="Usuário" autoComplete="username" />
                                        </CInputGroup>
                                        <CInputGroup className="mb-4">
                                            <CInputGroupPrepend>
                                                <CInputGroupText>
                                                    <CIcon name="cil-lock-locked" />
                                                </CInputGroupText>
                                            </CInputGroupPrepend>
                                            <CInput onChange={setPassword} type="password" placeholder="Senha" autoComplete="current-password" />
                                        </CInputGroup>
                                        <CRow>
                                            <CCol xs="6">
                                                <CButton type="submit" color="primary" className="px-4">Login</CButton>
                                            </CCol>
                                            <CCol xs="6" className="text-right">
                                                <CButton color="link" className="px-0 text-secondary">Esqueceu a senha?</CButton>
                                            </CCol>
                                        </CRow>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                            <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                                <CCardBody className="text-center">
                                    <div>
                                        <h2>Criar uma conta</h2>
                                        <p>Se você ainda não tem uma conta crie uma e aguarde a aprovação pelo administrador</p>
                                        <Link to="/register">
                                            <CButton color="primary" className="mt-3" active tabIndex={-1}>Registre-se agora!</CButton>
                                        </Link>
                                    </div>
                                </CCardBody>
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default Login
