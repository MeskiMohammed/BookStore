import React, { useState }  from "react"

export default function UserInfo() {
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Book Lane, Reading, CA 90210",
  })

  const [formData, setFormData] = useState({ ...userData })

  const handleChange = () => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    e.preventDefault()
    setUserData({ ...formData })
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Informations personnelles</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition"
          >
           Modifier les informations
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nom et prénom
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Adresse email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Numéro de téléphone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Adresse
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex space-x-3 mt-6">
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                    Enregistrer les modifications
            </button>
            <button
              type="button"
              onClick={() => {
                setFormData({ ...userData })
                setIsEditing(false)
              }}
              className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition"
            >
              Annuler
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Nom et prénom</p>
              <p className="font-medium">{userData.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Adresse email</p>
              <p className="font-medium">{userData.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Numéro de téléphone</p>
              <p className="font-medium">{userData.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Adresse</p>
              <p className="font-medium">{userData.address}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
