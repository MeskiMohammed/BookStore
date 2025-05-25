"use client"

import { Link } from "@inertiajs/react"
import { usePage } from "@inertiajs/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckCircle, faShoppingBag, faHome } from "@fortawesome/free-solid-svg-icons"

export default function CheckoutSuccess() {
  const { auth } = usePage().props

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-8">
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="text-green-500 text-6xl mx-auto"
            />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Merci pour votre commande !
          </h1>

          <p className="text-lg text-gray-600 mb-8">
            Votre commande a été reçue et sera traitée dans les plus brefs délais.
            Vous recevrez un email de confirmation avec les détails de votre commande.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href={route("home")}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FontAwesomeIcon icon={faHome} className="mr-2" />
              Retour à l'accueil
            </Link>

            {auth.user && (
              <Link
                href={route("orders.index")}
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <FontAwesomeIcon icon={faShoppingBag} className="mr-2" />
                Voir mes commandes
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
