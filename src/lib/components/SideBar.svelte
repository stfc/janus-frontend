<script>
  /** @type {string} Title of the page */
  export let pageName;
</script>

<header
  class="sticky left-0 top-0 z-40 flex h-16 w-full items-center justify-between bg-blue-800 px-4 py-2"
>
  <span class="self-center whitespace-nowrap text-3xl font-semibold text-white">{pageName}</span>
  <div class="right-0 top-0 flex items-center justify-end">
  </div>
</header>

<aside
  class="fixed left-0 top-0 z-30 h-screen w-30 bg-white pt-16 drop-shadow-md"
  aria-label="Sidebar"
>
  <nav class="mt-4 h-full px-3 pb-4">
    <ul class="space-y-2 text-lg font-semibold">
      <li>
        <a
          href="/"
          class="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            class="text-gray-700 transition duration-75 group-hover:text-gray-900"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              d="M5 0a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1zm.5 14a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1m2 0a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1M5 1.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5M5.5 3h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1"
            />
          </svg>
          <span class="ms-3">Home</span>
        </a>
      </li>
      <li>
        <a
          href="/singlepoint"
          class="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            class="text-gray-700 transition duration-75 group-hover:text-gray-900"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              d="M5 0a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1zm.5 14a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1m2 0a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1M5 1.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5M5.5 3h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1"
            />
          </svg>
          <span class="ms-3">Singlepoint</span>
        </a>
      </li>
      <li>
        <a
          href="/geomopt"
          class="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            class="text-gray-700 transition duration-75 group-hover:text-gray-900"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              d="M5 0a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1zm.5 14a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1m2 0a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1M5 1.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5M5.5 3h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1"
            />
          </svg>
          <span class="ms-3">Geomopt</span>
        </a>
      </li>
    </ul>
  </nav>
</aside>