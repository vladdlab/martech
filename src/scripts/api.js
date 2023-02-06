async function signUp({ email, password }) {
  return new Promise((resolve, reject) => {
    fetch('https://api.dating.com/identity', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    })
    .then((response) => {
      if (!response.ok) {
        reject(new Error('Network response was not OK'))
        return
      }
      const token = response.headers.get('x-token');
      if (token) localStorage.setItem('x-token', token)
      resolve(response.json());
    })
    .catch((error) => {
      console.error('There has been a problem with your fetch operation:', error);
      reject(error)
    });
  })
}


async function signIn({ email, password }) {
  return new Promise((resolve, reject) => {
    fetch('https://api.dating.com/identity', {
      method:'GET',
      headers: {
        'Authorization': 'Basic ' + btoa(`${email}:${password}`)
      }
    })
    .then(response => {
      if (!response.ok) {
        reject(new Error('Network response was not OK'))
        return
      }
      const token = response.headers.get('x-token');
      if (token) localStorage.setItem('x-token', token)
      resolve(response.json('x-token'))
    })
    .catch((error) => {
        console.error('There has been a problem with your fetch operation:', error);
        reject(error)
      });
  })
}
