class Hash { // Lista
    constructor(id_Categoria, company) {
        this.id_Categoria = null;
        this.company = company;
        this.key = id_Categoria % 20;
        this.next = null;
        this.list = null;
    }
}

class Tabla_Hash {
    constructor(size = 20, count = 0) {
        this.size = size;
        this.count = count;
        this.head = null;
        this.create_List();
    }

    getHash(id_Categoria) {
        let key = id_Categoria % 20;
        return key;
    }

    create_List() {
        for (let i = 0; i < 20; i++) {
            this.insert(i, null);
        }
    }

    insert(id_Categoria, company) {
        let node = new Hash(id_Categoria, company);

        if (this.head === null) {
            this.head = node;
        } else {
            let temp = this.head;
            while (temp.next != null) {
                temp = temp.next;
            }
            temp.next = node;
        }
    }

    insert2(id_Categoria, company) {
        let node = new Hash(id_Categoria, company);
        let key = this.getHash(id_Categoria, company);
        let temp = this.head;
        node.id_Categoria = id_Categoria;

        while (temp.key != key) {
            temp = temp.next;
        }
        if (temp.company === null) {
            temp.id_Categoria = id_Categoria;
            temp.company = company;
            //console.log(id_Categoria + " inputted into " + temp.key);
        } else {
            if (temp.list === null) {
                if (temp.id_Categoria == id_Categoria) {
                    return;
                }
                temp.list = node;
                //console.log(id_Categoria + " inputted into " + temp.key);
            } else {
                let temp_ = temp.list;
                if (temp_.id_Categoria == id_Categoria) {
                    return;
                }
                while (temp_.list != null) {
                    if (temp_.id_Categoria == id_Categoria) {
                        return;
                    }
                    temp_ = temp_.list;
                }
                temp_.list = node;
                //console.log(id_Categoria + " inputted into " + temp.key);
            }
        }
    }

    buscar(id_Categoria) {
        let key = this.getHash(id_Categoria % 20);
        let temp = this.head;

        while (temp.key != key) {
            temp = temp.next;
        }

        if (temp.id_Categoria == id_Categoria) {
            return temp;
        } else {
            let temp_ = temp.list;
            while (temp_.id_Categoria != id_Categoria) {
                temp_ = temp_.list;
            }
            if (temp_.id_Categoria == id_Categoria) {
                return temp_;
            }
        }
    }

    display() {
        let temp = this.head;
        while (temp) {
            console.log("Head: " + temp.id_Categoria);
            let temp_ = temp.list;
            while (temp_) {
                console.log("List: " + temp_.id_Categoria);
                temp_ = temp_.list;
            }
            temp = temp.next;
        }
    }

    graficadora() {
        let str = "";
        let temp = this.head;
        let count = 0;
        let rand = 0;
        let rowInfo = "{rank=same;";
        while (temp) {
            str += "Head" + count + " [label=\"Head: " + temp.key + "\"];\n";
            rowInfo += "Head" + count + ";";
            temp = temp.next;
            count++;
        }
        temp = this.head;
        str += "Head" + 0;
        count = 1;
        temp = temp.next;
        while (temp) {
            str += " -> Head" + count;
            temp = temp.next;
            count++;
        }
        str += "[style=invis];\n" + rowInfo + "};\n";

        temp = this.head;
        count = 0;
        rand = 0;
        while (temp) {
            let temp_ = temp.list;
            if (temp.id_Categoria != null) {
                str += "Head" + count + " -> List" + rand + ";\n";
                str += "List" + rand + " [label=\"" + temp.company + "\"];\n";
                rand++;
                while (temp_) {
                    str += "List" + rand + " [label=\" " + temp_.company + "\"];\n";
                    if (temp_ != null) {
                        str += "List" + (rand-1) + " -> List" + (rand) + ";\n";
                    }
                    temp_ = temp_.list;
                    rand++;
                }
            }
            while (temp_) {
                str += "List" + rand + " [label=\" " + temp_.company + "\"];\n";
                if (temp_.list != null) {
                    str += "List" + rand + " -> List" + (rand + 1) + ";\n";
                }
                temp_ = temp_.list;
                rand++;
            }
            temp = temp.next;
            count++;
        }
        return str;
    }

    graph(path) {
        let str = "digraph structs\n{\nrankdir=\"LR\"\nlabel=\"Categorias\"\nnode [shape=box];\n";
        str += this.graficadora();
        str += "}";
        //console.log(str);
        d3.select(path).graphviz().width(1000).height(1000).renderDot(str);
    }
}

tH_Cat = new Tabla_Hash();