<template>
    <div>
      <wang-editor></wang-editor>
    </div>
</template>

<script>
  import wangEditor from '@/components/WangEditor'
    export default {
      mounted(){
        this.initEditor();
        this.$Progress.finish();
      },
       components: {
         wangEditor
       }
    }
</script>

<style scoped lang="css">

</style>
