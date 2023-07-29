// https://stackoverflow.com/a/63944126/11525924
import { computed, onMounted, onUnmounted, ref } from "vue"

export default function useBreakpoints() {
    let windowWidth = ref(window.innerWidth)

    const onWidthChange = () => windowWidth.value = window.innerWidth
    onMounted(() => window.addEventListener('resize', onWidthChange))
    onUnmounted(() => window.removeEventListener('resize', onWidthChange))

    const xs = "xs";
    const sm = "sm";
    const md = "md";
    const lg = "lg";
    const xl = "xl";

    const screen_type = computed(() => {
        if (windowWidth.value < 650) return xs; 
        if (windowWidth.value >= 650 && windowWidth.value < 960 ) return sm;  
        if (windowWidth.value >= 960 && windowWidth.value < 1200) return md;
        if (windowWidth.value >= 1200 && windowWidth.value < 1700) return lg; 
        if (windowWidth.value >= 1700) return xl;
        return ""; // This is an unreachable line, simply to keep eslint happy.
    })

    const sm_and_up = computed(() => {
        return [sm, md, lg, xl].includes(screen_type.value)
    })

    const md_and_up = computed(() => {
        return [md, lg, xl].includes(screen_type.value)
    })

    const lg_and_up = computed(() => {
        return [lg, xl].includes(screen_type.value)
    })

    const width = computed(() => windowWidth.value)

    return { width, screen_type, sm_and_up, md_and_up, lg_and_up};
}