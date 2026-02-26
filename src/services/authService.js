function wait(ms = 500) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
  
  export async function loginUser(payload) {
    await wait()
  
    const email = payload.email.trim().toLowerCase()
    const password = payload.password.trim()
  
    if (!email || !password) {
      throw new Error('E-posta ve şifre zorunludur.')
    }
  
    if (password.length < 6) {
      throw new Error('Şifre en az 6 karakter olmalıdır.')
    }
  
    return {
      success: true,
      user: {
        id: 1,
        name: 'Akif',
        email
      },
      token: 'demo-login-token'
    }
  }
  
  export async function signupUser(payload) {
    await wait()
  
    const name = payload.name.trim()
    const email = payload.email.trim().toLowerCase()
    const password = payload.password.trim()
  
    if (!name || !email || !password) {
      throw new Error('Tüm alanları doldurman gerekiyor.')
    }
  
    if (name.length < 2) {
      throw new Error('Ad Soyad en az 2 karakter olmalıdır.')
    }
  
    if (password.length < 6) {
      throw new Error('Şifre en az 6 karakter olmalıdır.')
    }
  
    return {
      success: true,
      user: {
        id: 2,
        name,
        email
      },
      token: 'demo-signup-token'
    }
  }