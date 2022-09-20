import PropType from 'prop-types'

const Button = ({ color, text, onClick }) => {

  return(
      <button 
            onClick={onClick}
            style={{ backgroundColor: color}} 
            className='btn'>
            { text }
      </button>
  ) 
}

Button.defaultProps = {
      color: 'steelblue'
}

Button.PropType = {
      text: PropType.string,
      color: PropType.string,
      onClick: PropType.func,
}

export default Button