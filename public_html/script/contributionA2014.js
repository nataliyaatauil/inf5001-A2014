var clickSend = "Send";

function callback_Q1(data) {
    var html_list_versions = "";
    var id = data.query.pages;
    var idPage;
    for (var i in id) {
        idPage = i;
    }
    var sources = data.query.pages[idPage].revisions;
    var titre = data.query.pages[idPage].title;

if(sources != null){
    $("#titre").html('Liste des versions pour l\'article ' + titre);
    html_list_versions += '<table border=1><tr><th>Version</th><th>Date</th><th>Contributeur</th><th>Ampleur de la modification</th></tr>';
    for (var i = 0; i < sources.length; i++) {
        html_list_versions += '<tr><td>' + (i + 1) + '</td><td>' + data.query.pages[idPage].revisions[i].timestamp +
                '</td><td>' + data.query.pages[idPage].revisions[i].user + '</td><td>' + Math.abs(sources[i].sizediff) + '</td></tr>';

    }
    html_list_versions += '</table>';
    $("#tableau").html(html_list_versions);

}else{
    $("#titre").html("L'article \""+ titre+"\" n\'existe pas!");
}
}
function doGet(url, query) {
    $.ajax({
        url: url,
        dataType: "jsonp",
        type: 'GET',
        success: function(response) {
            if (query === "Q1") {
                callback_Q1(response);
            }
        }
    });
}
function deleteContentTable() {
    if (clickSend === "Send") {
        $("#titre").html("");
        $("#tableau").html("");
    }
}
function getJsonWiki() {
    deleteContentTable()
    
    if ($.trim($("#titreArticle").val()).length === 0) {
        $("#titreArticle").css({
            "background-color": "#FFDBDB"
        });
        $("#titreArticle").focus();
        return;
    }
    if ($.trim($("#url").val()).length === 0) {
        $("#url").css({
            "background-color": "#FFDBDB"
        });
        $("#url").focus();
        return;
    }

    titreArticle = $("#titreArticle").val();
    Grisou.WikiHelper.setApiUrlPath($('#url').val());
    wikiUrlApiPath = Grisou.WikiHelper.getApiUrlPath();

    wikiUrlRequest = wikiUrlApiPath + "?action=query&list=users&format=json&titles=" + titreArticle +
            "&prop=revisions&rvlimit=500";
    

    doGet(wikiUrlRequest, "Q1");
//
}
