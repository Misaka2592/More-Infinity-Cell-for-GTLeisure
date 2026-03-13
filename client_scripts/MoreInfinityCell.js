JEIEvents.subtypes(event => {
    event.useNBT('expatternprovider:infinity_cell')
})
const infinity_cell_item = [
    'kubejs:basic_control_circuit',
    'kubejs:advanced_control_circuit',
    'kubejs:elite_control_circuit',
    'kubejs:ultimate_control_circuit',
    'kubejs:ultima_control_circuit',
    'gtceu:micro_processor_mainframe',
    'gtceu:nano_processor_mainframe',
    'gtceu:quantum_processor_mainframe',
    'gtceu:crystal_processor_mainframe',
    'gtceu:wetware_processor_mainframe',
    'kubejs:bioware_mainframe',
    'kubejs:optical_mainframe',
    'kubejs:exotic_mainframe',
    'kubejs:cosmic_mainframe',
    'kubejs:supracausal_mainframe',
    'kubejs:ulv_universal_circuit',
    'kubejs:lv_universal_circuit',
    'kubejs:mv_universal_circuit',
    'kubejs:hv_universal_circuit',
    'kubejs:ev_universal_circuit',
    'kubejs:iv_universal_circuit',
    'kubejs:luv_universal_circuit',
    'kubejs:zpm_universal_circuit',
    'kubejs:uv_universal_circuit',
    'kubejs:uhv_universal_circuit',
    'kubejs:uev_universal_circuit',
    'kubejs:uiv_universal_circuit',
    'kubejs:uxv_universal_circuit',
    'kubejs:opv_universal_circuit',
    'kubejs:max_universal_circuit'
]
const infinity_cell_fluid = [
    'gtceu:infinity'
]
const inf_cell_i = (id) => {
    return Item.of('expatternprovider:infinity_cell', '{record:{"#c":"ae2:i",id:"' + id + '"}}')
}
const inf_cell_f = (id) => {
    return Item.of('expatternprovider:infinity_cell', '{record:{"#c":"ae2:f",id:"' + id + '"}}')
}
JEIEvents.addItems(event => {

    infinity_cell_item.slice(0, 15).forEach(element => {
        event.add(inf_cell_i(element))
    })
    infinity_cell_fluid.forEach(element => {
        event.add(inf_cell_f(element))
    })
    infinity_cell_item.slice(15).forEach(element => {
        event.add(Item.of('expatternprovider:infinity_cell', '{record:{"#c":"ae2:i",id:"' + element + '"}}').withNBT({display:{Lore:['[{"text":"使用","color":"blue"},{"text":"同电压等级","color":"yellow"},{"text":"的","color":"#007bff"},{"text":"无","color":"red"},{"text":"限","color":"gold"},{"text":"通","color":"yellow"},{"text":"用","color":"green"},{"text":"电","color":"dark_green"},{"text":"路","color":"dark_gray"},{"text":"元件合成","color":"#007bff"}]','["",{"text":"扬了你的密藏之匣吧，"},{"text":"！？虽虽？！","bold":true,"color":"aqua"}]']}}))
    })
    event.add(inf_cell_i('kubejs:infinity_antimatter_fuel_rod'))
    event.add(inf_cell_i('kubejs:pellet_antimatter'))
    event.add(inf_cell_i('kubejs:annihilation_constrainer'))
    event.add(inf_cell_i('pipez:infinity_upgrade'))
    event.add(inf_cell_i('gtceu:ancient_gold_coin'))
})