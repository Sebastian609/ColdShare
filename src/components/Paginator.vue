<script setup>
   const props = defineProps({
    start: Number,
    end: Number,
    maxLength : Number,
});
   const emit = defineEmits(['next', 'previus','verifyStart','verifyEnd','start','end ']);

</script>

<template>
    <nav aria-label="...">
        <ul class="pagination">
            <li class="page-item">
                <span :class="{ 'page-link': true, 'disabled': start===0 }" @click="emit('previus')">Previous</span>
            </li>

            <li class="page-item">
                <a :class="{ 'page-link': true, 'disabled': end === maxLength }" @click="emit('next')" href="#">Next</a>
            </li>
        </ul>
    </nav>
</template>