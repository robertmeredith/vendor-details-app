import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import store from './store'
import queryClient from './react-query/queryClient.js'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// import('preline')

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <div className="h-full border border-accent">
          <App />
        </div>
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </BrowserRouter>
)
