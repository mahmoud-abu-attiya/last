import { useState, forwardRef, useImperativeHandle } from 'react'

const Snackbar = forwardRef(({ message, type }, ref) => {
  const [showSnackbar, setShowSnackbar] = useState(false)
  useImperativeHandle(ref, () => ({
    show() {
      setShowSnackbar(true)
      setTimeout(() => {
        setShowSnackbar(false)
      }, 3000)
    },
  }))
  return (
    <div
      className={`fixed left-1/2 -translate-y-1/2 -translate-x-1/2 rounded-3xl flex items-center gap-4 px-6 py-2 z-10 transition duration-500 ${
        showSnackbar ? "bottom-[3%]" : "bottom-[-50%]"
      }`}
      style={{
        backgroundColor: type === 'success' ? '#00f593' : '#ff0033',
        color: type === 'success' ? '#333' : 'white',
      }}
    >
      <span className="text-4xl flex items-center justify-center">
        {type === 'success' ? <i className="far fa-check"></i> : <i className="far fa-comment-alt-exclamation"></i>}
      </span>
      <p className="bold">{message}</p>
    </div>
  )
})
Snackbar.displayName = 'Snackbar'
export default Snackbar
