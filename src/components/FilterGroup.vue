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
                <!-- <a href="https://hspm.ru/u/files/raspisaniye-studentov-ochnoy-formy-imt-vshpm-ii-polugodiye-2022-2023-uch_20230512112137.xlsx" target="_blank" rel="noopener noreferrer">
                    <svg style="width: 2em" aria-hidden="true" data-prefix="fas" data-icon="file-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="files__item_file-icon svg-inline--fa fa-file-alt fa-w-12">
                        <path fill="#00A0C8" d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm64 236c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12v8zm0-64c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12v8zm0-72v8c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12zm96-114.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z">
                        </path>
                    </svg>
                </a> -->
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
