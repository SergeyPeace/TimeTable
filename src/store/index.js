import Vue from 'vue'
import Vuex from 'vuex'

import {read, utils} from 'xlsx';

Vue.use(Vuex)

async function download(url){
  const f = await fetch(url);
  const ab = await f.arrayBuffer();
  /* parse workbook */
  const wb = read(ab);
  /* update data */
  var aoa = utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {header: 1})
  return aoa
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
      return state.ipto?.[4].filter(v => v?.split('-').length > 1) ?? []
    },
    imtGroups(state){
      return state.imt?.[4].filter(v => v?.split('-').length > 1) ?? []
    },
  },

  modules: {
  }
})
