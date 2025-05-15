"use client"

import { useForm, Head } from "@inertiajs/react"
import { useState } from "react"
import Logo from "../../images/Logo.png"

export default function Register({ errors }) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { data, setData, post, processing } = useForm({
    prenom: "",
    nom: "",
    email: "",
    adresse: "",
    password: "",
    password_confirmation: "",
    terms: false,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    post("/register", data)
  }

  return (
    <section className="bg-gray-50">
      <Head title="Register" />
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col items-center justify-center px-2 py-8 md:h-screen lg:py-0 order-none lg:order-last w-full bg-white md:mt-0 xl:p-0">
          <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
            <img className="" src={Logo || "/placeholder.svg"} alt="logo" />
          </a>
          <div className="">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Créer un compte
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="prenom" className="block mb-2 text-sm font-medium text-gray-900">
                      Prénom
                    </label>
                    <input
                      type="text"
                      id="prenom"
                      name="prenom"
                      placeholder="Prénom"
                      className={`bg-gray-50 border ${
                        errors.prenom ? "border-red-500" : "border-gray-300"
                      } text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 outline-none`}
                      value={data.prenom}
                      onChange={(e) => setData("prenom", e.target.value)}
                    />
                    {errors.prenom && <p className="text-red-500 text-xs mt-1">{errors.prenom}</p>}
                  </div>
                  <div>
                    <label htmlFor="nom" className="block mb-2 text-sm font-medium text-gray-900">
                      Nom
                    </label>
                    <input
                      type="text"
                      id="nom"
                      name="nom"
                      placeholder="Nom"
                      className={`bg-gray-50 border ${
                        errors.nom ? "border-red-500" : "border-gray-300"
                      } text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 outline-none`}
                      value={data.nom}
                      onChange={(e) => setData("nom", e.target.value)}
                    />
                    {errors.nom && <p className="text-red-500 text-xs mt-1">{errors.nom}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                    Votre Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className={`bg-gray-50 border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 outline-none`}
                    placeholder="nom@example.com"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="adresse" className="block mb-2 text-sm font-medium text-gray-900">
                    Adresse
                  </label>
                  <input
                    type="text"
                    name="adresse"
                    id="adresse"
                    className={`bg-gray-50 border ${
                      errors.adresse ? "border-red-500" : "border-gray-300"
                    } text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 outline-none`}
                    placeholder="123 Rue Example, Ville"
                    value={data.adresse}
                    onChange={(e) => setData("adresse", e.target.value)}
                  />
                  {errors.adresse && <p className="text-red-500 text-xs mt-1">{errors.adresse}</p>}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                      Mot de passe
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        className={`bg-gray-50 border ${
                          errors.password ? "border-red-500" : "border-gray-300"
                        } text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10 outline-none`}
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                            <line x1="1" y1="1" x2="23" y2="23"></line>
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                        )}
                      </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                  </div>
                  <div>
                    <label htmlFor="password_confirmation" className="block mb-2 text-sm font-medium text-gray-900">
                      Confirmer le mot de passe
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="password_confirmation"
                        id="password_confirmation"
                        placeholder="••••••••"
                        className={`bg-gray-50 border ${
                          errors.password_confirmation ? "border-red-500" : "border-gray-300"
                        } text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10 outline-none`}
                        value={data.password_confirmation}
                        onChange={(e) => setData("password_confirmation", e.target.value)}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                            <line x1="1" y1="1" x2="23" y2="23"></line>
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                        )}
                      </button>
                    </div>
                    {errors.password_confirmation && (
                      <p className="text-red-500 text-xs mt-1">{errors.password_confirmation}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className={`w-4 h-4 border ${
                        errors.terms ? "border-red-500" : "border-gray-300"
                      } rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 outline-none`}
                      checked={data.terms}
                      onChange={(e) => setData("terms", e.target.checked)}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="font-light text-gray-500">
                      J'accepte les{" "}
                      <a className="font-medium text-primary-600 hover:underline" href="#">
                        Conditions d'utilisation
                      </a>
                    </label>
                    {errors.terms && <p className="text-red-500 text-xs mt-1">{errors.terms}</p>}
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={processing}
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  {processing ? "Création en cours..." : "Créer un compte"}
                </button>
                <p className="text-sm font-light text-gray-500">
                  Vous avez déjà un compte ?{" "}
                  <a href="/login" className="font-medium text-primary-600 hover:underline">
                    Connectez-vous ici
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex flex-col items-start justify-center px-6 py-8 md:h-screen lg:py-0 bg-gray-50">
          <div className="space-y-6 sm:space-y-8">
            {/* <!-- Title --> */}
            <div className="space-y-2 md:space-y-4">
              <h2 className="font-bold text-3xl lg:text-4xl text-gray-800">
                Rejoignez notre communauté de passionnés de lecture
              </h2>
              <p className="text-gray-500">
                Créez un compte pour découvrir, acheter et organiser vos livres préférés. Suivez votre progression de
                lecture et explorez de nouveaux horizons littéraires.
              </p>
            </div>
            {/* <!-- End Title --> */}

            {/* <!-- List --> */}
            <ul className="space-y-2 sm:space-y-4">
              <li className="flex gap-x-3">
                <span className="mt-0.5 size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600">
                  <svg
                    className="shrink-0 size-3.5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <div className="grow">
                  <span className="text-sm sm:text-base text-gray-500">
                    <span className="font-bold">Accès illimité</span> à une vaste collection de livres
                  </span>
                </div>
              </li>

              <li className="flex gap-x-3">
                <span className="mt-0.5 size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600">
                  <svg
                    className="shrink-0 size-3.5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <div className="grow">
                  <span className="text-sm sm:text-base text-gray-500">
                    Suivi et organisation de votre bibliothèque personnelle
                  </span>
                </div>
              </li>

              <li className="flex gap-x-3">
                <span className="mt-0.5 size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600">
                  <svg
                    className="shrink-0 size-3.5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <div className="grow">
                  <span className="text-sm sm:text-base text-gray-500">
                    Profitez de <span className="font-bold">réductions exclusives</span> et d'offres spéciales
                  </span>
                </div>
              </li>
            </ul>
            {/* <!-- End List --> */}
          </div>
        </div>
      </div>
    </section>
  )
}
