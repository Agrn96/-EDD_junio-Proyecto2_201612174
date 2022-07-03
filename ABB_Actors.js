class Node_ABB {
    constructor(dni, nombre_Actor, correo, descripcion, left = null, right = null) {
        this.dni = dni;
        this.nombre_Actor = nombre_Actor;
        this.correo = correo;
        this.descripcion = descripcion;
        this.left = left;
        this.right = right;
    }
}

class ABB {
    constructor() {
        this.raiz = null;
        this.size = 0;
    }

    insert(dni, nombre_Actor, correo, descripcion) {
        let node = new Node_ABB(dni, nombre_Actor, correo, descripcion);
        if (this.raiz === null) {
            this.raiz = node;
        } else {
            let temp = this.raiz;
            let status = false;
            while (temp && status === false) {
                if (temp.dni === dni) {
                    status = true;
                    break;
                }
                if (dni > temp.dni) {
                    if (temp.right === null) {
                        temp.right = node;
                        status = true;
                    } else {
                        temp = temp.right;
                    }
                } else if (dni < temp.dni) {
                    if (temp.left === null) {
                        temp.left = node;
                        status = true;
                    } else {
                        temp = temp.left;
                    }
                }
            }
            this.size++;
        }
    }

    displayIO(temp = this.raiz, go) {
        if (temp === null) {
            return;
        }
        this.displayIO(temp.left, go);
        console.log(temp.nombre_Actor + " ");
        this.displayIO(temp.right, go);
    }

    displayPreO(temp = this.raiz, go) {
        if (temp === null) {
            return;
        }
        console.log(temp.nombre_Actor + " ");
        this.displayPreO(temp.left, go);
        this.displayPreO(temp.right, go);
    }

    displayPostO(temp = this.raiz, go) {
        if (temp === null) {
            return;
        }
        this.displayPostO(temp.left, go);
        this.displayPostO(temp.right, go);
        console.log(temp.nombre_Actor + " ");
    }
    graficadora(temp) { // modify temp.data to temp.dni and adjust other values
        let cadena = "";
        if (temp === null) {
            return cadena;
        }
        cadena = "nodo" + temp.dni + " [label = \"" + temp.nombre_Actor + "\"]; \n"; // dni: " + temp.dni + "\\n 

        if (temp.left != null) {//:C0
            cadena = cadena + this.graficadora(temp.left) + "nodo" + temp.dni + " -> nodo" + temp.left.dni + "\n";
        }
        if (temp.right != null) {//:C1
            cadena = cadena + this.graficadora(temp.right) + "nodo" + temp.dni + " -> nodo" + temp.right.dni + "\n";
        }
        return cadena;
    }

    search(nombre) {
        let current = this.raiz;
        while (current) {
            
            if (nombre == current.nombre_Actor) {
                return current;
            } else if (nombre > current.nombre_Actor) {
                current = current.right;
            } else {
                current = current.left;
            }
            if(current === null){
                return;
            }
        }
    }

    graph(path) {
        let str = "";
        str = "digraph G{\nlabel=\" Actores \";\ngraph[size=\"10,8\"]; \n";
        if (this.raiz) {
            let current = this.raiz;
            let counter = 0;
            str += this.graficadora(this.raiz);
        }
        str += '}';
        //console.log(str);
        d3.select(path).graphviz().width(1000).height(1000).renderDot(str);
    }

    showAuthor(node){
        let str = "";
        str = "digraph G{\nlabel=\" Author \";\ngraph[size=\"10,8\"]; \nnode [shape=Mrecord];\n rankdir=TB; \n";
        if (node) {
            let current = node;
            str += "node1";
            str += '[shape=Mrecord label="{ISBM: ' + current.dni + "|Nombre: " + current.nombre_Actor + "|Correo: " + current.correo + "|descripcion: " + current.descripcion + "|Direccion: " + current.direccion + "|Biografia: " + current.biografia;
            str += '}"];\n';
        }
        str += '}';
        //console.log(str);
        d3.select("#graph_abb").graphviz().width(1000).height(1000).renderDot(str);
    }

}
var abb = new ABB();
