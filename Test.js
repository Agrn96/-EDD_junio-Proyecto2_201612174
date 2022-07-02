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
            console.log(id_Categoria + " inputted into " + temp.key);
        } else {
            if (temp.list === null) {
                if (temp.id_Categoria == id_Categoria) {
                    return;
                }
                temp.list = node;
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
            str += "Head" + count + " [label=\"Head: " + temp.key + " : " + temp.id_Categoria + "\"];\n";
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
        str += ";\n" + rowInfo + "};\n";

        temp = this.head;
        count = 0;
        while (temp) {
            //str += "Head" + count +  " label[\"Head: " + temp.key + " : " + temp.id_Categoria + "\"]\n";
            let temp_ = temp.list;
            if (temp_ != null) {
                str += "Head" + count + " -> List" + temp_.id_Categoria + ";\n";
            }
            while (temp_) {
                str += "List" + temp_.id_Categoria + " [label=\" List: " + temp_.id_Categoria + "\"];\n";
                if (temp_.list != null) {
                    str += "List" + temp_.id_Categoria + " -> List" + temp_.list.id_Categoria + ";\n";
                }
                temp_ = temp_.list;
            }
            temp = temp.next;
            count++;
        }
        return str;
    }

    graph() {
        let str = "digraph structs\n{\nrankdir=\"LR\"\nlabel=\"Carnet: 201612174\"\nnode [shape=box];\n";
        str += this.graficadora();
        str += "}";
        console.log("Successfully wrote to the file.");
        console.log(str);
        d3.select("#graph").graphviz().width(1000).height(1000).renderDot(str);
    }
}

test = new Tabla_Hash();
test.insert2(4163);
test.insert2(8305);
test.insert2(3064);
test.insert2(8148);
test.insert2(8877);
test.insert2(5988);
test.insert2(8238);
test.insert2(8133);
test.insert2(5231);
test.insert2(6808);
test.insert2(3366);
test.insert2(9577);
test.insert2(7048);
test.insert2(6606);
test.insert2(9737);
test.insert2(5214);
test.insert2(6303);
test.insert2(1050);
test.insert2(2552);
test.insert2(7163);
test.insert2(4789);
test.insert2(6467);
test.insert2(3159);
test.insert2(6764);
test.insert2(7964);
test.insert2(9122);
test.insert2(3732);
test.insert2(9635);
test.insert2(2524);
test.insert2(4248);
test.insert2(7558);
test.insert2(8688);
test.insert2(9439);
test.insert2(3330);
test.insert2(6946);
test.insert2(7023);
test.insert2(2380);
test.insert2(4373);
test.insert2(5211);
test.insert2(4093);
test.insert2(7132);
test.insert2(8058);
test.graph();
