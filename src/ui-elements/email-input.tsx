import { FunctionComponent, useState } from 'react';
import { TInputProps } from './input';
import Input from './input';
import edit from '../images/edit.svg';
import styles from './input.module.css';

const Edit: FunctionComponent<{ onClick: () => void }> = props => (
  <img src={edit} className={styles.icon} onClick={props.onClick} alt="edit" />
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