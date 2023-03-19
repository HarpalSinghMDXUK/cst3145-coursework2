<template>
    <div class="hello">
        {{ msg }}
    </div>
</template>

<script>
export default{
    name: 'hello',
    data() {
        return {
            msg: 'Welcome to main page.'
        }
    }
}
</script>

<style scoped></style>