import { ref, onMounted, onUnmounted } from "vue";

export function useLazyLoad(rootMargin = "0px") {
  const isIntersecting = ref(false);
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isIntersecting.value = true;
          observer.disconnect();
        }
      });
    },
    {
      rootMargin,
    }
  );

  const observe = (element: Element) => {
    if (element) {
      observer.observe(element);
    }
  };

  onUnmounted(() => {
    observer.disconnect();
  });

  return { isIntersecting, observe };
}