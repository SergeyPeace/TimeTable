import Vue from 'vue'
import Vuex from 'vuex'

import {read, utils} from 'xlsx';

Vue.use(Vuex)

// const URL = 'https://hspm.ru/studentam/raspisaniye-zanyatiy'
// async function request(URL){
//     const response = await fetch(URL);
//     return await response.text();
// }


// function cutLink(institute, body) {
//     body = body.slice(body.indexOf(`${institute}</strong>`))
//     let link = body.slice(body.indexOf('<a ')+9, body.indexOf('" target="_blank"'))
//     return `https://hspm.ru${link}`
// }
// //Поиск двух ссылок на расписания занятий
// async function getExcelLinks(){
//     const response = await request(URL)
//     return [cutLink('Институт медиатехнологий', response), cutLink('Институт полиграфических технологий и оборудования', response)]  
// }
// const excelLinks = await getExcelLinks()

async function download(url){
  const f = await fetch(url);
  const ab = await f.arrayBuffer();
  /* parse workbook */
  const wb = read(ab);
  for(let i in wb.Sheets){
    /* update data */
    const aoa = utils.sheet_to_json(wb.Sheets[i], {header: 1})
    if(aoa.length > 0){
      return aoa
    }
  }
}

export default new Vuex.Store({
  state: {
    imt: null,
    ipto: null,
    selectedLevel: 0,
    selectedKurs: 0,
    inputGroupName: '',
  },
  mutations: {
    set(state, set){
      for(let k in set){
          state[k]=set[k]                
      }
    },
  },
  actions: {
    async onLoad({commit}){
      let imt = await download('./raspisaniye_mt.xlsx')
      let ipto = await download('./raspisaniye_ptio.xls')

      commit('set', {imt, ipto})
    }
  },
  getters:{
    iptoGroups(state){
      const arr = new Set(state.ipto?.[4].filter(v => v?.split('-').length > 1))
      return [...arr]
    },
    imtGroups(state){
      const arr = new Set(state.imt?.[4].filter(v => v?.split('-').length > 1))
      return [...arr]
    },
  },

  modules: {
  }
})
