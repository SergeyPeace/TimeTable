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
                     <a :href=documentDownload class="date__document" target="_blank" rel="noopener noreferrer">
                        <svg width="36" height="50" viewBox="0 0 48 63" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M46.7741 13.2761L46.7742 13.2762C47.2416 13.7363 47.5 14.3587 47.5 14.9994V15.25H32.5V0.5H32.7625C33.4341 0.5 34.0697 0.758009 34.5366 1.21748C34.5366 1.21754 34.5367 1.21759 34.5367 1.21765L46.7741 13.2761ZM3 0.5H27.5V16.7344C27.5 18.6421 29.0813 20.1875 31 20.1875H47.5V60.0469C47.5 61.3999 46.3938 62.5 45 62.5H3C1.60619 62.5 0.5 61.3999 0.5 60.0469V2.95312C0.5 1.60014 1.60619 0.5 3 0.5ZM34.5 47.75C35.5937 47.75 36.5 46.8691 36.5 45.7734V44.7891C36.5 43.6934 35.5937 42.8125 34.5 42.8125H13.5C12.4063 42.8125 11.5 43.6934 11.5 44.7891V45.7734C11.5 46.8691 12.4063 47.75 13.5 47.75H34.5ZM34.5 39.875C35.5937 39.875 36.5 38.9941 36.5 37.8984V36.9141C36.5 35.8184 35.5937 34.9375 34.5 34.9375H13.5C12.4063 34.9375 11.5 35.8184 11.5 36.9141V37.8984C11.5 38.9941 12.4063 39.875 13.5 39.875H34.5ZM36.5 30.0234V29.0391C36.5 27.9434 35.5937 27.0625 34.5 27.0625H13.5C12.4063 27.0625 11.5 27.9434 11.5 29.0391V30.0234C11.5 31.1191 12.4063 32 13.5 32H34.5C35.5937 32 36.5 31.1191 36.5 30.0234Z" fill="#CAE5FF" stroke="#A3BFEF"/>
                        </svg>
                    </a>
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
                    <div class="day__container col-5 col-xs-4 col-md-4 col-lg-2">
                        <h3 class="day__title">{{day}}</h3>
                        <p class="day__description" >{{weekDates.daysNames[dayName.indexOf(day)]}}</p>
                    </div>
                    <ul class="day__list col-12 col-xs-12 col-md-12 col-lg-10">
                        <li class="day__item lesson container">
                            <ul class="lesson__list row" v-for="item in items" :key="item.time">
                                <li class="lesson__item lesson__item-time col-12 col-xs-4 col-md-4 col-lg-1" v-html="item.time"></li>
                                <li class="lesson__item lesson__item-description col-12 col-xs-12 col-md-12 col-lg-6" v-html="item.description"></li>
                                <li class="lesson__item lesson__item-type col-7 col-xs-7 col-md-7 col-lg-2" v-html="item.lessonType"></li>
                                <!-- <li class="lesson__item col-2">-</li> -->
                                <li class="lesson__item lesson__item-room col-4 col-xs-4 col-md-4 col-lg-2" v-html="item.room"></li>
                                <li class="lesson__item lesson__item-map col-1 col-xs-1 col-md-1 col-lg-1">
                                    <a :href="item.address" target="_blank" class="lesson__item-link" v-if="item.address.length > 0">
                                        <svg width="39" height="49" viewBox="0 0 39 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M37.6326 19.5C37.6326 29.997 19.1326 47 19.1326 47C19.1326 47 2.13275 29.5 1.09644 20C0.0601171 10.5 7.49308 0.999986 18.1326 1C28.6327 1.00001 37.6326 9.00296 37.6326 19.5Z" stroke="#A3BFEF" stroke-width="2"/>
                                            <circle cx="19.1328" cy="20" r="7.5" fill="#CAE5FF" stroke="#A3BFEF" stroke-width="2"/>
                                        </svg>
                                    </a>
                                    <span v-else>—</span>
                                </li>
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
            dayName: ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
            documentDownload: '', 
        }),
    computed:{
        ...mapState(['imt', 'ipto']),
        ...mapGetters(['iptoGroups', 'imtGroups']),

        // Возвращает дату начала и дату конца текущей недели
        weekDates(){
            let curr = new Date() 
            let curr2 = new Date()
            let currDay = new Date()
            let dow = curr.getDay()
            if (dow === 0){
                dow = 7
            }
            let first = curr.getDate() - dow + this.paginationNext
            let last = curr2.getDate() - dow  + 6 + this.paginationNext
            let firstday = new Date(currDay.setDate(first-1))
            
            let daysNames = []
            for (let i = 0; i < 6; i++){
                let day = new Date(firstday.setDate(firstday.getDate()+1))
                daysNames.push(String(day.toLocaleDateString()))
            }
            firstday = new Date(curr.setDate(first))
            let lastday = new Date(curr2.setDate(last))
            return {firstday, lastday, daysNames}
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
                this.documentDownloadChoice(true)       
                return this.ipto            
            } 
            else if(this.imtGroups.includes(group)){
                this.documentDownloadChoice(false) 
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
            let day, time, description, room, lessonType, address
            let res = {}
            for(let i = 5; i < this.instituteData.length; i++){
                let row = this.instituteData[i]
                if (row[0]){
                    day = row[0]
                }
                if (row[1]){
                    time = row[1]
                    time = time.replace('-', '<br class="item-time__br"/>&ensp;—&ensp;<br class="item-time__br"/>')
                }
                if (row[this.groupIndex] ?? false){
                    let isUpWeek = i%2 > 0
                    if(isUpWeek === this.isUpWeek){

                        description = row[this.groupIndex]
                        room = row[this.groupIndex+1]

                        // Проверка наличия другого указанного времени
                        if(Number(description[0])&&Number(description[1])){
                            time= row[this.groupIndex].slice(0,11)
                            time = time.replace('-', '<br class="item-time__br"/>&ensp;—&ensp;<br class="item-time__br"/>')
                            description = row[this.groupIndex].slice(12)
                        }


                        let regexlessonType = /(\(.{1,10}\d+.+\))|(\(прак.\))|(\(лекц\..*\))|(\(лек\..*\))|(\(л.р\..*\))/gi
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
                        lessonType = '<span class="item-type__description">Вид занятий:&emsp;</span>'+lessonType

                        //Проверка адреса Моховой
                        // let addressMokhovaya = ', ул. Моховая, д. 26'
                        let addressMokhovaya = /(, *ул. *Моховая, д. *26 *)/gi
                        if(addressMokhovaya.test(description)){
                            // description = description.slice(0 , description.length - (addressMokhovaya.length))
                            // room = addressMokhovaya.slice(1)
                            room = 'ул. Моховая, д. 26'
                            description = String(description.replace(addressMokhovaya, ''))
                        }



                        //Вывод информации об аудитории из общей строки
                        let regexRoom = /(, *[А-Я]\d{3}\.\d{1})|(, *[А-Я]\d{3})|([А-Я]\d{3}|(, *ДО))/g
                        if(regexRoom.test(description)){
                            let lineLength = 4
                            room = ''
                            let arrayRoom = description.match(regexRoom)
                            arrayRoom.forEach(e => {
                                if(/(, ДО)/g.test(e)){
                                    lineLength = 2
                                }
                                else if(/[А-Я]\d{3}\.\d{1}/.test(e)){
                                    lineLength = 6
                                } else{
                                    lineLength = 4
                                }
                                room = room + e.slice(e.length - lineLength, e.length) + '<br/>'       
                            })
                            description = description.replace((regexRoom), '') 
                        }


                        if(/(.*[Дд]\d.*)/.test(room)){
                            address = ['https://yandex.ru/maps/2/saint-petersburg/?ll=30.335917%2C59.925163&mode=usermaps&source=constructorLink&um=constructor%3A80c1d043b17b1b6ef1fd6ca0dc1986807c705387ee4a072a81364cdbb8d6f6ed&z=17']
                        }
                        else if(/(.*[Вв]\d.*)/.test(room)){
                            address = ['https://yandex.ru/maps/2/saint-petersburg/?ll=30.309389%2C59.921271&mode=usermaps&source=constructorLink&um=constructor%3A80c1d043b17b1b6ef1fd6ca0dc1986807c705387ee4a072a81364cdbb8d6f6ed&z=17']
                        } 
                        else if(room === 'ул. Моховая, д. 26'){
                            address = ['https://yandex.ru/maps/2/saint-petersburg/?ll=30.347802%2C59.942172&mode=usermaps&source=constructorLink&um=constructor%3A80c1d043b17b1b6ef1fd6ca0dc1986807c705387ee4a072a81364cdbb8d6f6ed&z=17']
                        }else {
                            address = []
                        }

                        res[day] ??= []
                        res[day].push({time, description, room, lessonType, address})
                    }
                }
            }
            return res  
        }
    },

    //Устанавлиает значение шага недель
    methods:{
        paginationStep(direction){
            this.paginationNext += (direction * 7)
        },
        documentDownloadChoice(check){
            if(check){
                this.documentDownload = '/raspisaniye_ptio.xls'
            } else{
                this.documentDownload = '/raspisaniye_mt.xlsx'
            }   
        },
    },
    watch:{
        weekNumber(){
            
        },
    }

}
</script>