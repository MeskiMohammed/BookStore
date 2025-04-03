import React from 'react';
import Logo from '../../images/Logo.png';

export default function Login() {
  return (
    <section class="bg-gray-50 ">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
            <img class="" src={Logo} alt="logo"/>
        </a>
        <div class="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0  ">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                  Connectez-vous à votre compte
                </h1>
                <form class="space-y-4 md:space-y-6" action="#">
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">Votre email</label>
                        <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5      " placeholder="name@gmail.com" required=""/>
                    </div>
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">Mot de passe</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5      " required=""/>
                    </div>
                    <div class="flex items-center justify-between">
                        <div class="flex items-start">
                            <div class="flex items-center h-5">
                              <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300    " required=""/>
                            </div>
                            <div class="ml-3 text-sm">
                              <label for="remember" class="text-gray-500 ">Souviens-toi</label>
                            </div>
                        </div>
                        <a href="#" class="text-sm font-medium text-primary-600 hover:underline ">Mot de passe oublié?</a>
                    </div>
                    <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center   ">Se connecter</button>
                    <p class="text-sm font-light text-gray-500 ">
                    Vous n’avez pas encore de compte ? <a href="#" class="font-medium text-primary-600 hover:underline ">S'inscrire</a>
                    </p>
                </form>
            </div>
        </div>
    </div>
  </section>
  );
}
