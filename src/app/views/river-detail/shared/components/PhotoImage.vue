<template>
  <div @click="$emit('click')">
  <img v-if="isPhoto" alt='image' :src="url"  class="mb-spacing-sm" >
  </div>

</template>

<script lang="ts">
import {computed, defineComponent, PropType} from '@vue/composition-api'
import {PhotoType,PhotoFactory} from "@bit/aw.models.post";
import {configBaseURL} from "@/aw/global/config";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({

  props:{
   photo:{type: Object as PropType<PhotoType>,
        required:true,
        default:()=>PhotoFactory.new()}
  },
  setup(props)
  {
    function urltobigurl(photo_url: string)
    {

          if(photo_url )
          {
            if(!photo_url.match(/http/gi))
            {
              return new URL(photo_url,configBaseURL()).toString()
            }
           return(photo_url)
          }
    }

    return({
      url:computed(()=>
          urltobigurl(props.photo.image?.uri?.medium ?? '')),
      isPhoto:computed(()=>!!(props.photo.image?.uri?.medium))
    })
  }
})
</script>

<style scoped>

</style>
