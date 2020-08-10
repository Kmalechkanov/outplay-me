const authenticate = async (url, body, onSuccess, onFailure) => {
  try {
    const promise = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const response = await promise.json()

    const authToken = response.accessToken 

    if (authToken) {
      document.cookie = `x-auth-token=${authToken}`
    }

    if (response.username && authToken 
      || response.message == 'User was registered successfully!') {
      onSuccess({
        username: response.username,
        email: response.email,
        id: response.id
      })
    } else {
      onFailure({
        message: response.message
      })
    }
  } catch (e) {
    onFailure(e)
  }
}

export default authenticate