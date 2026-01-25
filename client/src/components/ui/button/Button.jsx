import './Button.css'

const Button = ({ children, isLoading, variant = "primary", ...props }) => {
    return (
        <button
            className={`btn btn-${variant} ${isLoading ? 'btn-loading' : ''}`}
            disabled={isLoading}
            {...props}
        >
            {isLoading ? <span className='spinner'></span> : children}
        </button>
    )
}

export default Button