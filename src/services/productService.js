function mapProduct(item) {
    return {
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.thumbnail || item.images?.[0] || 'https://placehold.co/400x300'
    }
  }
  
  export async function fetchHomeProducts() {
    const res = await fetch('https://dummyjson.com/products?limit=20')
  
    if (!res.ok) {
      throw new Error('Ürünler alınamadı')
    }
  
    const data = await res.json()
    const mapped = data.products.map(mapProduct)
  
    return {
      featured: mapped.slice(0, 8),
      grid: mapped.slice(8, 12),
      newest: mapped.slice(12, 20)
    }
  }
  
  export async function fetchProducts(limit = 24) {
    const res = await fetch(`https://dummyjson.com/products?limit=${limit}`)
  
    if (!res.ok) {
      throw new Error('Ürün listesi alınamadı')
    }
  
    const data = await res.json()
  
    return data.products.map(mapProduct)
  }