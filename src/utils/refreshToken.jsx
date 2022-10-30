const API_URL = 'http://127.0.0.1:8000/';

export const refreshToken = async (user) => {
  const { username, password } = user;
  try {
      const responseUser = await fetch(`${API_URL}/api/login`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
      });

      return responseUser;          
  } catch (error) {
      console.log(error)
  }
}