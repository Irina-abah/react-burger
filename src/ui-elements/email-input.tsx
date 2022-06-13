import { FunctionComponent, useState } from 'react';
import { TInputProps } from './input';
import { EditIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Input from './input';

const Edit: FunctionComponent<{ onIconClick: () => void }> = props => (
  <EditIcon type="primary" onClick={props.onIconClick} />
);

const EmailInput: FunctionComponent<TInputProps> = ({type, ...props}) => {

  const [disabled, setDisabled] = useState(true); 

  return (
    <Input 
      {...props}
      type={'email'}
      icon={Edit}
      onIconClick={() => setDisabled(false)}
      disabled={disabled}
    />
  )
}

export default EmailInput;