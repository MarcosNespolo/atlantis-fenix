// Importa módulos
const router = require('express').Router();
const Especie = require('../models/especie.model').Especie;

// Rota para atualizar os atributos do aquario
router.route('/azula/atualizaAquario').get((req, res) => {
    let especie = req.body.especie;
    let aquario = req.body.aquario;

    //====================================//
    //=======COM TAMANHO INDEFINIDO=======//
    //====================================//
    if (!req.body.aquarioDefinido) {

        if (especie.larguraMinimaAquario > aquario.larguraMinima)
            aquario.larguraMinima = especie.larguraMinimaAquario;

        if (especie.alturaMinimaAquario > aquario.colunaDagua)
            aquario.colunaDagua = especie.alturaMinimaAquario;

        if (aquario.especies.includes(especie.nomeComumPortugues))
            aquario.volumeMinimo += especie.volumeMinimoCardume;
        else
            aquario.volumeMinimo += especie.volumeMinimoSozinho;
    }
    //====================================//
    //========COM TAMANHO DEFINIDO========//
    //====================================//
    else {
        if (aquario.especies.includes(especie.nomeComumPortugues))
            aquario.volumeRestante -= especie.volumeMinimoCardume;
        else
            aquario.volumeRestante -= especie.volumeMinimoSozinho;
    }

    //====================================//
    //====INDEPENDE DE TAMANHO DEFINIDO===//
    //====================================//
    if (especie.temperaturaMinima > aquario.temperaturaMinima)
        aquario.temperaturaMinima = especie.temperaturaMinima;

    if (especie.temperaturaMaxima < aquario.temperaturaMaxima)
        aquario.temperaturaMaxima = especie.temperaturaMaxima;

    if (especie.phMinimo > aquario.phMinimo)
        aquario.phMinimo = especie.phMinimo;

    if (especie.phMaximo < aquario.phMaximo)
        aquario.phMaximo = especie.phMaximo;

    if (especie.gdhMinimo > aquario.gdhMinimo)
        aquario.gdhMinimo = especie.gdhMinimo;

    if (especie.gdhMaximo < aquario.gdhMaximo)
        aquario.gdhMaximo = especie.gdhMaximo;

    if (especie.salinidadeMinima > aquario.salinidadeMinima)
        aquario.salinidadeMinima = especie.salinidadeMinima;

    if (especie.salinidadeMaxima < aquario.salinidadeMaxima)
        aquario.salinidadeMaxima = especie.salinidadeMaxima;

    res.json(aquario);
});


// Rota que calcula as compatibilidades do ecossistema
router.route('/azula/compatibilidades-azula').get((req, res) => {
    let especieLista = req.body.especie;
    let aquario = req.body.aquario;
    let compatibilidades = [{
        fonte: '',
        problema: ''
    }]

    //====================================//
    //====COMPATIBILIDADES COM AQUARIO====//
    //====================================//
    if (aquario.temperatura > especieLista.temperaturaMaxima)
        compatibilidades.push({ fonte: 'Aquario', problema: 'Temperatura muito alta.' });

    if (aquario.temperatura < especieLista.temperaturaMinima)
        compatibilidades.push({ fonte: 'Aquario', problema: 'Temperatura muito baixa.' });

    if (aquario.ph > especieLista.phMaximo)
        compatibilidades.push({ fonte: 'Aquario', problema: 'pH muito alto.' });

    if (aquario.ph < especieLista.phMinimo)
        compatibilidades.push({ fonte: 'Aquario', problema: 'pH muito baixo.' });

    if (aquario.gdh > especieLista.gdhMaximo)
        compatibilidades.push({ fonte: 'Aquario', problema: 'gdh muito alto.' });

    if (aquario.gdh < especieLista.gdhMinimo)
        compatibilidades.push({ fonte: 'Aquario', problema: 'gdh muito baixo.' });

    if (aquario.salinidade > especieLista.salinidadeMaxima)
        compatibilidades.push({ fonte: 'Aquario', problema: 'Salinidade muito alta.' });

    if (aquario.salinidade < especieLista.salinidadeMinima)
        compatibilidades.push({ fonte: 'Aquario', problema: 'Salinidade muito baixa.' });

    if (aquario.alturaMinima < especieLista.alturaMinima)
        compatibilidades.push({ fonte: 'Aquario', problema: 'Altura insuficiente.' });

    if (aquario.larguraMinima < especieLista.larguraMinima)
        compatibilidades.push({ fonte: 'Aquario', problema: 'Largura insuficiente.' });

    if (!aquario.especies.includes(especieLista.nomeComumPortugues) && aquario.volumeRestante < especieLista.volumeMinimoSozinho)
        compatibilidades.push({ fonte: 'Aquario', problema: 'Espaço insuficiente.' });

    if (aquario.especies.includes(especieLista.nomeComumPortugues) && aquario.volumeRestante < especieLista.volumeMinimoCardume)
        compatibilidades.push({ fonte: 'Aquario', problema: 'Espaço insuficiente.' });

    //ESTADO DA AGUA

    //POSIÇÃO

    //SUBSTRATO INDICADO

    if (aquario.especies.filter((v) => (v === especieLista.nomeComumPortugues)).length === especieLista.cardumeMaximo)
        compatibilidades.push({ fonte: especieLista.nomeComumPortugues, problema: 'Sem espaço no cardume da espécie.' });

    //CARDUME MINIMO É VERIFICADO AO SALVAR

    //====================================//
    //====COMPATIBILIDADES COM ESPECIE====//
    //====================================//
    req.body.adicionados.forEach(nomeEspecie => {
        Especie.findOne({ nomeComumPortugues: nomeEspecie })
            .then(especie => {

                if (especieLista.nomeCientifico === especie.nomeCientifico && especieLista.temperamentoMesmaEspecie === 'Agressivo')
                    compatibilidades.push({ fonte: especie.nomeComumPortugues, problema: 'Agressivo com a mesma espécie.' });

                if (especieLista.nomeCientifico !== especie.nomeCientifico && especieLista.temperamentoOutraEspecie === 'Agressivo')
                    compatibilidades.push({ fonte: especie.nomeComumPortugues, problema: 'Agressivo com outra espécie.' });

                //DIMORFISMO SEXUAL

                //REPRODUÇÃO

                //OBSERVAÇÕES

                res.json(compatibilidades);
            })
            .catch(err => res.status(400).json('Error: ' + err));
    });
});


// ROTA QUE TRATA AS COMPATIBILIDADES ANTES DE SALVAR O AQUÁRIO
router.route('/azula/compatibilidades-save').get((req, res) => {
    let aquario = req.body.aquario;
    let compatibilidades = [{
        fonte: '',
        problema: ''
    }]

    aquario.especies.forEach(nomeEspecie => {
        Especie.findOne({ nomeComumPortugues: nomeEspecie })
            .then(especie => {
                if (aquario.especies.filter((v) => (v === especie.nomeComumPortugues)).length < especie.cardumeMinimo)
                    compatibilidades.push({ fonte: especie.nomeComumPortugues, 
                        problema: `Cardume da espécie ${especie.nomeComumPortugues} muito pequeno. Cardume Mínimo: ${especie.cardumeMiximo}.`});
                res.json(compatibilidades);
            })
            .catch(err => res.status(400).json('Error: ' + err));
    });
});