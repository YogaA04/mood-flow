'use client'


export default function Home() {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome to Our App</h1>
      <p className="text-lg text-gray-600 mb-4">Please choose an option:</p>
      <div className="flex space-x-4">
        <a href="/login" className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">Login</a>
        <a href="/register" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Register</a>
      </div>
    </div>
  )
}