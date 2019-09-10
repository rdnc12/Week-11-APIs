//jshint esversion:6

$("#searchButton").on('click', () => {

    let searchValue = $("#searchValue").val();
    const url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchValue;
    const UList=$("#UList");
    event.preventDefault();

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);

    xhr.onload = () => {
        fetch(url).then(res => res.json()).
        then(() => { 

            var wiki = JSON.parse(xhr.responseText);
            for (var i = 0; i < wiki[1].length; i++) {
                var searchData = wiki[1][i];
                var searchDetails = wiki[2][i].substring(0, 71) + "...";
                var searchLink = wiki[3][i];
                UList.append(`<li class="list-group-item">${i+1}-) 
                ${searchData}
                <p>${searchDetails}</p>
                <a href="${searchLink}">Continue to read</a>
                </li>`);
                //console.log(searchData + "\n" + searchDetails + "\n" + searchLink + "\n" + "\n");
            }

         }).catch(err => console.error(err));

    };

    if(UList.has("li"))
        UList.empty();

    xhr.send();
});
