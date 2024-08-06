const state = {
  attrData:[
  ],
  eventData:[
  ],
  slotData:[]
}

const mutations = {
  SET_ATTR_DATA(state,data){
    state.attrData = data
  }
}

const actions ={}

const getters = {
  attrData: state => state.attrData,
  eventData: state => state.eventData,
  slotData: state => state.slotData
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
