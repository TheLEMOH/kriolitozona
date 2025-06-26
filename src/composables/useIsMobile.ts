import { computed, onMounted, onUnmounted, ref } from "vue";

export default function useIsMobile() {
    const width = ref()

    const isMobile = computed<boolean>(() => {
        return width.value <= 1150 ? true : false;
    });

    const handleResize = () => {
        width.value = window.innerWidth;
    };

    onMounted(() => {
        window.addEventListener("resize", handleResize);
    });

    onUnmounted(() => {
        window.removeEventListener("resize", handleResize);
    });

    handleResize();

    return { isMobile }
}