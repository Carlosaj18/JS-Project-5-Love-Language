const closeModalButtonEditUser = document.querySelectorAll("[data-close-button-edit]");
const modalEditUser            = document.querySelector(".modalEditUser");

const editButton = () => {
    closeEditButton.addEventListener("click", () => {
      if(datosCompletos(selectNombreUser(), selectGeneroUser())) {
        const modal = button.closest(".modalEditUser");
        closeModal(modal);  
      }
    })
}
  
closeModalButtonEditUser.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest(".modalEditUser");
      closeModal(modal);
    });
});

const loadingDataUser = (users) => {
  container.innerHTML = loader();
  let armoHTML = "";
  setTimeout(() => {
    container.innerHTML = armoHTML;
    displayLenguajesDelAmor(users);
  }, 1500);        
}

// Editar datos de users en localStorage
const usersUodatedJSON = async (id, newUser) => {
  let headersList = {
    "Accept": "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json"
   }
   let bodyContent = JSON.stringify(newUser);
  try {
    let response = await fetch(`${URL}/users/${id}`, { 
      method: "PUT",
      body: bodyContent,
      headers: headersList
    });
      if(response.ok){
        let data = await response.text();
        console.log(`Data enviada al endpoint /users/ por medio del metodo POST: ${data}`);   
        /** Traer los datos del JSON */
        let usersJSON = await usersLoadJSON();
        loadingDataUser(usersJSON);
        alerta("Usuario Editado", `Se edito el usuario ${newUser.nombre} en el archivo JSON y en el localStorage`, "success");
      } else {
        /** Traer los datos del localStorage */
        let userLocals = recuperarUsers();
        loadingDataUser(userLocals);
        alertaErrorUsuarios("error", `No se edito el usuario ${newUser.nombre} en el archivo JSON, solo se copio su actualizacion en el localStorage`);
      }
  } catch (error) {
      console.log(error);
  } 
}
  
const pushUserEdit = async (userExist, nombre, genero, description, physicalTouch, actosOfService, qualityTime, wordsOfAffirmation, receivingGifts) => {
  let userEdited = { 
    id: userExist.id, 
    imagen: userExist.imagen,
    nombre      : nombre.value,
    favoritos   : userExist.favoritos,
    description : description.value,
    genero      : genero.value,
    languages   : {
      physicalTouch : physicalTouch.value,     
      actosOfService : actosOfService.value,    
      qualityTime   : qualityTime.value,       
      wordsOfAffirmation : wordsOfAffirmation.value,
      receivingGifts : receivingGifts.value,   
    }
  }
  const newArr = recuperarUsers().map(obj => {
      if (obj.id === parseInt(userExist.id)) {
        return userEdited;
      }
      return obj;
    });
    usersUodatedJSON(userExist.id, userEdited);
    almacenarDatosLocalStorageUsers(newArr);
}
  
const recuperarDatosUser = (userId)=> {
    const id = document.querySelector("#id");
    const imagen = document.querySelector("#imagen");
    const nombre = document.querySelector("#nombre");
    const favoritos = document.querySelector("#favoritos");
    const genero = document.querySelector("#genero");
    const description = document.querySelector("#description");
    const physicalTouch = document.querySelector("#physicalTouch");
    const actosOfService = document.querySelector("#actosOfService");
    const qualityTime = document.querySelector("#qualityTime");
    const wordsOfAffirmation = document.querySelector("#wordsOfAffirmation");
    const receivingGifts = document.querySelector("#receivingGifts");
    const closeButtonEdit = document.querySelector("#close-button-edit");
    cargarCombo(datosGenero, selectGeneroUser());
    
    let userlocal = recuperarUsers(); 
    let userExist = userlocal.find((user) => user.id === parseInt(userId) || user.id.toString() === userId);
    
    if(localStorage.getItem("users")){
        if(userExist != undefined){
        id.value =  userExist.id;          
        imagen.value = userExist.imagen;
        nombre.value =  userExist.nombre;
        favoritos.value = userExist.favoritos == true ? "⭐" : "😅";  
        if (userExist.genero == "M"){
            genero.value = "Masculino";
        } else if (userExist.genero == "F") {
            genero.value = "Femenino";
        } else {
            genero.value = "Indefinido";
        }
        description.value         = userExist.description;
        physicalTouch.value       =  userExist.languages.physicalTouch;
        actosOfService.value      = userExist.languages.actosOfService;
        qualityTime.value         =  userExist.languages.qualityTime;
        wordsOfAffirmation.value  = userExist.languages.wordsOfAffirmation;
        receivingGifts.value      =  userExist.languages.receivingGifts;
        }
    }

    closeButtonEdit.addEventListener("click", () => {
        pushUserEdit(userExist, nombre, genero, description, physicalTouch, actosOfService, qualityTime, wordsOfAffirmation, receivingGifts);
        const modalEditUser = document.querySelector(".modalEditUser");
        closeModal(modalEditUser);
    })
}

const popUpEditUser = (idUser) => {
    PopUpEditUser.innerHTML = "";
    PopUpEditUser.innerHTML = retornoUpdateUser();
    recuperarDatosUser(idUser);
}

const activarBotonesPopUpEditUser = (idUser) => {
    const openModalButtonsForm = document.querySelectorAll("[data-modal-target-edit]");
    openModalButtonsForm.forEach((button) => {
        button.addEventListener("click", () => {
        const modal = document.querySelector(".modalEditUser"); // select our modal
        openModalForm(modal);
        popUpEditUser(idUser);
        });
    });
};

