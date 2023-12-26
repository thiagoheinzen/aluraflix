// 1. Inicialização de Variáveis:
const listaFilmes = [];
const urlsAdicionadas = new Set();

// 2. Função Adicionar Filme:
function adicionarFilme() {
  const imageLinkInput = document.getElementById('imageLink');
  const trailerLinkInput = document.getElementById('trailerLink');
  const imageTitleInput = document.getElementById('imageTitle');
  const imageFileInput = document.getElementById('imageFile');
  const notaInput = document.getElementById('notaInput');
  const nota = notaInput.value.trim();

  const imageLink = imageLinkInput.value.trim();
  const trailerLink = trailerLinkInput.value.trim();
  const imageTitle = imageTitleInput.value.trim();
  const file = imageFileInput.files[0];

  // 3. Validação de Entrada:
  if ((imageLink === '' && trailerLink === '' && !file) || (imageLink !== '' && file)) {
    alert('Escolha apenas uma opção: URL da imagem OU carregar do computador.');
    return;
  }

  // 4. Validação de URL Existente:
  if (imageLink !== '') {
    if (urlsAdicionadas.has(imageLink)) {
      alert('Esta URL já foi adicionada. Por favor, escolha outra.');
      return;
    }

    const newFilm = criarElementoFilme(imageLink, trailerLink, imageTitle, nota);

    listaFilmes.push({
      imageLink: imageLink,
      trailerLink: trailerLink,
      imageTitle: imageTitle,
      nota: nota,
      element: newFilm
    });

    adicionarElementoGaleria(newFilm);
    limparCamposEntrada(imageLinkInput, trailerLinkInput, imageTitleInput, notaInput, imageFileInput);
    urlsAdicionadas.add(imageLink);
  }

  if (file) {
    // Criação de URL temporária para o arquivo carregado.
    const imageLink = URL.createObjectURL(file);
    const newFilm = criarElementoFilme(imageLink, trailerLink, imageTitle, nota);

    listaFilmes.push({
      imageLink: imageLink,
      trailerLink: trailerLink,
      imageTitle: imageTitle,
      nota: nota,
      element: newFilm
    });

    adicionarElementoGaleria(newFilm);
    limparCamposEntrada(imageLinkInput, trailerLinkInput, imageTitleInput, notaInput, imageFileInput);
    urlsAdicionadas.add(imageLink);
  }
}

// 5. Criação de Elemento Filme:
function criarElementoFilme(imageLink, trailerLink, imageTitle, nota) {
  const newFilm = document.createElement('div');
  newFilm.innerHTML = `
    <a href="${trailerLink}" target="_blank">
      <img src="${imageLink}" alt="${imageTitle}">
    </a>
    <p>${imageTitle}</p>
    <p>Nota do usuário: <span id="nota_${imageTitle}">${nota}</span></p>
  `;

  const removeButton = document.createElement('button');
  removeButton.innerText = 'Remover';
  removeButton.onclick = function() {
    removerElemento(newFilm);
  };

  newFilm.appendChild(removeButton);

  return newFilm;
}

// 6. Adição de Elemento à Galeria:
function adicionarElementoGaleria(element) {
  const gallery = document.getElementById('gallery');
  gallery.appendChild(element);
}

// 7. Remoção de Elemento:
function removerElemento(element) {
  const index = listaFilmes.findIndex(film => film.element === element);
  listaFilmes.splice(index, 1);
  const imageLink = element.querySelector('img').src;
  element.remove();
  urlsAdicionadas.delete(imageLink);
}

// 8. Limpeza de Campos de Entrada:
function limparCamposEntrada(imageLinkInput, trailerLinkInput, imageTitleInput, notaInput, imageFileInput) {
  imageLinkInput.value = '';
  trailerLinkInput.value = '';
  imageTitleInput.value = '';
  notaInput.value = '';
  imageFileInput.value = '';
}
