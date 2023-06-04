<template>
    <nav class="header__nav nav">
            <ul class="nav__list">
                <li class="nav__item">
                    <a href="https://hspm.ru/" class="nav__link">Сайт ВШПМ</a>
                </li>
                <li class="nav__item">
                    <span class="nav__arrow">
                        <svg width="13" height="22" viewBox="0 0 13 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line y1="-1.5" x2="13.3822" y2="-1.5" transform="matrix(0.732919 -0.680315 0.732919 0.680315 3.1424 21.1221)" stroke="#374857" stroke-width="3"/>
                            <line y1="-1.5" x2="13.3822" y2="-1.5" transform="matrix(-0.732919 -0.680315 0.732919 -0.680315 12.7003 11.7861)" stroke="#374857" stroke-width="3"/>
                        </svg>
                    </span>
                    <router-link to="/" class="nav__link">Расписание занятий</router-link>
                </li>
                <li class="nav__item" v-if="$route.params.group">
                    <span class="nav__arrow">
                        <svg width="13" height="22" viewBox="0 0 13 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line y1="-1.5" x2="13.3822" y2="-1.5" transform="matrix(0.732919 -0.680315 0.732919 0.680315 3.1424 21.1221)" stroke="#374857" stroke-width="3"/>
                            <line y1="-1.5" x2="13.3822" y2="-1.5" transform="matrix(-0.732919 -0.680315 0.732919 -0.680315 12.7003 11.7861)" stroke="#374857" stroke-width="3"/>
                        </svg>
                    </span>
                    <a href="#" class="nav__link">{{$route.params.group}}</a>
                </li>
            </ul>
    </nav>
</template>
<script>
export default{

}
</script>
