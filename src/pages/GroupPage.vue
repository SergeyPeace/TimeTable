<template>
    <section class="timetable-group">
        <div class="date">
            <button class="btn-reset date__btn btn-previous" @click="paginationStep(-1)">
                <svg width="61" height="72" viewBox="0 0 61 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M40 5.5L36 1L1 37L36 71L40 67L10 37L40 5.5Z" fill="#A3BFEF" stroke="#A3BFEF"/>
                    <path d="M60 5.5L56 1L21 37L56 71L60 67L30 37L60 5.5Z" fill="#A3BFEF" stroke="#A3BFEF"/>
                </svg>                    
            </button>
            <div class="date__container">
                <div class="date__title-container">
                    <h2 class="date__title">{{$route.params.group}}</h2>
                </div>
                <div class="date__description">
                    <p class="date__description-time">{{String(weekDates.firstday.toLocaleDateString()) + " — " + String(weekDates.lastday.toLocaleDateString())}}</p>
                    <p class="date__description-week">(неделя по {{isUpWeek? 'числителю':'знаменателю'}}) </p>
                </div>
                
            </div>
            <button class="btn-reset date__btn btn-next"  @click="paginationStep(1)">
                <svg width="61" height="72" viewBox="0 0 61 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 66.5L25 71L60 35L25 0.999997L21 5L51 35L21 66.5Z" fill="#A3BFEF" stroke="#A3BFEF"/>
                    <path d="M1 66.5L5 71L40 35L5.00001 0.999997L1.00001 5L31 35L1 66.5Z" fill="#A3BFEF" stroke="#A3BFEF"/>
                </svg>
            </button>
        </div>
        
        <div class="timetable-group__container timetable container">
            <!-- <h2 class="timetable__title">Уровень образования и курс не выбраны</h2> -->
            <div class="timetable__list-container row">
                <div class="col-2"></div>
                <div class="container col-10">
                    <ul class="timetable__list-names timetable-names row">
                        <li class="timetable-names__item timetable-name col-1"><p class="timetable-name__description">Время</p></li>
                        <li class="timetable-names__item timetable-name col-6"><p class="timetable-name__description">Название дисциплины</p></li>
                        <li class="timetable-names__item timetable-name col-2"><p class="timetable-name__description">Вид</p></li>
                        <!-- <li class="timetable-names__item timetable-name col-2"><p class="timetable-name__description">Преподаватель</p></li> -->
                        <li class="timetable-names__item timetable-name col-2"><p class="timetable-name__description">Аудитория</p></li>
                        <li class="timetable-names__item timetable-name col-1"><p class="timetable-name__description">Адрес</p></li>
                    </ul>
                </div>
            </div>
            <ul class="timetable__list-weekdays weekdays__list">
                <li class="weekdays__item day row" v-for="(items, day) in timetable" :key="day">
                    <div class="day__container col-2">
                        <h3 class="day__title">{{day}}</h3>
                        <p class="day__description">01.09.2023</p>
                    </div>
                    <ul class="day__list col-10">
                        <li class="day__item lesson container">
                            <ul class="lesson__list row" v-for="item in items" :key="item.time">
                                <li class="lesson__item col-1" v-html="item.time"></li>
                                <li class="lesson__item col-6" v-html="item.description"></li>
                                <li class="lesson__item col-2" v-html="item.lessonType"></li>
                                <!-- <li class="lesson__item col-2">-</li> -->
                                <li class="lesson__item col-2" v-html="item.room"></li>
                                <li class="lesson__item col-1"></li>
                            </ul>
                        </li>
                    </ul>
                </li>        
            </ul>
        </div>
    </section>
</template>
<script>
import dayjs from 'dayjs'
import {mapState, mapGetters} from "vuex";


export default{
    data:()=>({
            paginationNext: 1,
        }),
    computed:{
        ...mapState(['imt', 'ipto']),
        ...mapGetters(['iptoGroups', 'imtGroups']),

        // Возвращает дату начала и дату конца текущей недели
        weekDates(){
            let curr = new Date 
            let curr2 = new Date
            let dow = curr.getDay()
            if (dow === 0){
                dow = 7
            }
            let first = curr.getDate() - dow + this.paginationNext
            let last = curr2.getDate() - dow  + 6 + this.paginationNext
            let firstday = new Date(curr.setDate(first))
            let lastday = new Date(curr2.setDate(last))
            return {firstday, lastday}
        },

        //Возвращает номер недели
        weekNumber(){
            let weekOfYear = require('dayjs/plugin/weekOfYear')
            dayjs.extend(weekOfYear)
            return dayjs(this.weekDates.firstday).week()
        },

        //Проверяет на числитель/знаменатель текущую неделю
        isUpWeek(){
            return (this.weekNumber % 2) === (window.WEEK_UP_NUMBER % 2)
        },

        //Подгружает данные из файла расписания института выбранной группы
        instituteData(){
            let group = this.$route.params.group
            if(this.iptoGroups.includes(group)){
                return this.ipto
            } 
            else if(this.imtGroups.includes(group)){
                return this.imt
            }
            return[]
        },

        //Возвращает номер столбца выбранной группы 
        groupIndex(){
            let group = this.$route.params.group
            return this.instituteData[4].indexOf(group)
        },

        //Возвращает объект с информацией занятий по группе
        timetable(){
            let day, time, description, room, lessonType
            let res = {}
            for(let i = 5; i < this.instituteData.length; i++){
                let row = this.instituteData[i]
                if (row[0]){
                    day = row[0]
                }
                if (row[1]){
                    time = row[1]
                    time = time.replace('-', '<br/>—<br/>')
                }
                if (row[this.groupIndex] ?? false){
                    let isUpWeek = i%2 > 0
                    if(isUpWeek === this.isUpWeek){

                        description = row[this.groupIndex]
                        room = row[this.groupIndex+1]

                        // Проверка наличия другого указанного времени
                        if(Number(description[0])){
                            time= row[this.groupIndex].slice(0,11)
                            time = time.replace('-', '<br/>—<br/>')
                            description = row[this.groupIndex].slice(12)
                        }


                        let regexlessonType = /(\(.{1,10}\d+.+\))|(\(прак.\))|(\(лекц\..*\))/gi
                        //Вывод информации о виде занятий из общей строки
                        if(description.indexOf(';')){ //в случае сдвоенных предметов
                            let pie = description.split(';')
                            let newDescription= ''
                            lessonType = ''
                            
                            pie.forEach(e => {
                                if(regexlessonType.test(e)){
                                    lessonType = lessonType + String(e.match(regexlessonType)).slice(1, String(e.match(regexlessonType)).length - 1) + '<br/>'
                                } else{
                                    lessonType = '—'
                                }
                                newDescription = newDescription + String(e.replace(regexlessonType, '<br/>'))
                            })   
                            description = newDescription
                        } 
                        else{
                            lessonType = String(description.match(regexlessonType)).slice(1, String(description.match(regexlessonType)).length - 1)
                            description = String(description.replace(regexlessonType, ''))
                        }


                        //Проверка адреса Моховой
                        // let addressMokhovaya = ', ул. Моховая, д. 26'
                        let addressMokhovaya = /(, *ул. *Моховая, д. *26 *)/g
                        if(addressMokhovaya.test(description)){
                            // description = description.slice(0 , description.length - (addressMokhovaya.length))
                            // room = addressMokhovaya.slice(1)
                            room = 'ул. Моховая, д. 26'
                            description = String(description.replace(addressMokhovaya, ''))  
                        }

                        //Вывод информации об аудитории из общей строки
                        let regexRoom = /(, *[А-Я]\d{3})|([А-Я]\d{3}|(, ДО))/g
                        let regexRoomPoint = /(, *[А-Я]\d{3}\.\d{1})/g    //Для таких аудиторий как Д323.1 и Д323.2
                        if(regexRoom.test(description)){
                            let lineLength = 4
                            if (regexRoomPoint.test(description)){
                                regexRoom = regexRoomPoint  
                            }

                            //Здесь для любых
                            room = ''
                            let arrayRoom = description.match(regexRoom)
                            arrayRoom.forEach(e => {
                                if(/(, ДО)/g.test(e)){
                                    lineLength = 2
                                }
                                else if(regexRoomPoint.test(e)){
                                    lineLength = 6
                                } else{
                                    lineLength = 4
                                }
                                room = room + e.slice(e.length - lineLength, e.length) + '<br/>'                     
                            })
                            description = description.replace((regexRoom), '') 
                        }

                        res[day]??=[]
                        res[day].push({time, description, room, lessonType})
                    }
                }
            }
            return res  
        }
    },

    //Устанавлиает значение шага недель
    methods:{
        paginationStep(direction){
            this.paginationNext += (direction*7)
        }
    },
    watch:{
        weekNumber(){
            console.log(new Date )
        },
    }

}
</script>