const API_URL = '';

export const refreshToken = async (user) => {
  const { username, password } = user;
  try {
      const responseUser = await fetch(`${API_URL}/login`, {
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