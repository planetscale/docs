import Cookies from 'js-cookie'

export function trackIdentifiedPage(url) {
  if (window && window.analytics && typeof Cookies.get('signed_in') !== 'undefined') {
    window.analytics.page(url)
  }
}
