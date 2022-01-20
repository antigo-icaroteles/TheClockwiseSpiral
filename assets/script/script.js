const inputElement = document.querySelector('#input');
const addTaskButton = document.querySelector('#findButton');
const matricesContainer = document.querySelector('#generatedMatrix');

const validateInput = () => parseInt(inputElement.value) > 0;


const handleAddTask = () => {
    const inputIsValid = validateInput();

    if (!inputIsValid){
        return inputElement.classList.add("error");
    }

    const matrixItemContainer = document.createElement('div');
    matrixItemContainer.classList.add("matrix-item");

    const N = parseInt(inputElement.value);
    const conteudo = createSpiral(N);
    const matrixContent = createTable(conteudo);

    const matrixHeaderContainer = document.createElement('div');
    matrixHeaderContainer.classList.add("matrix-header");

    const matrixHeader = document.createElement('h2');
    matrixHeader.classList.add("matrix-header-h2");
    matrixHeader.innerText = 'Matriz ' + N + 'x' + N;

    const deleteItem = document.createElement('i');
    deleteItem.classList.add("far");
    deleteItem.classList.add("fa-trash-alt");

    deleteItem.addEventListener('click', () => handleDeleteClick(matrixItemContainer, matrixContent, matrixHeaderContainer, matrixHeader));

    matrixItemContainer.appendChild(matrixContent);
    matrixItemContainer.appendChild(deleteItem);

    matrixHeaderContainer.appendChild(matrixHeader);

    matricesContainer.appendChild(matrixHeaderContainer);
    matricesContainer.appendChild(matrixItemContainer);
    
    inputElement.value = '';
}

const handleDeleteClick = (matrixItemContainer, matrixContent, matrixHeaderContainer, matrixHeader) => {
    const matrices = matricesContainer.childNodes;

    for(const matrix of matrices){
        const currentMatrixIsBeingClicked = (matrix.firstChild === matrixContent || matrix.firstChild === matrixHeader);
        if (currentMatrixIsBeingClicked){
            matrixItemContainer.remove();
            matrixHeaderContainer.remove();
        }
    }
};

const handleInputChange = () => {
    const inputIsValid = validateInput();

    if(inputIsValid){
        return inputElement.classList.remove("error");
    }
};

const createSpiral = (N) => {
    if (N < 1 || typeof(N) !== "number" || !(Number.isInteger(N))) return [];
  
    let nLimit = N - 1;
    let init = 0;
    let count = 1;
    let arr = [];
    
    for (let k = 0; k < N; k++){
      arr.push([]);
      for (let l = 0; l < N; l++){
        arr[k].push(0);
      }
    }
    
    while(count <= N ** 2){
      for(let i = init; i <= nLimit; i++){
        arr[init][i] = count;
        count++;
      }
  
      for(let i = init + 1; i <= nLimit; i++){
        arr[i][nLimit] = count;
        count++;
      }
  
      for(let i = nLimit - 1; i >= init; i--){
        arr[nLimit][i] = count;
        count++;
      }
  
      for(let i = nLimit - 1; i >= init + 1; i--){
        arr[i][init] = count;
        count++;
      }
      
      init += 1;
      nLimit -= 1;
    }
    return arr;
}

const createTable = (conteudo) => {
    let table = document.createElement("table");
    let thead = document.createElement("thead");
    let tbody = document.createElement("tbody");
    let thd = function(i){return (i==0)?"td":"td";};
    for (let i = 0; i < conteudo.length; i++){
        let tr = document.createElement("tr");
        let trHead = document.createElement("tr");
        for (let j = 0; j < conteudo.length; j++){
            let t = document.createElement(thd(i));
            let tHead = document.createElement(thd(i));
            let text = document.createTextNode(conteudo[i][j]);
            let textHead = document.createTextNode('');
            t.appendChild(text);
            tr.appendChild(t);
            tHead.appendChild(textHead);
            trHead.appendChild(tHead);
        }
        tbody.appendChild(tr);
        thead.appendChild(trHead);
    }
    table.appendChild(thead);
    table.appendChild(tbody);
    return table;
}

addTaskButton.addEventListener('click', () => handleAddTask());
inputElement.addEventListener('change', () => handleInputChange());