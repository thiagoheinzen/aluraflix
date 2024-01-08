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

  const imageLink = imageLinkInput.value.trim();
  const trailerLink = trailerLinkInput.value.trim();
  const imageTitle = imageTitleInput.value.trim();
  const file = imageFileInput.files[0];
  const nota = notaInput.value.trim();

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
  }

  // 5. Validação da Nota:
  if (!validarNota(nota)) {
    alert('A nota deve ser um valor inteiro entre 0 e 10.');
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

  if (imageLink !== '') {
    urlsAdicionadas.add(imageLink);
  }
}

// Função para validar a nota:
function validarNota(nota) {
  const valorNota = parseInt(nota, 10);
  return !isNaN(valorNota) && valorNota >= 0 && valorNota <= 10;
}

// 6. Criação de Elemento Filme:
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

// 7. Adição de Elemento à Galeria:
function adicionarElementoGaleria(element) {
  const gallery = document.getElementById('gallery');
  gallery.appendChild(element);
}

// 8. Remoção de Elemento:
function removerElemento(element) {
  const index = listaFilmes.findIndex(film => film.element === element);
  listaFilmes.splice(index, 1);
  const imageLink = element.querySelector('img').src;
  element.remove();
  urlsAdicionadas.delete(imageLink);
}

// 9. Limpeza de Campos de Entrada:
function limparCamposEntrada(imageLinkInput, trailerLinkInput, imageTitleInput, notaInput, imageFileInput) {
  imageLinkInput.value = '';
  trailerLinkInput.value = '';
  imageTitleInput.value = '';
  notaInput.value = '';
  imageFileInput.value = '';
}
