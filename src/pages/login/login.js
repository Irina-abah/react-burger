import UserEntry from "../user-entry/user-entry";

function Login() {

  const handleSubmit = () => {

  }
  
  return (
    <section>
      <UserEntry
        title="Вход"
        onSubmit={handleSubmit}
        buttonName="Войти"
        message="Вы — новый пользователь?" 
        link="/register" 
        linkName="Зарегистрироваться"
      >

      </UserEntry>
    </section>
  )
}

export default Login;