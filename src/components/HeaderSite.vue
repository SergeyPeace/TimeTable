<template>
    <header>
        <div class="header__container">
            <a href="https://hspm.ru/" class="header__logo">
                <img src="img/svg/logo-hspm.svg" alt="Логотип HSPM">
            </a>
            <h1 class="header__title">Высшая школа печати и медиатехнологий</h1>
            <h1 class="header__title--short">ВШПМ</h1>
        </div>
        <NavigationPanel/>
    </header>
</template>

<script>
import NavigationPanel from './NavigationPanel.vue'

export default{
    components:{
        NavigationPanel,
    }
}
</script>