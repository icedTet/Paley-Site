import Router from 'next/router'
import nprogress from 'nprogress'

// Nprogress config
nprogress.configure({ minimum: 0.16, showSpinner: false })
nprogress.configure({
  template: `<div class="bar bg-gradient-to-l from-green-300 to-primary-300" role="bar" style="display:hidden;z-index:9999"></div>`,
})
// Track all pending observables
const observers = new Set()
export const configureColor = (color: string) => {
  nprogress.configure({
    template: `<div class="bar" role="bar" style="background: ${color};z-index:9999"></div>`,
  })
}
// Allow race of observerable actions
// Usage: nprogress.observe(callbackFunction);
export const observe = async (...args: any) => {
  // Can be replaced with UUID or other random generator
  const id = Date.now()
  startProgress(id)

  try {
    // Run callback functions, await event results
    const callbacks = args.map((fn: any) => fn.call())
    const results = await Promise.all(callbacks)

    // Stop when completed
    stopProgress(id)

    // Return array only if more than 1 observed event
    return results.length > 1 ? results : results[0]
  } catch (err: any) {
    haltProgress(err, id)
    throw err
  }
}

// Display progress error, keep progress bar present for 1.5 seconds
const error = (skip = false) => {
  if (typeof window !== 'undefined') {
    document.getElementById('nprogress')?.classList?.add('error')
    nprogress.set(0.95)

    if (!skip) {
      setTimeout(nprogress.done, 1500)
    }
  }
}

// Handler: Start progress bar
const startProgress = (id: any) => {
  if (typeof window !== 'undefined') {
    observers.add(id)
    nprogress.start()
  }
}

// Handler: Stop progress bar
const stopProgress = (id: any) => {
  if (typeof window !== 'undefined') {
    observers.delete(id)
    if (observers.size === 0) {
      nprogress.done()
    }
  }
}

// Handler: Halt progress bar with error
const haltProgress = (err: Error, id: any) => {
  if (typeof window !== 'undefined') {
    if (/Route Cancelled/.test(err?.message)) {
      stopProgress(id)
    } else {
      observers.delete(id)
      error(!!observers.size)
    }
  }
}

// Observe NextJS route events
Router.events.on('routeChangeStart', startProgress)
Router.events.on('routeChangeComplete', stopProgress)
Router.events.on('routeChangeError', stopProgress)

export default nprogress
