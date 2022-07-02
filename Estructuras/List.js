class Node_List {
    constructor(id_Pelicula, nombre_Pelicula, descripcion, puntuacion_Star, precio_Q) {
        this.id_Pelicula = id_Pelicula;
        this.nombre_Pelicula = nombre_Pelicula;
        this.descripcion = descripcion;
        this.puntuacion_Star = puntuacion_Star;
        this.precio_Q = precio_Q;
    }
}

class List {
    constructor() {
        this.head = null;
        this.fin = null;
        this.size = 0;
    }

    insert(id_Pelicula, nombre_Pelicula, descripcion, puntuacion_Star, precio_Q) {
        if (!this.head) {
            this.insertFirst(id_Pelicula, nombre_Pelicula, descripcion, puntuacion_Star, precio_Q);
        } else {
            this.insertLast(id_Pelicula, nombre_Pelicula, descripcion, puntuacion_Star, precio_Q);
        }
    }
    // Insert first node
    insertFirst(id_Pelicula, nombre_Pelicula, descripcion, puntuacion_Star, precio_Q) {
        this.head = new Node_List(id_Pelicula, nombre_Pelicula, descripcion, puntuacion_Star, precio_Q);
        this.size++;
    }

    // Insert last node
    insertLast(id_Pelicula, nombre_Pelicula, descripcion, puntuacion_Star, precio_Q) {
        let node = new Node_List(id_Pelicula, nombre_Pelicula, descripcion, puntuacion_Star, precio_Q);
        // If empty, make head
        if (!this.head) {
            this.head = node;
        } else if (!this.fin) {
            this.fin = node;
            this.head.next = this.fin;
            this.head.prev = this.fin;
            this.fin.prev = this.head;
            this.fin.next = this.head;
        } else {
            let current = this.fin;
            current.next = node;
            this.fin = node;
            this.fin.next = this.head;
            this.fin.prev = current;
            this.head.prev = this.fin;
        }
        this.size++;
    }

    printListData() {
        let current = this.head;
        let stop = false;
        while (current) {
            console.log(current.id_Pelicula + " " + current.nombre_Pelicula);
            current = current.next;
            stop = true;
            if (current === this.head && stop === true) {
                break;
            }
        }
    }

    printListDataR() {
        let current = this.fin;
        let stop = false;
        while (current) {
            console.log(current.id_Pelicula + " " + current.nombre_Pelicula);
            current = current.prev;
            stop = true;
            if (current === this.fin && stop === true) {
                break;
            }
        }
    }

    BBS() { //ascend
        let stop = false;
        while (stop === false) {
            stop = true;
            let current = this.head;
            while (current) {
                if (current.id_Pelicula > current.next.id_Pelicula) {
                    let node = new Node_List(current.id_Pelicula, current.nombre_Pelicula, current.descripcion, current.puntuacion_Star, current.precio_Q);
                    current.id_Pelicula = current.next.id_Pelicula;
                    current.nombre_Pelicula = current.next.nombre_Pelicula;
                    current.descripcion = current.next.descripcion;
                    current.puntuacion_Star = current.next.puntuacion_Star;
                    current.precio_Q = current.next.precio_Q;

                    current.next.id_Pelicula = node.id_Pelicula;
                    current.next.nombre_Pelicula = node.nombre_Pelicula;
                    current.next.descripcion = node.descripcion;
                    current.next.puntuacion_Star = node.puntuacion_Star;
                    current.next.precio_Q = node.precio_Q;
                    stop = false;
                }
                current = current.next;

                if (current === this.fin) {
                    break;
                }
            } 
        }
    }
}

var sort = new List();