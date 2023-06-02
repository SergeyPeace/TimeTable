<template>
    <section class="filter">
            <div class="filter__container">
                <form id="filter__form form" class="filter__form form" >
                    <div class="form__select-wrap">
                        <select class="form__education-level" :value="selectedLevel" @input="set({selectedLevel: $event.target.value})">
                            <option disabled value='0' v-show="selectedLevel < 1">Уровень образования</option> 
                            <option value="1">Бакалавриат</option>
                            <option value="2">Магистратура</option>
                            <option value="3">Специалитет</option>
                        </select>
                    </div>
                    <div class="form__select-wrap">
                        <select class="form__year" :value="selectedKurs" @input="set({selectedKurs: $event.target.value})">
                            <option value='0' disabled v-show="selectedKurs < 1">Курс</option>
                            <option value='1'>1 курс</option> 
                            <option value="2">2 курс</option>
                            <option value="3" v-show="Number(selectedLevel) !== 2">3 курс</option>
                            <option value="4" v-show="Number(selectedLevel) !== 2">4 курс</option>
                            <option value="5" v-show="Number(selectedLevel) !== 2 && Number(selectedLevel) !== 1">5 курс</option>

                        </select>
                    </div>
                    <input placeholder="Номер группы" :value="inputGroupName" @input="set({inputGroupName: $event.target.value})">
                    <button class="btn-reset form__btn-sumbit" type="submit" @click.prevent=" clearForm()">Очистить</button>
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
    computed: {
        ...mapState(['selectedLevel', 'selectedKurs', 'inputGroupName']),
    },
    methods:{
        ...mapMutations(['set']),
        clearForm(){
            this.set({selectedLevel: 0, selectedKurs: 0, inputGroupName: '',})
        },
    },
}
</script>
