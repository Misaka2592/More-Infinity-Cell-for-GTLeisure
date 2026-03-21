//requires: gtladditions
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
        { id: 'basic_upgrade', n: 1, it: '4x minecraft:iron_ingot' },
        { id: 'improved_upgrade', n: 2, it: '4x minecraft:gold_ingot' },
        { id: 'advanced_upgrade', n: 3, it: '4x minecraft:diamond' },
        { id: 'ultimate_upgrade', n: 4, it: '2x pipez:advanced_upgrade' },
        { id: 'infinity_upgrade', n: 5, it: '2x pipez:ultimate_upgrade' }
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
        {
            lvl: 'basic', volt: 'ulv', n: 1,
            inputi: ['1024x kubejs:unstable_star', '256x kubejs:rydberg_spinorial_assembly', '1024x kubejs:draconic_core', '256x kubejs:x_ray_laser'],
            inputf: ['gtceu:quantanium 1024000', 'gtceu:cinobite 1024000', 'gtceu:black_titanium 1024000', 'gtceu:echoite 1024000']
        },
        {
            lvl: 'advanced', volt: 'lv', n: 2,
            inputi: ['1024x kubejs:scintillator', '256x kubejs:ultrashort_pulse_laser', '1024x kubejs:wyvern_core', '256x kubejs:proto_matter'],
            inputf: ['gtceu:heavy_quark_degenerate_matter 1024000', 'gtceu:cosmic_superconductor 1024000', 'gtceu:legendarium 1024000', 'gtceu:periodicium 1024000']
        },
        {
            lvl: 'elite', volt: 'mv', n: 3,
            inputi: ['1024x kubejs:resonating_gem', '256x kubejs:eigenfolded_kerr_manifold', '1024x kubejs:awakened_core', '256x avaritia:infinity_catalyst'],
            inputf: ['gtceu:radox 1024000', 'gtceu:high_energy_quark_gluon_plasma 1024000', 'gtceu:draconium 1024000', 'gtceu:liquid_cosmic_mesh 1024000']
        },
        {
            lvl: 'ultimate', volt: 'hv', n: 4,
            inputi: ['1024x kubejs:quantum_anomaly', '256x kubejs:black_body_naquadria_supersolid', '1024x kubejs:chaotic_core', '256x kubejs:draconic_energy_core'],
            inputf: ['gtceu:magnetohydrodynamicallyconstrainedstarmatter 1024000', 'gtceu:spacetime 1024000', 'gtceu:eternity 1024000', 'gtceu:shirabon 1024000']
        },
        {
            lvl: 'ultima', volt: 'ev', n: 5,
            inputi: ['1024x minecraft:repeating_command_block', '256x gtladditions:relativistic_heat_capacitor', '1024x gtladditions:strange_annihilation_fuel_rod', '256x gtladditions:astral_array'],
            inputf: ['gtladditions:creon 1024000', 'gtladditions:proto_halkonite 1024000', 'gtceu:miracle 1024000', 'gtladditions:star_gate_crystal_slurry 1024000']
        }
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
        { lvl: 'basic', volt: 'ulv', n: 1 },
        { lvl: 'advanced', volt: 'lv', n: 2 },
        { lvl: 'elite', volt: 'mv', n: 3 },
        { lvl: 'ultimate', volt: 'hv', n: 4 },
        { lvl: 'ultima', volt: 'ev', n: 5 },

        { lvl: 'micro', volt: 'iv', n: 6 },
        { lvl: 'nano', volt: 'luv', n: 7 },
        { lvl: 'quantum', volt: 'zpm', n: 8 },
        { lvl: 'crystal', volt: 'uv', n: 9 },
        { lvl: 'wetware', volt: 'uhv', n: 10 },

        { lvl: 'bioware', volt: 'uev', n: 11 },
        { lvl: 'optical', volt: 'uiv', n: 12 },
        { lvl: 'exotic', volt: 'uxv', n: 13 },
        { lvl: 'cosmic', volt: 'opv', n: 14 },
        { lvl: 'supracausal', volt: 'max', n: 15 }
    ]
    all_circuit.forEach(ac => {
        let id_i = ''
        let n = ac.n
        if (1 <= n && n <= 5) {
            id_i = 'kubejs:' + ac.lvl + '_control_circuit'
        } else if (6 <= n && n <= 10) {
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
            .itemOutputs(inf_cell_i(id_o))
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
        .inputFluids('gtceu:silicone_rubber 1024000')
        .itemOutputs(inf_cell_i('gtceu:ancient_gold_coin'))
        .EUt(GTValues.VA[GTValues.ZPM])
        .duration(1234)
        .stationResearch(b => b.researchStack('gtceu:neutronium_credit')
            .dataStack('gtceu:data_module')
            .EUt(GTValues.VA[GTValues.ZPM])
            .CWUt(32, 1024)
        )

    //添加聚灵转枢符的配方
    
    event.shaped(
        'moreinfinitycell:disposable_catalyst',
        [
            'ABA',
            'BGB',
            'ABA'
        ],
        {
            A: 'gtceu:small_bronze_gear',
            B: 'gtceu:steel_gear',
            G: 'gtceu:empty_mold'
        }
    )

    //添加无限聚灵转枢符元件的配方
    event.shaped(
        inf_cell_i('moreinfinitycell:disposable_catalyst'),
        [
            'ABA',
            'BCB',
            'DDD'
        ],
        {
            A: 'ae2:quartz_glass',
            B: 'moreinfinitycell:disposable_catalyst',
            C: 'ae2:cell_component_16k',
            D: 'minecraft:diamond'
        }
    )
    
    // 压模器配方改造：模头 -> 对应编程电路
    // 流体固化机配方改造：模具 -> 对应编程电路
    const extruderMoldCircuitMap = {
        'gtceu:plate_extruder_mold': 14,
        'gtceu:rod_extruder_mold': 15,
        'gtceu:bolt_extruder_mold': 16,
        'gtceu:ring_extruder_mold': 17,
        'gtceu:cell_extruder_mold': 18,
        'gtceu:ingot_extruder_mold': 19,
        'gtceu:wire_extruder_mold': 20,
        'gtceu:tiny_pipe_extruder_mold': 21,
        'gtceu:small_pipe_extruder_mold': 22,
        'gtceu:normal_pipe_extruder_mold': 23,
        'gtceu:large_pipe_extruder_mold': 24,
        'gtceu:huge_pipe_extruder_mold': 25,
        'gtceu:block_extruder_mold': 26,
        'gtceu:gear_extruder_mold': 27,
        'gtceu:bottle_extruder_mold': 28,
        'gtceu:foil_extruder_mold': 29,
        'gtceu:small_gear_extruder_mold': 30,
        'gtceu:long_rod_extruder_mold': 31,
        'gtceu:rotor_extruder_mold': 32
    }

    const solidifierMoldCircuitMap = {
        'gtceu:pillar_casting_mold': 17,
        'gtceu:cylinder_casting_mold': 18,
        'gtceu:anvil_casting_mold': 19,
        'gtceu:ball_casting_mold': 20,
        'gtceu:block_casting_mold': 21,
        'gtceu:bottle_casting_mold': 22,
        'gtceu:credit_casting_mold': 23,
        'gtceu:gear_casting_mold': 24,
        'gtceu:ingot_casting_mold': 25,
        'gtceu:nugget_casting_mold': 26,
        'gtceu:plate_casting_mold': 27,
        'gtceu:rod_casting_mold': 28,
        'gtceu:ring_casting_mold': 29,
        'gtceu:small_gear_casting_mold': 30,
        'gtceu:name_casting_mold': 31,
        'gtceu:rotor_casting_mold': 32
    }

    const unquote = (value) => {
        if (value == null) return ''
        const text = String(value)
        return text.startsWith('"') && text.endsWith('"') ? text.slice(1, -1) : text
    }


    const jsonPathGet = (root, path) => {
        let current = root
        for (let i = 0; i < path.length; i++) {
            if (current == null || typeof current.get !== 'function') return null
            current = current.get(path[i])
        }
        return current
    }

    const formatStack = (id, count) => {
        return `${count}x ${id}`
    }


    const getRecipePath = (recipeId) => {
        const id = String(recipeId)
        const noNamespace = id.includes(':') ? id.split(':')[1] : id
        return noNamespace.includes('/') ? noNamespace.split('/').slice(-1)[0] : noNamespace
    }

    event.forEachRecipe({ type: 'gtceu:extruder' }, r => {
        let oldId = String(r.getId())
        let path = getRecipePath(oldId)
        let recipeJson = r.json

        let inputIngredient = `#${unquote(jsonPathGet(recipeJson, ['inputs', 'item', 0, 'content', 'ingredient', 'tag']))}`
        let rawInputMold = jsonPathGet(recipeJson, ['inputs', 'item', 1, 'content', 'ingredient', 'item'])
        let inputCountIngredient = jsonPathGet(recipeJson, ['inputs', 'item', 0, 'content', 'count'])
        let rawOutputItem = jsonPathGet(recipeJson, ['outputs', 'item', 0, 'content', 'ingredient', 'item'])
        let outputCount = jsonPathGet(recipeJson, ['outputs', 'item', 0, 'content', 'count'])
        let eut = jsonPathGet(recipeJson, ['tickInputs', 'eu', 0, 'content'])
        let duration = jsonPathGet(recipeJson, ['duration'])
        if (inputIngredient == null || rawInputMold == null || rawOutputItem == null) return

        let inputMold = unquote(rawInputMold)
        let outputItem = unquote(rawOutputItem)
        if (inputIngredient === '' || inputMold === '' || outputItem === '') return

        let circuit = extruderMoldCircuitMap[inputMold]
        if (circuit == null) return

        ergt.assembler(`moreinfinitycell:${path}_easy_extruding`)
            .itemInputs('moreinfinitycell:disposable_catalyst')
            .itemInputs(formatStack(inputIngredient, inputCountIngredient))
            .itemOutputs(formatStack(outputItem, outputCount))
            .duration(duration)
            .circuit(circuit)
            .EUt(eut)
    })

    event.forEachRecipe({ type: 'gtceu:fluid_solidifier' }, r => {
        let fsRecipeId = String(r.getId())
        let path = getRecipePath(fsRecipeId)
        let recipeJson = r.json
        let rawInputMold = jsonPathGet(recipeJson, ['inputs', 'item', 0, 'content', 'ingredient', 'item'])
        if (rawInputMold == null) {
            rawInputMold = jsonPathGet(recipeJson, ['notConsumable', 'item', 0, 'content', 'ingredient', 'item'])
        }
        let rawInputFluid = jsonPathGet(recipeJson, ['inputs', 'fluid', 0, 'content', 'value', 0, 'tag'])
        let inputFluidAmount = jsonPathGet(recipeJson, ['inputs', 'fluid', 0, 'content', 'amount'])
        let rawOutputItem = jsonPathGet(recipeJson, ['outputs', 'item', 0, 'content', 'ingredient', 'item'])
        let eut = jsonPathGet(recipeJson, ['tickInputs', 'eu', 0, 'content'])
        let duration = jsonPathGet(recipeJson, ['duration'])
        let inputMold = unquote(rawInputMold)
        if (inputMold == null) return
        let inputFluid = unquote(rawInputFluid).slice('forge:'.length)

//兼容gtladditions的临时办法，后续可能会重构(2026.3.21)
        const otherFluidsByMods = [{
            mod : 'gtladditions',
            fluids : [
                'creon',
                'proto_halkonite',
                'mellion'
            ]
        }]
        const exists = otherFluidsByMods.some(modEntry => Array.isArray(modEntry.fluids) && modEntry.fluids.includes(inputFluid))
        if (exists){
            inputFluid = `gtladditions:${inputFluid}`
        } else {
            inputFluid = `gtceu:${inputFluid}`
        }
        
        let outputItem = unquote(rawOutputItem)
        let outputCount = 1
        let circuit = solidifierMoldCircuitMap[inputMold]
        if(circuit == null) return
        ergt.assembler(`moreinfinitycell:${path}_easy_solidifying`)
            .itemInputs('moreinfinitycell:disposable_catalyst')
            .inputFluids(`${inputFluid} ${inputFluidAmount}`)
            .itemOutputs(formatStack(outputItem, outputCount))
            .duration(duration)
            .EUt(eut)
            .circuit(circuit)
    })

})