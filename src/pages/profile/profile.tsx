import { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import profileStyles from "./profile.module.css";
import ProfileMenu from '../profile-menu/profile-menu';
import { Input, PasswordInput, EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from '../../utils/hooks';
import { patchUser } from '../../services/actions/patch-user';
import { TUserMain } from '../../utils/types';

function Profile() {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.getUser.user);
  const isSuccess = useSelector((state) => state.patchUser.isSuccess);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [state, setState] = useState<TUserMain>({} as TUserMain);

  useEffect(() => {
    setState(user)
  }, [])

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isEdit) {
      dispatch(patchUser(state))
    }
  }
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const name = e.target.name;
  
      setState({
        ...state,
        [name]: value
      })
      setIsEdit(true)
    }

  const onReset = (e: FormEvent) => {
    e.preventDefault()
    setState({
      ...state,
      name: user.name,
      email: user.email,
      password: ""
    })
  }
  


  return (
    <section className={`${profileStyles.profile} pt-10`}>
      <ProfileMenu />
      <form className={`${profileStyles.inputs} mt-20`} onSubmit={onSubmit}>
        <div className={`mb-6`}>
          <Input 
            onChange={handleInputChange} 
            value={state.name} 
            name={'name'}
            placeholder={'Имя'}
            // required
          />
        </div>
        <div className={`mb-6`}>
          <EmailInput 
            onChange={handleInputChange} 
            value={state.email} 
            name={'email'}
            // required
          />
        </div> 
        <div className={`mb-6`}>
          <PasswordInput 
            onChange={handleInputChange} 
            value={state.password || ""} 
            name={'password'}
          />
        </div>
        {isSuccess && <p>Данные успешно обновлены</p>}
        <div className={isEdit ? profileStyles.buttons : profileStyles.invisible}>
          <Button type="secondary" size="medium" onClick={onReset}>
            Отмена
          </Button>
          <Button type="primary" size="medium">
            Сохранить
          </Button>
        </div>
      </form>
      <p className={`${profileStyles.text} text_type_main-default text_color_inactive`} >
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </section>
  )
}

export default Profile;