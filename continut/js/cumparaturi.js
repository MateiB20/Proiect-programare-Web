class Product 
{
    constructor(id, nume, cantitate) 
    {
        this.id = id;
        this.nume = nume;
        this.cantitate = cantitate;
    }
}

class Storage
{
    getId()
    {
        throw new Error("Lipseste implementare in subclasa");
    }
    add()
    {
        throw new Error("Lipseste implementare in subclasa");
    }
}

class LocalStorage extends Storage
{
    getId()
    {
        let id;
        if(localStorage.getItem("lastProductId"))
        {
            id = (parseInt(localStorage.getItem("lastProductId")))+ 1;
        }
        else
        {
            id=1;
        }
        return id
    }
    add(id, myProduct)
    {
        localStorage.setItem("lastProductId", id);
        localStorage.setItem("product"+id, JSON.stringify(myProduct));
    }
}

class IndexedDB extends Storage
{
    async getId()
    {
        let id = await getNextIDFromIndexedDB();
        return id
    }
    async add(myProduct)
    {
        await saveProductToIndexedDB(myProduct);
    }
}

document.getElementById("checkbox1").addEventListener("change", function() {
    if (this.checked) 
    {
        document.getElementById("checkbox2").checked = false;
    }
});

document.getElementById("checkbox2").addEventListener("change", function() {
    if (this.checked) 
    {
        document.getElementById("checkbox1").checked = false;
    }
});

document.getElementById("cos").addEventListener("submit", async function(event) {
    event.preventDefault();

    let nume = document.getElementById("productname").value;
    let cantitate = document.getElementById("cantitate").value;
    let useLocalStorage = document.getElementById("checkbox1").checked;
    let useIndexedDB = document.getElementById("checkbox2").checked;
    let id;
    let myProduct;

    if (useLocalStorage) 
    {
        let localStorage=new LocalStorage()
        myProduct = new Product(id, nume, cantitate);
        id= localStorage.getId()
        localStorage.add(id, myProduct)
        console.log("localStorage:", myProduct); 
    } 
    else if (useIndexedDB) 
    {
        try 
        {
            let indexedDBvar=new IndexedDB()
            id=await indexedDBvar.getId()
            myProduct = new Product(id, nume, cantitate);
            await indexedDBvar.add(myProduct)
        } 
        catch (error) 
        {
            console.error("Error handling IndexedDB:", error);
        }
    }
    updateProductTable(id, nume, cantitate);
    if (window.Worker) 
    {
        const myWorker = new Worker("js/worker.js");
        myWorker.postMessage([id, nume, cantitate]);
    }
});




let db;
let request = indexedDB.open("Database", 2);
request.onerror = function(event) {
    console.error(event.target.error);
};
request.onsuccess = function(event) {
    db = event.target.result;
    console.log("confirm indexedDB");
};
request.onupgradeneeded = function(event) {
    let db = event.target.result;
    if (!db.objectStoreNames.contains("produse")) 
    {
        let objectStore = db.createObjectStore("produse", { keyPath: "id" });
        objectStore.createIndex("id", "id", { unique: true });
        objectStore.createIndex("nume", "nume", { unique: false });
        objectStore.createIndex("cantitate", "cantitate", { unique: false });
    }
    if (!db.objectStoreNames.contains("lastIdStore")) 
    {
        let lastIdStore = db.createObjectStore("lastIdStore", { keyPath: "value" });
        lastIdStore.add({ key: "lastId", value: 0 });
    }
};
function getNextIDFromIndexedDB() 
{
    return new Promise(function(resolve, reject){
        const transaction = db.transaction(["lastIdStore"], "readwrite");
        const store = transaction.objectStore("lastIdStore");
        const request = store.get("lastId");
        request.onsuccess = function() {
            let lastId 
            if(request.result)
            {
                lastId=request.result.value;
            }
            else
            {
                lastId=0;
            }
            let newId = lastId + 1;
            const updateRequest = store.put({ key: "lastId", value: newId });
            updateRequest.onsuccess = function() {
                resolve(newId);
            };
            updateRequest.onerror = function() {
                reject("Eroare actualizare lastId IndexedDB");
            };
        };
        request.onerror = function() {
            reject("Eroare obtinere lastId IndexedDB");
        };
    });
}
function saveProductToIndexedDB(product) 
{
    const transaction = db.transaction(['produse'], 'readwrite');
    const store = transaction.objectStore('produse');
    const request = store.add(product);
    request.onsuccess = function() {
        console.log("IndexedDB:", product);
    };
    request.onerror = function(event) {
        console.error(event.target.error);
    };
}
function updateProductTable(id, nume, cantitate) 
{
    let table = document.getElementById('productTable');
    if (!table) 
    {
        let tableSection = document.getElementById('Tabel');
        table = document.createElement('table');
        table.id = 'productTable';
        let headerRow = document.createElement('tr');
        let header1 = document.createElement('th');
        header1.textContent = 'Id';
        let header2 = document.createElement('th');
        header2.textContent = 'Nume';
        let header3 = document.createElement('th');
        header3.textContent = 'Cantitate';
        headerRow.appendChild(header1);
        headerRow.appendChild(header2);
        headerRow.appendChild(header3);
        table.appendChild(headerRow);
        tableSection.appendChild(table);
    }
    let row = document.createElement('tr');
    let cell1 = document.createElement('td');
    cell1.textContent = id;
    let cell2 = document.createElement('td');
    cell2.textContent = nume;
    let cell3 = document.createElement('td');
    cell3.textContent = cantitate;
    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    table.appendChild(row);
}
function storageAvailable(type) 
{
    let storage;
    try 
    {
        storage = window[type];
        const x = "__storage_test__";
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } 
    catch (e) 
    {
        return (
            e instanceof DOMException &&
            e.name === "QuotaExceededError" &&
            storage &&
            storage.length !== 0
        );
    }
}
if (storageAvailable("localStorage")) 
{
    console.log("confirm localStorage");
} 
else 
{
    console.log("no localStorage");
}


