import './Input.css'

const Input = ({ label, type = 'text', error, ...props }) => {
    return (
        <div className='input-group'>
            {label && <label className='input-label'>{label}</label>}

            <input className={`input-field ${error ? 'input-error' : ''}`}
                type={type}
                {...props}  // Spreads all other props (value, onChange, placeholder, etc.)
            />

            {error && <span className='input-error-msg'>{error}</span>}
        </div>
    )
}

export default Input