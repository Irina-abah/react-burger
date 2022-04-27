import { Link } from "react-router-dom";
import userStyles from "./user-entry.module.css";
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

function UserEntry({title, onSubmit, children, buttonName, message, link, linkName}) {

  return (
    <form 
      className={userStyles.form} 
      name="user-entry" 
      onSubmit={onSubmit}>
        <h1 className={`${userStyles.title} text text_type_main-large`}>{title}</h1>
        <div className={userStyles.container}>
          {children}
        </div>
        <Button type="primary" size="large">
          {buttonName}
        </Button>
        <p className={`text text_type_main-default text_color_inactive`}>
        {message} 
        <Link to={link} className={`text text_type_main-default`}>
          {linkName}
        </Link>
      </p>
    </form>
  )
};

export default UserEntry;