import { FunctionComponent, useState } from 'react';
import { TInputProps } from './input';
import styles from './input.module.css';
import eye from '../images/eye.svg';
import eyeOff from '../images/eye-off.svg'
import Input from './input';

const EyeOff: FunctionComponent<{ onClick: () => void }> = props => (
  <img src={eyeOff} className={styles.icon} onClick={props.onClick} alt="Eye" />
);
const Eye: FunctionComponent<{ onClick: () => void }> = props => (
  <img src={eye} className={styles.icon} onClick={props.onClick} alt="Eye off" />
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