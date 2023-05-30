<template>
  <div>
    <header-site/>
    <main>
      <router-view/>
    </main>
    <footer-site/>
  </div>
</template>

<script>
import HeaderSite from '@/components/HeaderSite.vue'
import FooterSite from '@/components/FooterSite.vue'

import {mapActions, mapGetters, mapState} from "vuex";

export default{
  components:{
    HeaderSite,
    FooterSite,
  }, 
  computed: {
   ...mapState(['imt', 'ipto']),
   ...mapGetters(['iptoGroups', 'imtGroups']),
  },

  async mounted() {
    await this.onLoad()
  },

  methods:{
    ...mapActions(['onLoad']),
  },
  
}
</script>