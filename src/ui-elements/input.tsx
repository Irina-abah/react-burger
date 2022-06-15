import styles from './input.module.css';
import React, { FunctionComponent } from 'react';

export type TInputProps = {
  onIconClick?: () => void;
  icon?: React.ElementType;
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input: FunctionComponent<TInputProps> = ({
  icon: Icon,
  onIconClick,
  value,
  label,
  onChange,
  name,
  type,
  ...props
}) => {
  const icon = Icon ? <Icon onClick={onIconClick} /> : null;
  return (
    <div className={styles.input_container}>
      <label className={`${styles.input_placeholder} noselect text text_type_main-default`}>{label}</label>
      <input
        className={`${styles.input} pr-6 pl-6 text text_type_main-default`} 
        name={name} 
        type={type}
        value={value || ""}
        onChange={onChange}
        {...props}
      />
      {icon}
    </div>
  );
};

export default Input;