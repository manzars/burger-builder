import React from 'react'
import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Aux'

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends React.Component {

        state = {
            error: null
        }

        componentDidMount() {

            this.reqInter = axios.interceptors.request.use(request => {
                this.setState(
                    { error: null }
                )

                return request
            })
            this.resInter = axios.interceptors.response.use(response => {
                return response
            },
            error => {
                this.setState(
                    { error: error }
                )
            })
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInter)
            axios.interceptors.response.eject(this.resInter)
        }

        clearScreen = () => {
            this.setState(
                { error: null }
            )
        }

        render() {
            return(
                <Aux>
                    <Modal show = {this.state.error} modalClosed = {this.clearScreen}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            )
        }
        
    }
}

export default withErrorHandler