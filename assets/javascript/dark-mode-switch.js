const systemInitiatedDark = window.matchMedia('(prefers-color-scheme: dark)')
const theme = sessionStorage.getItem('theme')
const toggleElement = document.querySelector('.toggle-container')
const toggleInput = document.querySelector('.toggle-switch input')

const prefersColorTest = () => {
  if (systemInitiatedDark.matches) {
    document.documentElement.setAttribute('data-theme', 'dark')
    toggleInput.checked = true
    sessionStorage.setItem('theme', '')
  } else {
    document.documentElement.setAttribute('data-theme', 'light')
    toggleInput.checked = false
    sessionStorage.setItem('theme', '')
  }
}

const modeSwitcher = () => {
  const theme = sessionStorage.getItem('theme')
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'light')
    sessionStorage.setItem('theme', 'light')
  } else if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'dark')
    sessionStorage.setItem('theme', 'dark')
  } else if (systemInitiatedDark.matches) {
    document.documentElement.setAttribute('data-theme', 'light')
    sessionStorage.setItem('theme', 'light')
  } else {
    document.documentElement.setAttribute('data-theme', 'dark')
    sessionStorage.setItem('theme', 'dark')
  }
}

if (systemInitiatedDark.matches) {
  toggleInput.checked = true
} else {
  toggleInput.checked = false
}

if (theme === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark')
  sessionStorage.setItem('theme', 'dark')
  toggleInput.checked = true
} else if (theme === 'light') {
  document.documentElement.setAttribute('data-theme', 'light')
  sessionStorage.setItem('theme', 'light')
  toggleInput.checked = false
}

systemInitiatedDark.addEventListener('change', () => {
  prefersColorTest()
})

toggleElement.addEventListener('click', (e) => {
  const eventTarget = e.target
  if (eventTarget.nodeName === 'SPAN') {
    modeSwitcher()
  }
})
