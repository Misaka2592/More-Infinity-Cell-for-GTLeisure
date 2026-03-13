//requires: gtladditions
//requires: gtl_extend
//priority: -1

ServerEvents.recipes(event => {
    const ergt = event.recipes.gtceu
    //无限元件
    //Item.of('expatternprovider:infinity_cell', '{record:{"#c":"ae2:i",id:"' + id + '"}}')
    const inf_cell_i = (id) => {
        return Item.of('expatternprovider:infinity_cell', '{record:{"#c":"ae2:i",id:"' + id + '"}}')
    }
    const inf_cell_f = (id) => {
        return Item.of('expatternprovider:infinity_cell', '{record:{"#c":"ae2:f",id:"' + id + '"}}')
    }

    //反物质，湮灭约束器，液态无尽无限元件
    //意义不明的拆解配方()
    ergt.disassembly("moreinfinitycell:antimatter_fuel_rod_cell")
        .itemInputs((inf_cell_i('kubejs:infinity_antimatter_fuel_rod')).weakNBT())
        .itemOutputs(inf_cell_i('kubejs:infinity_antimatter_fuel_rod'))
        .itemOutputs(inf_cell_i('kubejs:pellet_antimatter'))
        .itemOutputs(inf_cell_i('kubejs:annihilation_constrainer'))
        .itemOutputs(inf_cell_f('gtceu:infinity'))
        .EUt(16384 * GTValues.VA[GTValues.MAX])
        .duration(4000)
    
    //pipez管道升级无限元件，补充了无限管道升级的配方，增加了其他管道升级的配方
    const pip_up = [
        {id:'basic_upgrade',      n : 1, it : '4x minecraft:iron_ingot'},
        {id:'improved_upgrade',   n : 2, it : '4x minecraft:gold_ingot'},
        {id:'advanced_upgrade',   n : 3, it : '4x minecraft:diamond'},
        {id:'ultimate_upgrade',   n : 4, it : '2x pipez:advanced_upgrade'},
        {id:'infinity_upgrade',   n : 5, it : '2x pipez:ultimate_upgrade'}
    ]
    pip_up.forEach(element => {
        ergt.assembler("moreinfinitycell:" + element.id)
            .itemInputs(element.it)
            .inputFluids('gtceu:redstone ' + 144 * (4 ** element.n))
            .itemOutputs('pipez:' + element.id)
            .circuit(20)
            .EUt(8 ** element.n)
            .duration(1)
    })
    
        
    ergt.assembly_line("moreinfinitycell:infinity_upgrade_cell")
        .itemInputs('1x gtlcore:cell_component_256m')
        .itemInputs('1024x pipez:infinity_upgrade')
        .itemInputs('256x gtceu:neutron_reflector')
        .itemInputs('128x #gtceu:circuits/zpm')
        .inputFluids('gtceu:fall_king 16000')
        .inputFluids('gtceu:duranium 16000')
        .inputFluids('gtceu:europium 16000')
        .inputFluids('gtceu:trinium 16000')
        .itemOutputs(inf_cell_i('pipez:infinity_upgrade'))
        .EUt(GTValues.VA[GTValues.ZPM])
        .duration(1)
        .stationResearch(b => b.researchStack('pipez:infinity_upgrade')
            .dataStack("gtceu:data_orb")
            .EUt(GTValues.VA[GTValues.ZPM])
            .CWUt(96, 9600)
        )

    //通过mek控制电路制造ulv到ev电路板的无限元件
    const control_circuit = [
        { lvl: 'basic',     volt: 'ulv', n: 1 , 
            inputi: ['1024x kubejs:unstable_star', '256x kubejs:rydberg_spinorial_assembly', '1024x kubejs:draconic_core', '256x kubejs:x_ray_laser'],
            inputf : ['gtceu:quantanium 1024000', 'gtceu:cinobite 1024000', 'gtceu:black_titanium 1024000', 'gtceu:echoite 1024000']},
        { lvl: 'advanced',  volt: 'lv',  n: 2 , 
            inputi: ['1024x kubejs:scintillator', '256x kubejs:ultrashort_pulse_laser', '1024x kubejs:wyvern_core', '256x kubejs:proto_matter'], 
            inputf : ['gtceu:heavy_quark_degenerate_matter 1024000', 'gtceu:cosmic_superconductor 1024000', 'gtceu:legendarium 1024000', 'gtceu:periodicium 1024000']},
        { lvl: 'elite',     volt: 'mv',  n: 3 , 
            inputi: ['1024x kubejs:resonating_gem', '256x kubejs:eigenfolded_kerr_manifold', '1024x kubejs:awakened_core', '256x avaritia:infinity_catalyst'], 
            inputf : ['gtceu:radox 1024000', 'gtceu:high_energy_quark_gluon_plasma 1024000', 'gtceu:draconium 1024000', 'gtceu:liquid_cosmic_mesh 1024000']},
        { lvl: 'ultimate',  volt: 'hv',  n: 4 , 
            inputi: ['1024x kubejs:quantum_anomaly', '256x kubejs:black_body_naquadria_supersolid', '1024x kubejs:chaotic_core', '256x kubejs:draconic_energy_core'], 
            inputf : ['gtceu:magnetohydrodynamicallyconstrainedstarmatter 1024000', 'gtceu:spacetime 1024000', 'gtceu:eternity 1024000', 'gtceu:shirabon 1024000']},
        { lvl: 'ultima',    volt: 'ev',  n: 5 , 
            inputi: ['1024x minecraft:repeating_command_block', '256x gtladditions:relativistic_heat_capacitor', '1024x gtladditions:strange_annihilation_fuel_rod', '256x gtladditions:astral_array'], 
            inputf : ['gtladditions:creon 1024000', 'gtladditions:proto_halkonite 1024000', 'gtceu:miracle 1024000', 'gtladditions:star_gate_crystal_slurry 1024000']}
    ]
    control_circuit.forEach(cc => {
        const id_o = 'kubejs:' + cc.lvl + '_control_circuit'
        ergt.assembly_line("moreinfinitycell:" + cc.lvl + "_control_circuit_cell")
            .notConsumable("64x thetornproductionline:circult_process_module_2")
            .itemInputs("2147483647x kubejs:" + cc.lvl + "_control_circuit")
            .itemInputs("1x gtlcore:cell_component_256m")
            .itemInputs("1024x kubejs:precision_circuit_assembly_robot_mk" + cc.n)
            .itemInputs(cc.inputi)
            .inputFluids(cc.inputf)
            .itemOutputs(inf_cell_i(id_o))
            .EUt(GTValues.VA[GTValues.UHV] * (4 ** cc.n))
            .duration(10000)
            .stationResearch(b => b.researchStack(id_o)
                .dataStack("gtceu:data_module")
                .EUt(GTValues.VA[GTValues.UHV] * (4 ** cc.n))
                .CWUt(1024 * (4 ** cc.n), 16384 * (8 ** cc.n)))
    })

    //通用电路板无限元件
    const all_circuit = [
        { lvl: 'basic',       volt: 'ulv', n: 1},
        { lvl: 'advanced',    volt: 'lv',  n: 2},
        { lvl: 'elite',       volt: 'mv',  n: 3},
        { lvl: 'ultimate',    volt: 'hv',  n: 4},
        { lvl: 'ultima',      volt: 'ev',  n: 5},

        { lvl: 'micro',       volt: 'iv',  n: 6},
        { lvl: 'nano',        volt: 'luv', n: 7},
        { lvl: 'quantom',     volt: 'zpm', n: 8},
        { lvl: 'crystal',     volt: 'uv',  n: 9},
        { lvl: 'wetware',     volt: 'uhv', n: 10},

        { lvl: 'bioware',     volt: 'uev', n: 11},
        { lvl: 'optical',     volt: 'uiv', n: 12},
        { lvl: 'exotic',      volt: 'uxv', n: 13},
        { lvl: 'cosmic',      volt: 'opv', n: 14},
        { lvl: 'supracausal', volt: 'max', n: 15}
    ]
    all_circuit.forEach(ac => {
        let id_i = ''
        let n = ac.n
        if(1 <= n && n <= 5){
            id_i = 'kubejs:' + ac.lvl + '_control_circuit'
        } else if(6 <= n && n <= 10) {
            id_i = 'gtceu:' + ac.lvl + '_processor_mainframe'
        } else {
            id_i = 'kubejs:' + ac.lvl + '_mainframe'
        }
        const id_o = 'kubejs:' + ac.volt + '_universal_circuit'
        ergt.suprachronal_assembly_line("moreinfinitycell:" + ac.volt + "_universal_circuit_cell")
            .notConsumable(inf_cell_i(id_i).weakNBT())
            .itemInputs('gtlcore:fast_infinity_cell')
            .itemInputs('1000000x gtladditions:arcane_cache_vault')
            .itemInputs('16x gtladditions:thread_modifier_hatch')
            .itemInputs('1024x gtladditions:astral_array')
            .inputFluids('gtceu:miracle_adhesive 123000000')
            .inputFluids('gtceu:eternity 123000000')
            .inputFluids('gtceu:uu_matter 123000000000')
            .itemOutputs(inf_cell_i(id_o).withNBT({display:{Lore:['[{"text":"使用","color":"blue"},{"text":"同电压等级","color":"yellow"},{"text":"的","color":"#007bff"},{"text":"无","color":"red"},{"text":"限","color":"gold"},{"text":"通","color":"yellow"},{"text":"用","color":"green"},{"text":"电","color":"dark_green"},{"text":"路","color":"dark_gray"},{"text":"元件合成","color":"#007bff"}]','["",{"text":"扬了你的密藏之匣吧，"},{"text":"！？虽虽？！","bold":true,"color":"aqua"}]']}}))
            .EUt(GTValues.VA[GTValues.MAX] * 16384)
            .duration(114514)
            .stationResearch(b => b.researchStack(id_o)
                .dataStack("gtceu:data_module")
                .EUt(2147483647)
                .CWUt(4194304, 4194304)
            )
    })

    //上古金币无限元件
    ergt.assembly_line("moreinfinitycell:ancient_gold_coin_cell")
        .itemInputs('1024x gtceu:fishing_ground')
        .itemInputs('16384x minecraft:fishing_rod')
        .itemInputs('256x gtceu:luv_parallel_hatch')
        .itemInputs('gtlcore:cell_component_64m')
        .inputFluids('gtceu:soldering_alloy 1024000')
        .inputFluids('gtceu:silicon_rubber 1024000')
        .itemOutputs(inf_cell_i('gtceu:ancient_gold_coin'))
        .EUt(GTValues.VA[GTValues.ZPM])
        .duration(1234)
        .stationResearch(b => b.researchStack('gtceu:neutronium_credit')
            .dataStack('gtceu:data_module')
            .EUt(GTValues.VA[GTValues.ZPM])
            .CWUt(32,1024)
        )
    

})