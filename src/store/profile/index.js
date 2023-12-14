import StoreModule from "../module";


/**
 * Авторизация
 */
class ProfileState extends StoreModule {
  initState() {
    return {
      userName: localStorage.getItem("userName") || "",
      userPhone: "",
      userMail: "",
      error: "",
      root:false,
      waiting: true, // признак ожидания загрузки
    };
  }



  async getProfile() {
    const token = localStorage.getItem('token');
    if(token){
    try {
      const response = await fetch(`/api/v1/users/self`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Token": token,
        },
      });
      if (response.ok) {
        const { result } = await response.json();
        this.setState(
          {
            userName: result.profile.name,
            userPhone: result.profile.phone,
            userMail: result.email,
            waiting: false,
            root:true,
          },
          "Загружена информация о пользователе"
        );
        localStorage.setItem("userName", result.profile.name);
      }
    } catch (error) {
      console.log(error);
    }
  }
  }

  async logOut() {
    this.setState({
      userName: "",
      userPhone: "",
      userMail: "",
      error: "",
      waiting: true,
      root:false,
    });
    localStorage.removeItem("userName");
  }
}

export default ProfileState;
