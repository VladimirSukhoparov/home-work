import StoreModule from "../module";

/**
 * Авторизация
 */
class LoginState extends StoreModule {
  initState() {
    return {
      token: localStorage.getItem('token') || "",
      error: "",
      waiting: false, // признак ожидания загрузки
    };
  }




  async sign(login, password) {
    try {

      const response = await fetch(`/api/v1/users/sign`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login: login,
          password: password,
        }),
      });

      if (response.ok) {
        const { result } = await response.json();
        localStorage.setItem("token", result.token);
        this.setState(
          {
            token:  result.token,
            waiting: false,
            error: "",
          },
          "Авторизация прошла успешно"
        );
      } else {
        const { error } = await response.json();
        this.setState(
          {
            waiting: false,
            error: error.data.issues.map(error => error.message),
          },
          "Авторизация не удалась"
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  async logOut() {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`/api/v1/users/sign`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-Token": token,
        },
      });
      if (response.ok) {
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        this.setState(
          {
            token: "",
            waiting: false,
            error: "",
          },

          "Деавторизация прошла успешно"
        );
      } else {
        const { error } = await response.json();
        this.setState(
          {
            waiting: false,
            error: error.data.issues[0].message,
          },
          "Деавторизация не удалась"
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
  clearError(){
    this.setState(
      {...this.getState(),
        waiting: false,
        error: '',
      }
    );
  }
}



export default LoginState;
