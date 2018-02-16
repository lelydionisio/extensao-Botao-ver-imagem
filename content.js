function addLinks(node) {
    if (node.nodeType === Node.ELEMENT_NODE) {
        if (node.classList.contains('irc_ris')) {
            var object = node.closest('.irc_c');
            // Pegar link das imagem
            var imageLinks = object.querySelector('._FKw.irc_but_r > tbody > tr');
            var imageText = object.querySelector('._cjj > .irc_it > .irc_hd > ._r3');

            // Pegar url da imagem
            var thumbnail = document.querySelector('img[name="' + object.dataset.itemId + '"]');
            var meta = thumbnail.closest('.rg_bx').querySelector('.rg_meta');
            var metadata = JSON.parse(meta.innerHTML);
            var imageURL = metadata.ou;


            // Remover .olds 
            oldViewImage = imageLinks.querySelector('.ext_addon');
            if (oldViewImage) {
                imageLinks.removeChild(oldViewImage);
            }

            // remover pesquisar por imagem 
            oldSearchByImage = imageText.querySelector('.ext_addon')
            if (oldSearchByImage) {
                imageText.removeChild(oldSearchByImage);
            }


            // Criar botão 
            var searchByImage = document.createElement('a');
            searchByImage.setAttribute('href', 'https://www.google.com/searchbyimage?&image_url=' + imageURL);
            searchByImage.setAttribute('class', 'ext_addon');
            searchByImage.setAttribute('style', 'margin-left:4pt;');

            var searchByImageText = document.createElement('span');
            searchByImageText.innerText = 'Search by image';
            searchByImage.appendChild(searchByImageText);

            // Indexar botao
            imageText.appendChild(searchByImage);


            // Criar botao viewimage
            var viewImage = document.createElement('td');
            viewImage.setAttribute('class', 'ext_addon');

            // Add url do botao 
            var viewImageLink = document.createElement('a');
            viewImageLink.innerHTML = '<span>Ver Imagem</span>';
            viewImageLink.setAttribute('href', imageURL);
            viewImage.appendChild(viewImageLink);

            // Add ViewImage button para Image Links
            var save = imageLinks.childNodes[1];
            imageLinks.insertBefore(viewImage, save);
        }
    }
}

var observer = new MutationObserver(function (mutations) {
    mutations.forEach((mutation) => {
        if (mutation.addedNodes && mutation.addedNodes.length > 0) {
            for (var i = 0; i < mutation.addedNodes.length; i++) {
                var newNode = mutation.addedNodes[i];
                addLinks(newNode);
            }
        }
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

addLinks(document.body);
