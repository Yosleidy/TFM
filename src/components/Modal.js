import React, { Component } from 'react';

import Portal from './Portal';





class Modal extends Component {


    render() {
        const { children, toggle, active } = this.props;
        return (
            <Portal>
                {active && (

                    <div style={styles.wrapper}>
                        <div style={styles.window}>
                            <buttom style={styles.closedBtn} onClick={toggle}>X</buttom>
                            <div style={{margin: '35px 0 0'}}> {children}  </div>
                        </div>
                    </div>
                )
                }
            </Portal>
        )

    }


}

export default Modal;

const styles = {
    wrapper: {
        position: 'absolute',
        top: '30%',
        left: '30%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: 455,
    },
    window: {
        position: 'relative',
        background: '#fff',
        borderRadius: 5,
        padding: 15,
        boxShadow: '2px 2px 10px rgba(0,0,0,0.3)',
        zIndex: 10,
        minWidth: 300,

    },
    closedBtn: {
        position: 'relative',
        top: 0,
        float: 'right',
        color: 'blue',
        fontSize: 20,
    }

};