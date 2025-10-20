import React, { FC } from 'react'
import { Button } from 'react-bootstrap'

interface ActionButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const ActionButton: FC<ActionButtonProps> = ({ onClick, children, className }) => {
return (
  <Button 
      variant="primary" 
      className={className}
      onClick={onClick}
  >
    {children}
  </Button>
)
}

export default ActionButton;