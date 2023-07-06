// https://stackoverflow.com/a/63944126/11525924
import { computed, onMounted, onUnmounted, ref } from "vue"

export default function useBreakpoints() {
    let windowWidth = ref(window.innerWidth)

    const onWidthChange = () => windowWidth.value = window.innerWidth
    onMounted(() => window.addEventListener('resize', onWidthChange))
    onUnmounted(() => window.removeEventListener('resize', onWidthChange))

    const screen_type = computed(() => {
        if (windowWidth.value < 650) return 'xs'
        if (windowWidth.value >= 650 && windowWidth.value < 960 ) return 'sm'
        if (windowWidth.value >= 960 && windowWidth.value < 1200) return 'md'
        if (windowWidth.value >= 1200) return 'lg'
        return null; // This is an unreachable line, simply to keep eslint happy.
    })

    const width = computed(() => windowWidth.value)

    return { width, screen_type };
}