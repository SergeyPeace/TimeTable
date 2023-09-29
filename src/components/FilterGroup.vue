<template>
    <section class="filter">
            <div class="filter__container">
                <form id="filter__form form" class="filter__form form" >
                    <div class="form__selects-container">
                        <div class="form__select-wrap select-wrap-level" :class="{'select--open':educationLevelShow}" tabindex="0" :aria-expanded="educationLevelShow?'true':'false'" @click.stop="educationLevelShow= !educationLevelShow" @keyup.enter="educationLevelShow = !educationLevelShow">
                            <!-- <select class="form__education-level" :value="selectedLevel" @input="set({selectedLevel: $event.target.value})">
                                <option disabled value='0' style="display: none">Уровень образования</option> 
                                <option value="1" style="display: none">Бакалавриат</option>
                                <option value="2" style="display: none">Магистратура</option>
                                <option value="3" style="display: none">Специалитет</option>
                                <option disabled value='0' v-show="selectedLevel < 1">Уровень образования</option> 
                                <option value="1">Бакалавриат</option>
                                <option value="2">Магистратура</option>
                                <option value="3">Специалитет</option>
                                
                            </select> -->
                            
                            <div class="form__education-output form__education-level">{{ selectedLevel === 3? 'Специалитет': selectedLevel === 2? 'Магистратура': selectedLevel === 1? 'Бакалавриат':'Уровень образования'}}</div>
                            <div class="select-wrap__list-options" :class="{visible:educationLevelShow}">
                                <div class="education-output education-level__optional" tabindex="0" @click="set({selectedLevel: 1})" @keyup.enter="set({selectedLevel: 1})">Бакалавриат</div>
                                <div class="education-output education-level__optional" tabindex="0" @click="set({selectedLevel: 2})" @keyup.enter="set({selectedLevel: 2})">Магистратура</div>
                                <div class="education-output education-level__optional" tabindex="0" @click="set({selectedLevel: 3})" @keyup.enter="set({selectedLevel: 3})">Специалитет</div>
                            </div>
                    
                        </div>
                        <div class="form__select-wrap select-wrap-kurs" :class="{'select--open':selectedKursShow}" tabindex="0" :aria-expanded="selectedKursShow?'true':'false'" @click.stop="selectedKursShow= !selectedKursShow" @keyup.enter="selectedKursShow = !selectedKursShow">
                            <!-- <select class="form__year" :value="selectedKurs" @input="set({selectedKurs: $event.target.value})">
                                <option value='0' disabled v-show="selectedKurs < 1">Курс</option>
                                <option value='1'>1 курс</option> 
                                <option value="2">2 курс</option>
                                <option value="3" v-show="Number(selectedLevel) !== 2">3 курс</option>
                                <option value="4" v-show="Number(selectedLevel) !== 2">4 курс</option>
                                <option value="5" v-show="Number(selectedLevel) !== 2 && Number(selectedLevel) !== 1">5 курс</option>

                            </select> -->
                            <div class="form__education-output form__education-kurs">{{selectedKurs === 0 ? 'Курс':selectedKurs + ' Курс'}}</div>
                            <div class="select-wrap__list-options" :class="{visible:selectedKursShow}">
                                <div class="education-output education-kurs__optional" tabindex="0" @click="set({selectedKurs: 1})"  @keyup.enter="set({selectedKurs: 1})">Курс 1</div>
                                <div class="education-output education-kurs__optional" tabindex="0" @click="set({selectedKurs: 2})"  @keyup.enter="set({selectedKurs: 2})">Курс 2</div>
                                <div class="education-output education-kurs__optional" tabindex="0" @click="set({selectedKurs: 3})"  @keyup.enter="set({selectedKurs: 3})" v-show="Number(selectedLevel) !== 2">Курс 3</div>
                                <div class="education-output education-kurs__optional" tabindex="0" @click="set({selectedKurs: 4})"  @keyup.enter="set({selectedKurs: 4})" v-show="Number(selectedLevel) !== 2">Курс 4</div>
                                <div class="education-output education-kurs__optional" tabindex="0" @click="set({selectedKurs: 5})"  @keyup.enter="set({selectedKurs: 5})" v-show="Number(selectedLevel) !== 2 && Number(selectedLevel) !== 1">Курс 5</div>
                            </div>
                        </div>
                    </div>

                    <div class="form__btn-sumbit-container">
                        <div class="form__input-container">
                            <input class="form__input" placeholder="Номер группы" :value="inputGroupName" @input="set({inputGroupName: $event.target.value})">
                        </div>
                        <button class="btn-reset form__btn-sumbit " type="submit" @click.prevent=" clearForm()">Очистить</button>
                    </div>
                </form>
            </div>
            <hr class="section__line"/>
        </section>
</template>
<script>

import {mapState, mapMutations} from "vuex";
export default{
    data:()=>({
        educationLevelShow: false,
        selectedKursShow: false,
    }),
    computed: {
        ...mapState(['selectedLevel', 'selectedKurs', 'inputGroupName']),
    },
    methods:{
        ...mapMutations(['set']),
        clearForm(){
            this.set({selectedLevel: 0, selectedKurs: 0, inputGroupName: '',})
        },
    },
    watch:{
        educationLevelShow(){
            if(this.educationLevelShow){
                window.addEventListener("click",() => {
                    this.educationLevelShow = false
                })
            }
        },
        selectedKursShow(){
            if(this.selectedKursShow){
                window.addEventListener("click",() => {
                    this.selectedKursShow = false
                }
                
            )} 
        },
    },
}
</script>
