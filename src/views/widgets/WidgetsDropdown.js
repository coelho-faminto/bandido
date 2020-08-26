import React, { useState, useEffect } from 'react'
import {
    CWidgetDropdown,
    CRow,
    CCol,
    CDropdown,
    CDropdownMenu,
    CDropdownItem,
    CDropdownToggle,
    CJumbotron,
    CButton
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import ChartLineSimple from '../charts/ChartLineSimple'
import { _apiRequest } from '../../communication'

const WidgetsDropdown = (props) => {
    const [clientes, _setClientes] = useState(false)
    const [logins, _setLogins] = useState(false)
    const [urls, _setUrls] = useState(false)

    const [online_clientes, _setOnlineClientes] = useState(false)
    const [dead_clientes, _setDeadClientes] = useState(false)
    const [lastcreated_clientes, _setLastCreatedClientes] = useState([])
    const [lastcreated_logins, _setLastCreatedLogins] = useState([])
    const [lastcreated_urls, _setLastCreatedUrls] = useState([])

    useEffect(() => {
        console.log(`JWT => ${props.jwt}`)
        _apiRequest('getClientsCount', {}, props.jwt).then((response) => {
            console.log(response)
            _setClientes(response[0].count)
        }).catch((e) => {
            console.log(e)
        })

        _apiRequest('getLoginsCount', {}, props.jwt).then((response) => {
            console.log(response)
            _setLogins(response[0].count)
        }).catch((e) => {
            console.log(e)
        })

        _apiRequest('getUrlsCount', {}, props.jwt).then((response) => {
            console.log(response)
            _setUrls(response[0].count)
        }).catch((e) => {
            console.log(e)
        })

        _apiRequest('getOnlineClients', { time: 10 }, props.jwt).then((response) => {
            console.log(response)
            _setOnlineClientes(response[0].count)
        }).catch((e) => {
            console.log(e)
        })

        _apiRequest('getDeadClients', { time: 7 }, props.jwt).then((response) => {
            console.log(response)
            _setDeadClientes(response[0].count)
        }).catch((e) => {
            console.log(e)
        })

        _apiRequest('getClientsCreatedLast7Days', { time: 7 }, props.jwt).then((response) => {
            console.log(response)
            const last = [
                response[0].d6,
                response[0].d5,
                response[0].d4,
                response[0].d3,
                response[0].d2,
                response[0].d1,
                response[0].d0,
            ]
            _setLastCreatedClientes(last)
        }).catch((e) => {
            console.log(e)
        })

        _apiRequest('getLoginsCreatedLast7Days', { time: 7 }, props.jwt).then((response) => {
            console.log(response)
            const last = [
                response[0].d6,
                response[0].d5,
                response[0].d4,
                response[0].d3,
                response[0].d2,
                response[0].d1,
                response[0].d0,
            ]
            _setLastCreatedLogins(last)
        }).catch((e) => {
            console.log(e)
        })

        _apiRequest('getUrlsCreatedLast7Days', { time: 7 }, props.jwt).then((response) => {
            console.log(response)
            const last = [
                response[0].d6,
                response[0].d5,
                response[0].d4,
                response[0].d3,
                response[0].d2,
                response[0].d1,
                response[0].d0,
            ]
            _setLastCreatedUrls(last)
        }).catch((e) => {
            console.log(e)
        })
    }, [props.jwt])

    const onClick_MaisInformacoes = (event) => {
        console.log('mais informações')
    }

    /*
            <CCol sm="12" lg="12">
                <CJumbotron>
                    <h1 className="display-3">EVOLVED-THIEF</h1>
                    <p className="lead">Novos trabalhos foram iniciados no ano de 2020 com olhos em novos horizontes</p>
                    <p>Painel em construção...</p>
                    <CButton onClick={onClick_MaisInformacoes} color="primary" href="#" target="_blank">Mais informações</CButton>
                </CJumbotron>
            </CCol>
    */

    return (
        <CRow>
            <CCol sm="6" lg="6">
                <CWidgetDropdown
                    color="gradient-primary"
                    header={clientes === false ? 'carregando...' : `${clientes}`}
                    text="Clientes cadastrados"
                    footerSlot={
                        <ChartLineSimple
                            pointed
                            className="c-chart-wrapper mt-3 mx-3"
                            style={{ height: '70px' }}
                            dataPoints={lastcreated_clientes}
                            options={{ elements: { line: { borderWidth: 2.5 } } }}
                            pointHoverBackgroundColor="primary"
                            label="Clientes"
                            labels="months"
                        />
                    }
                >
                    <CDropdown>
                        <CDropdownToggle color="transparent">
                            <CIcon name="cil-settings" />
                        </CDropdownToggle>
                        <CDropdownMenu className="pt-0" placement="bottom-end">
                            <CDropdownItem>Action</CDropdownItem>
                            <CDropdownItem>Another action</CDropdownItem>
                            <CDropdownItem>Something else here...</CDropdownItem>
                            <CDropdownItem disabled>Disabled action</CDropdownItem>
                        </CDropdownMenu>
                    </CDropdown>
                </CWidgetDropdown>
            </CCol>

            <CCol sm="6" lg="6">
                <CWidgetDropdown
                    color="gradient-info"
                    header={online_clientes === false ? 'carregando...' : `${online_clientes}`}
                    text="Clientes online"
                    footerSlot={
                        <ChartLineSimple
                            pointed
                            className="mt-3 mx-3"
                            style={{ height: '70px' }}
                            dataPoints={[
                                1, 18, 9, 17, 34, 22,
                                11, 88, 10, 66, 6, 10,
                                1, 18, 9, 17, 34, 22,
                                11, 88, 10, 66, 6, 10,
                                1, 18, 9, 17, 34, 22,
                                11, 50, 10, 50, 6
                            ]}
                            pointHoverBackgroundColor="info"
                            options={{ elements: { line: { borderWidth: 2.5 } } }}
                            label="Clientes"
                            labels="months"
                        />
                    }
                >
                    <CDropdown>
                        <CDropdownToggle caret={false} color="transparent">
                            <CIcon name="cil-location-pin" />
                        </CDropdownToggle>
                        <CDropdownMenu className="pt-0" placement="bottom-end">
                            <CDropdownItem>Action</CDropdownItem>
                            <CDropdownItem>Another action</CDropdownItem>
                            <CDropdownItem>Something else here...</CDropdownItem>
                            <CDropdownItem disabled>Disabled action</CDropdownItem>
                        </CDropdownMenu>
                    </CDropdown>
                </CWidgetDropdown>
            </CCol>

            <CCol sm="6" lg="4">
                <CWidgetDropdown
                    color="gradient-warning"
                    header={logins === false ? 'carregando...' : `${logins}`}
                    text="Logins capturados"
                    footerSlot={
                        <ChartLineSimple
                            pointed
                            className="mt-3"
                            style={{ height: '70px' }}
                            dataPoints={lastcreated_logins}
                            options={{ elements: { line: { borderWidth: 2.5 } } }}
                            pointHoverBackgroundColor="warning"
                            label="Logins"
                            labels="months"
                        />
                    }
                >
                    <CDropdown>
                        <CDropdownToggle color="transparent">
                            <CIcon name="cil-settings" />
                        </CDropdownToggle>
                        <CDropdownMenu className="pt-0" placement="bottom-end">
                            <CDropdownItem>Action</CDropdownItem>
                            <CDropdownItem>Another action</CDropdownItem>
                            <CDropdownItem>Something else here...</CDropdownItem>
                            <CDropdownItem disabled>Disabled action</CDropdownItem>
                        </CDropdownMenu>
                    </CDropdown>
                </CWidgetDropdown>
            </CCol>

            <CCol sm="6" lg="4">
                <CWidgetDropdown
                    color="gradient-success"
                    header={urls === false ? 'carregando...' : `${urls}`}
                    text="URLs recebidas"
                    footerSlot={
                        <ChartLineSimple
                            pointed
                            className="mt-3"
                            style={{ height: '70px' }}
                            dataPoints={lastcreated_urls}
                            options={{ elements: { line: { borderWidth: 2.5 } } }}
                            pointHoverBackgroundColor="success"
                            label="URLs"
                            labels="months"
                        />
                    }
                >
                    <CDropdown>
                        <CDropdownToggle color="transparent">
                            <CIcon name="cil-settings" />
                        </CDropdownToggle>
                        <CDropdownMenu className="pt-0" placement="bottom-end">
                            <CDropdownItem>Action</CDropdownItem>
                            <CDropdownItem>Another action</CDropdownItem>
                            <CDropdownItem>Something else here...</CDropdownItem>
                            <CDropdownItem disabled>Disabled action</CDropdownItem>
                        </CDropdownMenu>
                    </CDropdown>
                </CWidgetDropdown>
            </CCol>

            <CCol sm="6" lg="4">
                <CWidgetDropdown
                    color="gradient-danger"
                    header={dead_clientes === false ? 'carregando...' : `${dead_clientes}`}
                    text="Clientes perdidos"
                    footerSlot={
                        <ChartLineSimple
                            pointed
                            className="mt-3 mx-3"
                            style={{ height: '70px' }}
                            dataPoints={[10, 20, 30, 40, 50, 60, 70]}
                            options={{ elements: { line: { borderWidth: 2.5 } } }}
                            pointHoverBackgroundColor="danger"
                            label="Clientes"
                            labels="months"
                        />
                    }
                >
                    <CDropdown>
                        <CDropdownToggle caret className="text-white" color="transparent">
                            <CIcon name="cil-settings" />
                        </CDropdownToggle>
                        <CDropdownMenu className="pt-0" placement="bottom-end">
                            <CDropdownItem>Action</CDropdownItem>
                            <CDropdownItem>Another action</CDropdownItem>
                            <CDropdownItem>Something else here...</CDropdownItem>
                            <CDropdownItem disabled>Disabled action</CDropdownItem>
                        </CDropdownMenu>
                    </CDropdown>
                </CWidgetDropdown>
            </CCol>
        </CRow>
    )
}

export default WidgetsDropdown
