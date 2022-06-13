import { FunctionComponent, useState } from 'react';
import { TInputProps } from './input';
import { ShowIcon, HideIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Input from './input';

const EyeOff: FunctionComponent<{ onIconClick: () => void }> = props => (
  <HideIcon type="primary" onClick={props.onIconClick} />
);
const Eye: FunctionComponent<{ onIconClick: () => void }> = props => (
  <ShowIcon type="primary" onClick={props.onIconClick} />
);

const PasswordInput: FunctionComponent<TInputProps> = ({type, ...props}) => {

  const [isVisible, setVisible] = useState(false); 

  return (
    <Input 
      {...props}
      type={isVisible ? 'text' : 'password'}
      icon={isVisible ? EyeOff : Eye}
      onIconClick={() => setVisible(!isVisible)}
      required={false}
    />
  )
}

export default PasswordInput;