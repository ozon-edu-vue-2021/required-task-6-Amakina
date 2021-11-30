
const OPTIONS = {
  root: null,
  rootMargin: '0px',
  threshold: [0, 0.5]
}

const state = new Map()

const createObserver = (handler, options) => {
  return new IntersectionObserver(items => {
    items.forEach(({isIntersecting}) => {
      if (isIntersecting) {
        handler()
      }
    })
  }, options)
}
export const CustomDetectViewportDirective = {
  bind(element, binding) {
    const intersectionHandler = binding.value.callback;

    const observer = createObserver(intersectionHandler, OPTIONS)
    state.set(element, observer)
    observer.observe(element)
  },

  componentUpdated(element, binding) {
    CustomDetectViewportDirective.unbind(element)
    CustomDetectViewportDirective.bind(element, binding)
  },

  unbind(element) {
    const observer = state.get(element)
    if (observer) {
      observer.unobserve(element);
      state.delete(element)
    }
  }
}