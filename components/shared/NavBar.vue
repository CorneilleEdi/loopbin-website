<template>
  <nav
    class="fixed flex w-full bg-white dark:bg-dark-high items-center justify-between flex-wrap top-0 animated mx-auto py-2 md:py-3 h-auto border-b border-dark-low dark:border-dark z-10"
  >
    <div
      class="container flex items-center justify-between text-dark dark:text-dark-low"
    >
      <nuxt-link to="/">
        <img
          src="@/assets/images/logo/main/main-logo.png"
          class="h-8 w-18 md:h-10 md:w-18"
          alt="loopbin logo"
        />
      </nuxt-link>

      <div class="hidden md:flex flex-1 w-full mx-auto justify-center">
        <ul class="flex justify-center items-center space-x-6">
          <li>
            <nuxt-link
              to="/posts"
              active-class="exact-navigation"
              class="flex px-4 items-center py-2 font-medium slick-hover-blue cursor-pointer rounded-sm"
            >
            <span class="mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="w-6 h-6"
              >
                <path fill="none" d="M0 0h24v24H0z"/>
                <path
                  fill="currentColor"
                  d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h16V5H4zm16 7l-3.536 3.536-1.414-1.415L17.172 12 15.05 9.879l1.414-1.415L20 12zM6.828 12l2.122 2.121-1.414 1.415L4 12l3.536-3.536L8.95 9.88 6.828 12zm4.416 5H9.116l3.64-10h2.128l-3.64 10z"
                />
              </svg>
            </span>
              <p class="text-sm">Posts</p>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/projets"
              exact-active-class="exact-navigation"
              class="flex px-4 items-center py-2 font-medium slick-hover-blue cursor-pointer rounded-sm"
            >
            <span class="mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="w-6 h-6"
              >
                <path fill="none" d="M0 0h24v24H0z"/>
                <path
                  fill="currentColor"
                  d="M7.105 15.21A3.001 3.001 0 1 1 5 15.17V8.83a3.001 3.001 0 1 1 2 0V12c.836-.628 1.874-1 3-1h4a3.001 3.001 0 0 0 2.895-2.21 3.001 3.001 0 1 1 2.032.064A5.001 5.001 0 0 1 14 13h-4a3.001 3.001 0 0 0-2.895 2.21zM6 17a1 1 0 1 0 0 2 1 1 0 0 0 0-2zM6 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm12 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
                />
              </svg>
            </span>
              <p class="text-sm">Projets</p>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/about"
              active-class="exact-navigation"
              class="flex px-4 items-center py-2 font-medium slick-hover-blue cursor-pointer rounded-sm"
            >
            <span class="mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="w-6 h-6"
              >
                <path fill="none" d="M0 0h24v24H0z"/>
                <path
                  fill="currentColor"
                  d="M15 4H5v16h14V8h-4V4zM3 2.992C3 2.444 3.447 2 3.999 2H16l5 5v13.993A1 1 0 0 1 20.007 22H3.993A1 1 0 0 1 3 21.008V2.992zm9 8.508a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zM7.527 17a4.5 4.5 0 0 1 8.946 0H7.527z"
                />
              </svg>
            </span>
              <p class="text-sm">A Propos</p>
            </nuxt-link>
          </li>
        </ul>
      </div>
      <div class="flex justify-center items-center space-x-2 md:space-x-4">
        <!--        <div
                  class="hidden md:flex items-center border border-dark dark:border-dark-low dark:border-opacity-20 bg-dark bg-opacity-10 hover:bg-opacity-20 border-opacity-10 rounded-sm pl-2 pr-10 py-2 cursor-pointer"
                  @click="showSearch"
                >
                  <span class="mr-2 opacity-70">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      class="w-4 h-4"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path
                        fill="currentColor"
                        d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"
                      />
                    </svg>
                  </span>

                  <p class="text-sm text-opacity-70">Rechercher</p>
                </div>-->
        <div
          class="flex items-center p-2 cursor-pointer slick-hover rounded-full slick-border"
          @click="showSearch"
        >
          <span class="flex space-x-2 items-center  px-2">
            <p class="text-sm font-medium">Recherche</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="w-5 h-5 "
            >
              <path fill="none" d="M0 0h24v24H0z"/>
              <path
                fill="currentColor"
                d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"
              />
            </svg>
          </span>
        </div>
        <button class="p-2 slick-hover slick-border rounded-full">
          <span
            v-if="$colorMode.preference === 'system'"
            class="flex md:space-x-2 items-center md:px-2"
            @click="$colorMode.preference = 'light'"
          >
            <p class="text-sm font-medium hidden md:block">auto</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="w-5 h-5 "
            >
              <path fill="none" d="M0 0h24v24H0z"/>
              <path
                fill="currentColor"
                d="M4 5v11h16V5H4zm-2-.993C2 3.451 2.455 3 2.992 3h18.016c.548 0 .992.449.992 1.007V18H2V4.007zM1 19h22v2H1v-2z"
              />
            </svg>
          </span>

          <span
            v-if="$colorMode.preference === 'light'"
            class="flex md:space-x-2 items-center md:px-2"
            @click="$colorMode.preference = 'dark'"
          >

            <p class="text-sm font-medium hidden md:block">light</p>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="w-5 h-5"
            >
              <path fill="none" d="M0 0h24v24H0z"/>
              <path
                fill="currentColor"
                d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z"
              />
            </svg>
          </span>

          <span
            v-if="$colorMode.preference === 'dark'"
            class="flex md:space-x-2 items-center md:px-2"
            @click="$colorMode.preference = 'system'"
          >

            <p class="text-sm font-medium hidden md:block">dark</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="w-5 h-5"
            >
              <path fill="none" d="M0 0h24v24H0z"/>
              <path
                fill="currentColor"
                d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-6.671-5.575A8 8 0 1 0 16.425 5.328a8.997 8.997 0 0 1-2.304 8.793 8.997 8.997 0 0 1-8.792 2.304z"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import events from '~/utils/events'

export default {
  name: 'NavBar',

  methods: {
    showSearch() {
      this.$nuxt.$emit(events.SEARCH.SHOW)
    },
  },
}
</script>
