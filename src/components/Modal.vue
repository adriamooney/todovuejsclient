<template>
	<div class="modal-mask" @click="close" v-show="show">
	    <div class="modal-container"  @click.stop>
	        <slot></slot>
	    </div>
	</div>
</template>

<script>
	export default {
	methods: {
        // ...
        close: function () {
            this.$emit('close');
        }
    }
}
</script>

