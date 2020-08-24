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
import ChartBarSimple from '../charts/ChartBarSimple'
import _fetch from '../../communication'

const WidgetsDropdown = (props) => {
    const [clientes, _setClientes] = useState(100)

    useEffect(() => {
        console.log(`JWT => ${props.jwt}`)
        _fetch(
            'GET',
            '/bots',
            {},
            props.jwt
        ).then(response => response.json()).then(data => {
            console.log(data)
            _setClientes(data.length)
        })
    }, [])

    const onClick_MaisInformacoes = (event) => {
        let _clientes = clientes
        _setClientes(clientes + 1)
    }

    //const

    return (
        <CRow>
            <CCol sm="12" lg="12">
                <CJumbotron>
                    <h1 className="display-3">Crime Boss 2.0</h1>
                    <p className="lead">Nova versão do Crime Boss foi iniciada no ano de 2020 com olhos em novos horizontes</p>
                    <p>Em breve um painel diferenciado</p>
                    <CButton onClick={onClick_MaisInformacoes} color="primary" href="#" target="_blank">Mais informações</CButton>
                </CJumbotron>
            </CCol>

            <CCol sm="6" lg="3">
                <CWidgetDropdown
                    color="gradient-primary"
                    header={clientes.toString()}
                    text="Clientes cadastrados"
                    footerSlot={
                        <ChartLineSimple
                            pointed
                            className="c-chart-wrapper mt-3 mx-3"
                            style={{ height: '70px' }}
                            dataPoints={[65, 59, 84, 84, 51, 55, 40]}
                            pointHoverBackgroundColor="primary"
                            label="Members"
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

            <CCol sm="6" lg="3">
                <CWidgetDropdown
                    color="gradient-info"
                    header="9.823"
                    text="Members online"
                    footerSlot={
                        <ChartLineSimple
                            pointed
                            className="mt-3 mx-3"
                            style={{ height: '70px' }}
                            dataPoints={[1, 18, 9, 17, 34, 22, 11]}
                            pointHoverBackgroundColor="info"
                            options={{ elements: { line: { tension: 0.00001 } } }}
                            label="Members"
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

            <CCol sm="6" lg="3">
                <CWidgetDropdown
                    color="gradient-warning"
                    header="9.823"
                    text="Members online"
                    footerSlot={
                        <ChartLineSimple
                            className="mt-3"
                            style={{ height: '70px' }}
                            backgroundColor="rgba(255,255,255,.2)"
                            dataPoints={[78, 81, 80, 45, 34, 12, 40]}
                            options={{ elements: { line: { borderWidth: 2.5 } } }}
                            pointHoverBackgroundColor="warning"
                            label="Members"
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

            <CCol sm="6" lg="3">
                <CWidgetDropdown
                    color="gradient-danger"
                    header="9.823"
                    text="Members online"
                    footerSlot={
                        <ChartBarSimple
                            className="mt-3 mx-3"
                            style={{ height: '70px' }}
                            backgroundColor="rgb(250, 152, 152)"
                            label="Members"
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