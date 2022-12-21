// graph is undirected adjacency matrix 
class Graph {
    // constructor parameter total vertex
    constructor(v)
    {
        // list menggunakan array, jadi space complexitynya tetap O(n)
        this.V = v;
        this.adj = new Array(v);
        
        for(let i = 0; i < v; ++i)
            this.adj[i] = [];
        
        // inisiasi value untuk menghitung jumlah edge
        this.count = 0;
    }
    
    // add an edge into the graph
    addEdge(v,w)
    {
        // graph undirect
        this.adj[v].push(w);
        this.adj[w].push(v);
        this.count++;
        // lihat semua vertex yg adjacent
        console.log(vertices[v]+"-->"+vertices[w]);
    }
    // fungsi utk membagi bahan kimia sesuai dengan ketentuan di graph awalnya dengan parameter arr sebagai inputan user
    assign_card(arr){
        // 1. buat array buat simpan hasil, sizenya sepanjang vertex yg mau dicek
        let slot = arr.length;
        let result = new Array(slot);
        // untuk mengecek array apa saja yang masuk
        for (let i = 0;i<slot;i++){
            console.log(arr[i]);
        }
        // 2. inizialize nilainya sebagai unchecked/ unassigned
        for (let i = 0; i<slot; i++)
            result[i] = -1;
        //     vertex pertama dikasi lemari dulu --> anggapannya default lemari
        result[0] = 0;
        
        // 3. temp array --> cabinet buat simpan jml lemari yg dibutuhin (tersedia brp lemari gitu)
        // disini maks lemari yg ada itu sesuai dengan jml vertex yg mau dicek
        let cabinet = new Array(slot);
        for (let i = 0; i< slot;i++)
            cabinet[i] = true;
        // 4. looping buat taruh di lemarinya uknya jml vertex-1,  yg pertama sudah dapat marking
        for (let u = 1; u < slot ; u++){
            // 4.1 proses semua vertex yg adjacent//edge yang connect ke vertex dari array parameter, tandai belum kebagian lemari(false)
            for (let edge of this.adj[arr[u]]){
                let e = edge;
                if (result[e]!=-1)
                    cabinet[result[e]] = false;
            }
            // 4.2 cari urutan lemari yg tersedia (n), kalau tersedia, lemari n itu yang akan dipake
            let n;
            for(n = 0 ; n < slot ; n++){
                if(cabinet[n])
                    break;
            }
            // assign lemari
            result[u] = n;
            // reset value buat iterasi selanjutnya
            for(let i = 0; i< slot; i++)
                cabinet[i] = true;
        }
        // 4.3 assign lemari yg tersedia ke hasil (jml lemari = jml iterrasi loop no 4, yg diassign substance ke n)
        // inisiasi penampungan hasil
        let aob = [[]];
        aob.length = slot;
        // default value
        for (let i = 0; i< slot;i++)
            aob[i]="";
        for(let u = 0; u<= this.V; u++){
            // utk simpan value per lemari
            let tmp = [];
            for (let i = 0; i< result.length;i++){
                if (result[i]==u){
                    tmp.push(arr[i]);
                }
            }
            aob[u] = tmp;
        }
    // printing hasil pembagian lemari ke dalam index.html bagian id = "board"
    for(let i = 0; i<aob.length;i++){
        board.innerHTML+=`<div class="shelf_no"> 
                            <h3> shelf ${i} </h3>`;
        for (var j in aob[i])
            board.innerHTML+="<div class='column' > <img src=assets\\"+aob[i][j]+".png width='60px' height='60px'>"+"&nbsp </div> ";
        if (aob[i+1]=="")
            break;
            board.innerHTML+='</div> ';
    }
    // cek array yg terbentuk
    console.log(aob);
    }
  }
//   inisiasi graph dengan panjang vertex 21
var g = new Graph(21);
// ini nama verted yang digunakan, sudah diurutkan sesuai index 
var vertices = [ 'TNT', 'NH4NO3', 'O2', 'NH3', 'NaOCl', 'CH3COOH', 'H2O2', 'C2H6O', 'NaHCO3', 'S', 'C', 'N', 'KNO3', 'NCl3', 'K3PO4', 'H20', 'CaC2', 'C8H15', 'api','panas','uranium'];
// input ke graphnya berupa index
g.addEdge(1, 2);
g.addEdge(4, 3);
g.addEdge(5, 4);
g.addEdge(6, 5);
g.addEdge(8, 1);
g.addEdge(8, 5);
g.addEdge(10, 9);
g.addEdge(12, 9);
g.addEdge(12, 10);
g.addEdge(15, 14);
g.addEdge(16, 15);
g.addEdge(17, 1);
g.addEdge(13, 11);
// uranium radioaktif jadi gabisa disimpan dengan apappun, begitu juga dengan panas dan api
for (let i = 0; i<=20;i++){
    if(i!=20) g.addEdge(i,20); //20 -> uranium
    if(i!=18) g.addEdge(i,18);  //18 -> api
    if(i!=2 || i!= 19) g.addEdge(i,19);  // 19-> panas
}
  

// target printing
let board = document.getElementById("board");
let desc = document.getElementById("desc");
let assign = document.getElementById("assign");
let reset = document.getElementById("reset");

// move animation js (perpindahan barang dari lemari ke meja)
let simule = [];
let substance = document.querySelectorAll("#items");
let elmSimule = document.querySelector("#simule");
let renderSimule = () => {
    let strElm = "";
    simule.forEach((elm) => {
        strElm+="<img src=assets\\"+elm.name+".png width='70px' height='70px'>"+"&nbsp";
    })
    elmSimule.innerHTML = strElm;
}

let onClickHandler = (e) => {
    let name = e.currentTarget.querySelector(".idx-hidden")?.innerHTML ?? "--";
    let img = document.getElementById(name);
    let check = e.currentTarget.querySelector(".idx-hidden").style.display;
    if (check == "none"){
        // console.log("item kosong");
        alert("Bahan ini sudah diambil!");}
    else if(name != "--"){
            simule.push({
                name
            })
            renderSimule();
            img.remove();
            deleteItem(e);
        }

        console.log(simule);
    // }
    

}

let deleteItem = (e) => {
    e.currentTarget.querySelector(".idx-hidden").style.display = "none";
}

let drawCard = () => {
    let simArr = [];
    let i = 0;
    simule.forEach((elm)=>{
        simArr[i]=elm.name;
        i++;
    })
    g.assign_card(simArr);
}

substance.forEach((elm)=>{
    elm.addEventListener("click", onClickHandler);
})
assign.addEventListener("click",drawCard);