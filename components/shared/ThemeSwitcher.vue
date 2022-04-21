<template>
  <div>

    <button class=" slick-hover slick-border rounded-full">
      <div v-if="$colorMode.preference === 'system'" class="p-2" @click="$colorMode.preference = 'light'">
        <span
          class="flex md:space-x-2 items-center md:px-2"
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
      </div>

      <div
        v-if="$colorMode.preference === 'light'"
        @click="$colorMode.preference = 'dark'"
        class="p-2">
          <span
            class="flex md:space-x-2 items-center md:px-2"
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
      </div>

      <div
        v-if="$colorMode.preference === 'dark'"
        @click="$colorMode.preference = 'system'"
        class="p-2">
          <span
            class="flex md:space-x-2 items-center md:px-2"
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
      </div>

    </button>
  </div>
</template>

<script>
export default {
  name: "ThemeSwitcher"
}
</script>

<style scoped>

</style>
