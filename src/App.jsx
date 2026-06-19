import { useState, useEffect } from 'react'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products')
        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }
        const data = await response.json()
        setProducts(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <>
      <header className="app-header">
        <div className="logo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="url(#grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          Nexus Store
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', fontWeight: 500 }}>
          <span style={{ cursor: 'pointer', color: 'var(--text-secondary)', transition: 'color 0.2s' }} onMouseEnter={(e)=>e.target.style.color='#fff'} onMouseLeave={(e)=>e.target.style.color='var(--text-secondary)'}>Home</span>
          <span style={{ cursor: 'pointer', color: 'var(--text-secondary)', transition: 'color 0.2s' }} onMouseEnter={(e)=>e.target.style.color='#fff'} onMouseLeave={(e)=>e.target.style.color='var(--text-secondary)'}>Categories</span>
        </div>
      </header>

      <main className="main-content">
        <section className="hero">
          <h1>Discover Premium Goods</h1>
          <p>Explore our curated collection of high-quality products sourced globally just for you. Beautiful design meets everyday utility.</p>
        </section>

        {loading && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p className="loading-text">Summoning amazing products...</p>
          </div>
        )}

        {error && (
          <div style={{ textAlign: 'center', color: 'var(--danger-color)', padding: '2rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '12px' }}>
            <h3>Oops! Something went wrong</h3>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="product-grid">
            {products.map((product, index) => (
              <div 
                className="product-card" 
                key={product.id}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="product-image-container">
                  <span className="category-badge">{product.category}</span>
                  <img src={product.image} alt={product.title} className="product-image" loading="lazy" />
                </div>
                
                <div className="product-info">
                  <h3 className="product-title" title={product.title}>{product.title}</h3>
                  
                  <div className="product-rating">
                    <span>{'★'.repeat(Math.round(product.rating.rate))}</span>
                    <span style={{ color: 'var(--surface-hover)' }}>{'★'.repeat(5 - Math.round(product.rating.rate))}</span>
                    <span className="rating-count">({product.rating.count} reviews)</span>
                  </div>

                  <div className="product-footer">
                    <span className="product-price">${product.price.toFixed(2)}</span>
                    <button className="add-to-cart">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                      </svg>
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  )
}

export default App
