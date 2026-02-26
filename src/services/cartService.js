function wait(ms = 120) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
  
  let serverCart = []
  
  export async function fetchCart() {
    await wait()
    return [...serverCart]
  }
  
  export async function addCartItem(product) {
    await wait()
  
    const existing = serverCart.find((item) => item.id === product.id)
  
    if (existing) {
      existing.quantity += 1
    } else {
      serverCart.push({
        ...product,
        quantity: 1
      })
    }
  
    return [...serverCart]
  }
  
  export async function removeCartItem(productId) {
    await wait()
  
    serverCart = serverCart.filter((item) => item.id !== productId)
  
    return [...serverCart]
  }
  
  export async function clearCartItems() {
    await wait()
  
    serverCart = []
  
    return [...serverCart]
  }