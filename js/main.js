// Caminho para o JSON dentro da pasta "js"
const POSTS_JSON = "js/posts.json";

/**
 * Carrega o arquivo posts.json e retorna um array de posts
 */
async function fetchPosts() {
  const response = await fetch(POSTS_JSON);
  const data = await response.json();
  return data; // array de objetos { title, date, summary, content, image, ... }
}

/**
 * Exibe N últimos posts na página inicial
 * @param {number} limit - Quantos posts exibir
 */
async function loadLatestPosts(limit) {
  const posts = await fetchPosts();
  // Supondo que posts está do mais recente p/ mais antigo
  // Se estiver ao contrário, use: posts.reverse() ou reordene pela data
  // Pega apenas "limit" posts
  const latest = posts.slice(0, limit);

  const container = document.getElementById('latest-posts');
  if (!container) return;

  latest.forEach(post => {
    const card = createPostCard(post);
    container.appendChild(card);
  });
}

/**
 * Exibe todos os posts na página blog.html
 */
async function loadAllPosts() {
  const posts = await fetchPosts();
  const container = document.getElementById('all-posts');
  if (!container) return;

  posts.forEach(post => {
    const card = createPostCard(post);
    container.appendChild(card);
  });
}

/**
 * Cria o elemento de card (HTML) para um post
 */
function createPostCard(post) {
  const card = document.createElement('div');
  card.classList.add('post-card');

  // Título
  const title = document.createElement('h3');
  title.textContent = post.title;
  card.appendChild(title);

  // Data
  const datePara = document.createElement('p');
  datePara.classList.add('post-date');
  datePara.textContent = formatDate(post.date);
  card.appendChild(datePara);

  // Resumo
  const summary = document.createElement('p');
  summary.classList.add('post-summary');
  summary.textContent = post.summary;
  card.appendChild(summary);

  // (Opcional) Imagem
  if (post.image) {
    const img = document.createElement('img');
    img.src = post.image;
    img.alt = post.title;
    img.classList.add('post-image');
    card.appendChild(img);
  }

  // Poderia adicionar link "Leia mais" para uma página individual
  return card;
}

/**
 * Formata a data de "2025-05-15" para "15/05/2025"
 */
function formatDate(dateString) {
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
}
