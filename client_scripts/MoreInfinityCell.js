JEIEvents.subtypes(event => {
    event.useNBT('expatternprovider:infinity_cell')
})

const RAINBOW_MARQUEE_COLORS = ['§c', '§6', '§e', '§a', '§b', '§9', '§d']
const RAINBOW_MARQUEE_RESET = '§r'
const RAINBOW_MARQUEE_INTERVAL_MS = 140

function createRainbowMarqueeText(text, offset) {
    let output = ''

    for (let i = 0; i < text.length; i++) {
        output += RAINBOW_MARQUEE_COLORS[(i + offset) % RAINBOW_MARQUEE_COLORS.length]
        output += text.charAt(i)
    }

    return output + RAINBOW_MARQUEE_RESET
}

function getRainbowMarqueeOffset() {
    return Math.floor(Date.now() / RAINBOW_MARQUEE_INTERVAL_MS) % RAINBOW_MARQUEE_COLORS.length
}

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
        event.add(inf_cell_i(element))
    })
    event.add(inf_cell_i('kubejs:infinity_antimatter_fuel_rod'))
    event.add(inf_cell_i('kubejs:pellet_antimatter'))
    event.add(inf_cell_i('kubejs:annihilation_constrainer'))
    event.add(inf_cell_i('pipez:infinity_upgrade'))
    event.add(inf_cell_i('gtceu:ancient_gold_coin'))
    
    event.add(inf_cell_f('moreinfinitycell:disposable_catalyst'))
    //聚灵转枢符无限元件注册
    //暂定该形式的不消耗物品，之后可能会改成每个物品单独注册
    //2026.3.15

    event.add(inf_cell_i('moreinfinitycell:disposable_catalyst'))

    
})

const infinityCellVoltageById = {
    'kubejs:ulv_universal_circuit': 'ULV',
    'kubejs:lv_universal_circuit': 'LV',
    'kubejs:mv_universal_circuit': 'MV',
    'kubejs:hv_universal_circuit': 'HV',
    'kubejs:ev_universal_circuit': 'EV',
    'kubejs:iv_universal_circuit': 'IV',
    'kubejs:luv_universal_circuit': 'LUV',
    'kubejs:zpm_universal_circuit': 'ZPM',
    'kubejs:uv_universal_circuit': 'UV',
    'kubejs:uhv_universal_circuit': 'UHV',
    'kubejs:uev_universal_circuit': 'UEV',
    'kubejs:uiv_universal_circuit': 'UIV',
    'kubejs:uxv_universal_circuit': 'UXV',
    'kubejs:opv_universal_circuit': 'OPV',
    'kubejs:max_universal_circuit': 'MAX'
}

ItemEvents.tooltip(event => {
    event.addAdvanced('expatternprovider:infinity_cell', (stack, advanced, text) => {
        const nbt = stack.nbt
        if (!nbt || !nbt.record) return

        const record = nbt.record
        const type = String(record['#c'] || '')
        const id = String(record.id || '')
        const voltage = infinityCellVoltageById[id]

        if (type !== 'ae2:i') return
        if (!voltage) return

        text.add('')
        text.add('§9使用§e' + voltage + '电压§3的' + createRainbowMarqueeText('无限元件', getRainbowMarqueeOffset()) + '§3合成')
        text.add('§7扬了你的密藏之匣吧，§b§l！？虽虽？！')
    })
})

const all_circuit_tooltip = {
    'kubejs:basic_control_circuit': 'ULV',
    'kubejs:advanced_control_circuit': 'LV',
    'kubejs:elite_control_circuit': 'MV',
    'kubejs:ultimate_control_circuit': 'HV',
    'kubejs:ultima_control_circuit': 'EV',
    'gtceu:micro_processor_mainframe': 'IV',
    'gtceu:nano_processor_mainframe': 'LUV',
    'gtceu:quantum_processor_mainframe': 'ZPM',
    'gtceu:crystal_processor_mainframe': 'UV',
    'gtceu:wetware_processor_mainframe': 'UHV',
    'kubejs:bioware_mainframe': 'UEV',
    'kubejs:optical_mainframe': 'UIV',
    'kubejs:exotic_mainframe': 'UXV',
    'kubejs:cosmic_mainframe': 'OPV',
    'kubejs:supracausal_mainframe': 'MAX'
}

ItemEvents.tooltip(event => {
    event.addAdvanced('expatternprovider:infinity_cell', (stack, advanced, text) => {
        const nbt = stack.nbt
        if (!nbt || !nbt.record) return

        const record = nbt.record
        const type = String(record['#c'] || '')
        const id = String(record.id || '')
        const voltage = all_circuit_tooltip[id]

        if (type !== 'ae2:i') return
        if (!voltage) return
        
        text.add('')
        text.add(createRainbowMarqueeText(voltage + '无限电路主机元件', getRainbowMarqueeOffset()))
        text.add('§7这是什么？！§b§l到底有多强？！')
        if(event.shift){
            text.add('§7可以用来合成§e' + createRainbowMarqueeText(voltage + '无限通用电路元件', getRainbowMarqueeOffset()))
        } else {
            text.add('§7按住§eShift§7查看用途')
        }
    })

    event.addAdvanced('expatternprovider:infinity_cell', (stack, advanced, text) => {
        const nbt = stack.nbt
        if (!nbt || !nbt.record) return

        const record = nbt.record
        const type = String(record['#c'] || '')
        const id = String(record.id || '')

        if (type !== 'ae2:i') return
        if (id !== 'moreinfinitycell:disposable_catalyst') return

        text.add('')
        text.add('§2让你拥有' + createRainbowMarqueeText('无限的聚灵转枢符', getRainbowMarqueeOffset()))
    })
})

ItemEvents.tooltip(event => {
    newItemsMIC = [
        'moreinfinitycell:disposable_catalyst'
    ]
    newItemsMIC.forEach(itemId => {
        event.addAdvanced(itemId, (stack, advanced, text) => {
            text.add('')
            text.add(createRainbowMarqueeText('由MoreInfinityCell提供', getRainbowMarqueeOffset()))
        })
    })
})