<template>
    <div>
        <filter-group/>
        <section class="timetable">
            <h2 class="timetable__title" v-show="(filteredImtGroup.length < 1) && (filteredIptoGroup.length < 1) && ((Number(selectedLevel) === 0)||Number(selectedKurs) === 0)">Уровень образования и курс не выбраны</h2>
            <h2 class="timetable__title" v-show="(filteredImtGroup.length < 1) && (filteredIptoGroup.length < 1) && ((Number(selectedLevel) > 0)||Number(selectedKurs) > 0)">Группы не найдены</h2>
            <ul class="timetable__list-institutes institutes container">
                <li class="institutes__item item row" v-show="filteredImtGroup.length > 0">
                    <div class="item__conteiner-title col-12 col-xl-4">
                        <h2 class="item__title-institute">Институт медиатехнологий</h2>
                    </div>
                    <div class="col-12 col-xl-8 container">
                        <ul class="item__list-institute institute row">
                            <li class="institute__item group col-6 col-md-4 " v-for="group in filteredImtGroup" :key="group ">
                                <router-link :to="'/group/'+ group" class="btn-reset btn-group">{{group}}</router-link>
                            </li>
                        </ul>
                    </div>
                </li>
                
                <li class="institutes__item item row" v-show="filteredIptoGroup.length > 0">
                    <div class="item__conteiner-title col-12 col-xl-4">
                        <h2 class="item__title-institute">Институт полиграфических технологий и оборудования</h2>
                    </div>
                    <div class="col-12 col-xl-8 container">
                        <ul class="item__list-institute institute row">
                            <li class="institute__item institute-group col-6 col-md-4" v-for="group in filteredIptoGroup" :key="group">
                                <router-link :to="'/group/'+ group" class="btn-reset btn-group">{{group}}</router-link>
                            </li>
                    
                        </ul>
                    </div>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>

import {mapGetters, mapState} from "vuex";
import FilterGroup from '@/components/FilterGroup.vue'

export default{
    components:{
        FilterGroup,
    },
    computed: {
    ...mapState(['imt', 'ipto', 'selectedLevel', 'selectedKurs']),
    ...mapGetters(['iptoGroups', 'imtGroups']),
    filteredImtGroup(){
        return this.imtGroups?.filter(v => {
            let show = true
            if ((parseInt(this.selectedLevel) > 0) || (parseInt(this.selectedKurs) > 0)){
                if (parseInt(this.selectedKurs) > 0){
                    show &&= parseInt(v[0]) === parseInt(this.selectedKurs)
                }
                if (parseInt(this.selectedLevel) === 1){
                    show &&= !v.includes('МГ') && !v.includes('ГИД-9')
                }
                if (parseInt(this.selectedLevel) === 2){
                    show &&= v.includes('МГ')
                }
                if (parseInt(this.selectedLevel) === 3){
                    show &&= v.includes('ГИД-9')
                }
            } else{
                show &&= 0
            }
            
            return show
        }).sort((a, b)=>{
            let reg = /\d{1}-[А-Я]+-/
            console.log(a)
            console.log(a.match(reg)[0].length)
            console.log(a.slice(a.match(reg)[0].length))
            if ( Number(a.slice(a.match(reg)[0].length)) > Number(b.slice(b.match(reg)[0].length))) return 1
            else if ( Number(a.slice(a.match(reg)[0].length)) < Number(b.slice(b.match(reg)[0].length))) return -1
            else{return 0}
        })
    },
    filteredIptoGroup(){
        return this.iptoGroups?.filter(v => {
            let show = true
            if ((parseInt(this.selectedLevel) > 0) || (parseInt(this.selectedKurs) > 0)){
                if (parseInt(this.selectedKurs) > 0){
                    show &&= parseInt(v[0]) === parseInt(this.selectedKurs)
                }
                if (parseInt(this.selectedLevel) === 1){
                    show &&= !v.includes('МГ') && !v.includes('ГИД-9')
                }
                if (parseInt(this.selectedLevel) === 2){
                    show &&= v.includes('МГ')
                }
                if (parseInt(this.selectedLevel) === 3){
                    show &&= v.includes('ГИД-9')
                }
            
            } else{
                show &&= 0
            }

            return show
        }).sort((a, b)=>{
            let reg = /\d{1}-[А-Я]+-/
            console.log(a)
            console.log(a.match(reg)[0].length)
            console.log(a.slice(a.match(reg)[0].length))
            if ( Number(a.slice(a.match(reg)[0].length)) > Number(b.slice(b.match(reg)[0].length))) return 1
            else if ( Number(a.slice(a.match(reg)[0].length)) < Number(b.slice(b.match(reg)[0].length))) return -1
            else{return 0}
        })
    },
  },
}
</script>
