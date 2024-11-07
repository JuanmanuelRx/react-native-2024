/* eslint-disable react/prop-types */
export const SquareReact = ({ children, isSelected, updateBoard, index }) => {
    const className = `square ${isSelected?'is-selected' : ''}`
    const handleClick = () => {updateBoard(index)}
    return (
      <button
        className={className}
        onClick={handleClick}
      >
        {children}
      </button>
    )
  }