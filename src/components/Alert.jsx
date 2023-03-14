import { useEffect } from 'react';

const Alert = ({ alert, removeAlert }) => {
    useEffect(() => {
        const timeout = setTimeout(() => {
            removeAlert()
        }, 3000)
        return () => clearTimeout(timeout)
    }, [])

    return (
    <p className={`alert alert-${alert.type}`}>
        {alert.msg}
    </p>
    )
}

export default Alert