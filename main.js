document.addEventListener("DOMContentLoaded", function() {

  const searchForm = document.getElementById("searchForm");
  const searchNav = document.getElementById("searchNav");
  const buttonNav = document.getElementById("buttonNav");
  const userInfo = document.getElementById("user-info");

  async function mostrarInformacion(data) {
    let nameHTML = data.login ? `<p>Nombre de usuario: ${data.login}</p>` : '<p>Nombre de usuario: No disponible</p>';

    userInfo.innerHTML = `
      <div class="card">
        <img class="card-img-top" src="${data.avatar_url}" alt="Avatar">
        <div class="card-body">
          ${nameHTML}
          <p>Número de repositorios: ${data.public_repos}</p>
        </div>
      </div>
    `;
  }


  async function buscarUsuario() {
    try {
      const username = searchNav.value;
      if (!username) {
        console.error('El campo de búsqueda está vacío');
        return;
      }
      
      const url = `https://api.github.com/users/${username}`;
    
      const response = await axios.get(url);
      const data = response.data;
      mostrarInformacion(data);
    } catch (error) {
      console.error(error);
    }
  }

  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    buscarUsuario();
  });
});
