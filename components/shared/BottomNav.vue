<template>
  <div class="md:hidden">
    <div
      class="block fixed inset-x-0 bottom-0 z-10 border-t border-dark-low dark:border-opacity-10 bg-green px-2"
    >
      <div
        id="tabs"
        class="flex justify-between w-full my-1 text-dark"
      >
        <ul
          class="flex w-full justify-between sm:justify-around items-center space-x-6 sm:space-x-8 px-8"
        >
          <li>
            <nuxt-link
              to="/tutos"
              active-class="bg-white bg-opacity-30"
              class="flex flex-col py-2 px-3 items-center hover:bg-white hover:bg-opacity-40 cursor-pointer rounded-sm"
            >
            <span class="mb-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="w-5 h-5"
              >
                <path fill="none" d="M0 0h24v24H0z"/>
                <path
                  fill="currentColor"
                  d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h16V5H4zm16 7l-3.536 3.536-1.414-1.415L17.172 12 15.05 9.879l1.414-1.415L20 12zM6.828 12l2.122 2.121-1.414 1.415L4 12l3.536-3.536L8.95 9.88 6.828 12zm4.416 5H9.116l3.64-10h2.128l-3.64 10z"
                />
              </svg>
            </span>
              <p class="text-xs">Tutos</p>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              active-class="bg-white bg-opacity-30"
              to="/projets"
              class="flex flex-col py-2 px-3 items-center hover:bg-white hover:bg-opacity-40 cursor-pointer rounded-sm"
            >
            <span class="mb-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="w-5 h-5"
              >
                <path fill="none" d="M0 0h24v24H0z"/>
                <path
                  fill="currentColor"
                  d="M7.105 15.21A3.001 3.001 0 1 1 5 15.17V8.83a3.001 3.001 0 1 1 2 0V12c.836-.628 1.874-1 3-1h4a3.001 3.001 0 0 0 2.895-2.21 3.001 3.001 0 1 1 2.032.064A5.001 5.001 0 0 1 14 13h-4a3.001 3.001 0 0 0-2.895 2.21zM6 17a1 1 0 1 0 0 2 1 1 0 0 0 0-2zM6 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm12 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
                />
              </svg>
            </span>
              <p class="text-xs">Projets</p>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              active-class="bg-white bg-opacity-30"
              to="/about"
              class="flex flex-col py-2 px-3 items-center hover:bg-white hover:bg-opacity-40 cursor-pointer rounded-sm"
            >
            <span class="mb-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="w-5 h-5"
              >
                <path fill="none" d="M0 0h24v24H0z"/>
                <path
                  fill="currentColor"
                  d="M15 4H5v16h14V8h-4V4zM3 2.992C3 2.444 3.447 2 3.999 2H16l5 5v13.993A1 1 0 0 1 20.007 22H3.993A1 1 0 0 1 3 21.008V2.992zm9 8.508a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zM7.527 17a4.5 4.5 0 0 1 8.946 0H7.527z"
                />
              </svg>
            </span>
              <p class="text-xs">A Propos</p>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BottomNav',
}
</script>

<style scoped></style>
