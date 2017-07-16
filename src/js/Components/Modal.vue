<template>
    <div v-if="show" class="modal-wrapper">
        <slot></slot>

        <div class="modal-overlay" @click="closeModal"></div>
    </div>
</template>
<script>
    export default {
        props: ["show"],

        watch: {
          show() {
              let b = document.getElementsByTagName('body')[0];

              if(this.show)
                  b.classList.add('modal--open');
              else
                  b.classList.remove('modal--open');
          }
        },

        data() {
            return {
            }
        },

        methods: {
            closeModal() {
                this.$emit("update:show", false)
            }
        }
    }
</script>