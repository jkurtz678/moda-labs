import { ref, onUnmounted } from "vue";

export function useLazyLoad(rootMargin = "200% 0px") {  // Default changed to large positive margin
  const isIntersecting = ref(false);
  let observer: IntersectionObserver | null = null;

  const createObserver = () => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isIntersecting.value = true;
            observer?.disconnect();
          }
        });
      },
      {
        rootMargin,  // This creates a buffer zone around the viewport
        threshold: 0
      }
    );
  };

  const observe = (element: Element | null) => {
    if (!element) return;

    if (observer) {
      observer.disconnect();
    }

    createObserver();
    observer?.observe(element);
  };

  onUnmounted(() => {
    observer?.disconnect();
    observer = null;
  });

  return { isIntersecting, observe };
}