

var documents = [
    

    

    {
        "id": 0,
        "url": "/pedra-de-roseta/",
        "title": "Pedra de Roseta - 5 minutos de História",
        "body": "A série 5 minutos de história de hoje está imperdível! Vamos falar sobre um tesouro deixado pela civilizaçãoegípcia: a Pedra de Roseta. Embarque nessa viagem ao passado e descubra o porquê esse tesouro é tãovalioso para a nossa civilização. Você verá que nem todo tesouro é formado por pedras preciosas e que existem artefatosque são muito valiosos por seus valores históricos e emocionais. Assista abaixo ao episódio Pedra de Roseta da série 5 minutos de História: Antes de aprofundarmos na história da Pedra de Roseta, é importante aprendermos um pouco sobre a Civilização Egípcia. Para que esse artigo fique mais didático, vamos dividir a história do Egito em três partes: o Antigo Império, o MédioImpério e o Novo Império. O Antigo Império foi extremamente importante para a história dessa civilização porque foi durante ele que os egípciosfizeram extensas obras de drenagem e isso permitiu a expansão da agricultura. E é claro, é impossível falar sobre oEgito e não mencionar as pirâmides. Foi durante o Antigo Império que eles construíram as principais pirâmides do Egito. No começo, a civilização egípcia se dividia em pequenos grupos patriarcais chamados de “nomos”. Esses grupos selocalizavam em diferentes regiões do mapa, e isso culminou no que conhecemos atualmente como “Alto Egito” e “Baixo Egito”. Foi por volta de 3. 200 a. C. que o reino do norte dominou o reino do sul e o Egito se tornou dessa forma uma naçãounificada. O grande responsável por essa unificação foi Menés, e depois desse feito ele ficou conhecido como Faraó,cujo significado é “casa grande” ou “o rei das duas terras”. O artefato abaixo é a Pedra de Roseta, uma pedra feita de um fragmento de umaestela de granodiorito, e ela ficou conhecida como“A Pedra de Roseta”.    Você deve estar se perguntando “por que esse artefato é tão importante para a história da nossa civilização?”, e aresposta é: a Pedra de Roseta serviu como uma espécie de dicionário, e ela foi fundamental para a tradução e oentendimento dos hieróglifos egípcios que até então estavam perdidos porque ninguém sabia o significado deles. Os hieróglifos fazem parte do legado da civilização egípcia e era um complexo sistema de escrita que eles utilizavampara se comunicar. A Pedra de Roseta foi descoberta em 1799 e o material encontrado nesse pedra foi o grande fator que revolucionou ahistória da egiptologia, pois ela tem um grande conjunto de textos destinados ao faraó Ptolemeu V. Afortunadamente,esse texto estava escrito em 3 idiomas diferentes: o egípcio antigo (que são os hieróglifos), o demótico e o gregoantigo (que já era conhecido pela comunidade acadêmica), então essa pedra acabou servindo como uma espécie de dicionário. Muitas pessoas associam a redescoberta da Pedra de Roseta a Napoleão Bonaparte, mas, na verdade, ela foi redescobertapor um soldado que integrava a expedição francesa ao Egito liderada por Napoleão. Em 1801 houve um embate entre francesese britânicos em território egípcio, onde os britânicos derrotaram os franceses e a Pedra de Roseta passou a ser posse doReino Unido. Ela está exposta até hoje no museu britânico em Londres e é o objeto mais visitado do museu. O objetivo deste vídeo e artigo é ressaltar o valor histórico que as obras possuem. Obrigado e até o próximo “5 minutos de história”. "
    }];

function normaliseString(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function normaliseSpelling(builder) {
    var pipelineFunction = function (token) {
        return token.update(function () {
            return normaliseString(token.str);
        });
    }

    // Register the pipeline function so the index can be serialised
    lunr.Pipeline.registerFunction(pipelineFunction, 'normaliseSpelling');

    // Add the pipeline function to both the indexing pipeline and the searching pipeline
    builder.pipeline.before(lunr.stemmer, pipelineFunction);
    builder.searchPipeline.before(lunr.stemmer, pipelineFunction);
}

var idx = lunr(function () {
    this.ref('id')
    this.field('title')
    this.field('body')

    this.use(normaliseSpelling, ['title','body']);

    documents.forEach(function (doc) {
        this.add(doc)
    }, this)
});
function lunr_search(term) {
    document.getElementById('lunrsearchresults').innerHTML = '<ul></ul>';
    if(term) {
        document.getElementById('lunrsearchresults').innerHTML = "<p>Resultados para '" + term + "'</p>" + document.getElementById('lunrsearchresults').innerHTML;
        //put results on the screen.
        var results = idx.search('*'+normaliseString(term)+'*');
        if(results.length>0){
            //console.log(idx.search(term));
            //if results
            for (var i = 0; i < results.length; i++) {
                // more statements
                var ref = results[i]['ref'];
                var url = documents[ref]['url'];
                var title = documents[ref]['title'];
                var body = documents[ref]['body'].substring(0,160)+'...';
                document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML + "<li class='lunrsearchresult'><a href='" + url + "'><span class='title'>" + title + "</span><br /><span class='body'>"+ body +"</span><br /><br /></a></li>";
            }
        } else {
            document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = "<li class='lunrsearchresult'>Nenhum resultado encontrado...</li>";
        }
    }
    return false;
}

function lunr_search(term) {
    $('#lunrsearchresults').show( 400 );
    $( "body" ).addClass( "modal-open" );
    
    document.getElementById('lunrsearchresults').innerHTML = '<div id="resultsmodal" class="modal fade show d-block"  tabindex="-1" role="dialog" aria-labelledby="resultsmodal"> <div class="modal-dialog shadow-lg" role="document"> <div class="modal-content"> <div class="modal-header" id="modtit"> <button type="button" class="close" id="btnx" data-dismiss="modal" aria-label="Close"> &times; </button> </div> <div class="modal-body"> <ul class="mb-0"> </ul>    </div> <div class="modal-footer"><button id="btnx" type="button" class="btn btn-danger btn-sm" data-dismiss="modal">Fechar</button></div></div> </div></div>';
    if(term) {
        document.getElementById('modtit').innerHTML = "<h5 class='modal-title'>Resultados para '" + term + "'</h5>" + document.getElementById('modtit').innerHTML;
        //put results on the screen.
        var results = idx.search('*'+normaliseString(term)+'*');
        if(results.length>0){
            //console.log(idx.search(term));
            //if results
            for (var i = 0; i < results.length; i++) {
                // more statements
                var ref = results[i]['ref'];
                var url = documents[ref]['url'];
                var title = documents[ref]['title'];
                var body = documents[ref]['body'].substring(0,160)+'...';
                document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML + "<li class='lunrsearchresult'><a href='" + url + "'><span class='title'>" + title + "</span><br /><small><span class='body'>"+ body +"</span><br /><br /></small></a></li>";
            }
        } else {
            document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = "<li class='lunrsearchresult'>Desculpe, nenhum resultado foi encontrado. Feche e tente com outro termo!</li>";
        }
    }
    return false;
}
    
$(function() {
    $("#lunrsearchresults").on('click', '#btnx', function () {
        $('#lunrsearchresults').hide( 5 );
        $( "body" ).removeClass( "modal-open" );
    });
});