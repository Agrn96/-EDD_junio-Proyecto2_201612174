// Create node
class Node_AVL {
  constructor(id_Pelicula = null, nombre_Pelicula, descripcion, puntuacion_Star, precio_Q) {
    this.id_Pelicula = id_Pelicula;
    this.nombre_Pelicula = nombre_Pelicula;
    this.descripcion = descripcion;
    this.puntuacion_Star = puntuacion_Star;
    this.precio_Q = precio_Q;
    this.height = 1;
    this.left = null;
    this.right = null;
  }
}

class AVLTree {
  constructor() {
    this.root = null;
  }

  height(N) {
    if (N === null) {
      return 0;
    }
    return N.height;
  }

  rightRotate(y) {
    let x = y.left;
    let T2 = x.right;
    x.right = y;
    y.left = T2;
    y.height = Math.max(this.height(y.left), this.height(y.right)) + 1;
    x.height = Math.max(this.height(x.left), this.height(x.right)) + 1;
    return x;
  }

  leftRotate(x) {
    let y = x.right;
    let T2 = y.left;
    y.left = x;
    x.right = T2;
    x.height = Math.max(this.height(x.left), this.height(x.right)) + 1;
    y.height = Math.max(this.height(y.left), this.height(y.right)) + 1;
    return y;
  }

  getBalanceFactor(N) {
    if (N == null) {
      return 0;
    }

    return this.height(N.left) - this.height(N.right);
  }

  insertNodeHelper(node, id_Pelicula, nombre_Pelicula, descripcion, puntuacion_Star, precio_Q) {

    if (node == null) {
      return (new Node_AVL(id_Pelicula, nombre_Pelicula, descripcion, puntuacion_Star, precio_Q));
    }

    if (id_Pelicula < node.id_Pelicula) {
      node.left = this.insertNodeHelper(node.left, id_Pelicula, nombre_Pelicula, descripcion, puntuacion_Star, precio_Q);
    } else if (id_Pelicula > node.id_Pelicula) {
      node.right = this.insertNodeHelper(node.right, id_Pelicula, nombre_Pelicula, descripcion, puntuacion_Star, precio_Q);
    } else {
      return node;
    }

    node.height = 1 + Math.max(this.height(node.left), this.height(node.right));
    let balanceFactor = this.getBalanceFactor(node);

    if (balanceFactor > 1) {
      if (id_Pelicula < node.left.id_Pelicula) {
        return this.rightRotate(node);
      } else if (id_Pelicula > node.left.id_Pelicula) {
        node.left = this.leftRotate(node.left);
        return this.rightRotate(node);
      }
    }

    if (balanceFactor < -1) {
      if (id_Pelicula > node.right.id_Pelicula) {
        return this.leftRotate(node);
      } else if (id_Pelicula < node.right.id_Pelicula) {
        node.right = this.rightRotate(node.right);
        return this.leftRotate(node);
      }
    }
    return node;
  }

  insertNode(id_Pelicula, nombre_Pelicula, descripcion, puntuacion_Star, precio_Q) {
    this.root = this.insertNodeHelper(this.root, id_Pelicula, nombre_Pelicula, descripcion, puntuacion_Star, precio_Q);
  }

  nodeWithMimumValue(node) {
    let current = node;
    while (current.left !== null) {
      current = current.left;
    }
    return current;
  }

  deleteNodeHelper(node, id_Pelicula) {

    if (node == null) {
      return node;
    }
    if (id_Pelicula < node.id_Pelicula) {
      node.left = deleteNodeHelper(node.left, id_Pelicula);
    } else if (id_Pelicula > node.id_Pelicula) {
      node.right = deleteNodeHelper(node.right, id_Pelicula);
    } else {
      if ((node.left === null) || (node.right === null)) {
        let temp = null;
        if (temp == node.left) {
          temp = node.right;
        } else {
          temp = node.left;
        }

        if (temp == null) {
          temp = this.root;
          this.root = null;
        } else {
          this.root = temp;
        }
      } else {
        let temp = this.nodeWithMimumValue(this.root.right);
        this.root.id_Pelicula = temp.id_Pelicula;
        this.root.right = deleteNodeHelper(this.root.right, temp.id_Pelicula);
      }
    }
    if (root == null) {
      return root;
    }

    this.root.height = Math.max(this.height(this.root.left), this.height(this.root.right)) + 1;

    let balanceFactor = this.getBalanceFactor(root);
    if (balanceFactor > 1) {
      if (this.getBalanceFactor(this.root.left) >= 0) {
        return this.rightRotate(this.root);
      } else {
        root.left = this.leftRotate(this.root.left);
        return this.rightRotate(this.root);
      }
    }
    if (balanceFactor < -1) {
      if (this.getBalanceFactor(this.root.right) <= 0) {
        return this.leftRotate(this.root);
      } else {
        root.right = this.rightRotate(this.root.right);
        return this.leftRotate(this.root);
      }
    }
    return root;
  }

  deleteNode(id_Pelicula) {
    root = deleteNodeHelper(this.root, id_Pelicula);
  }

  preOrder() {
    this.preOrderHelper(this.root);
  }

  preOrderHelper(node) {
    if (node) {
      console.log(node.id_Pelicula);
      this.preOrderHelper(node.left);
      this.preOrderHelper(node.right);
    }
  }
  graficadora(temp) {
    let cadena = "";
    if (temp === null) {
      return cadena;
    }
    cadena = "nodo" + temp.id_Pelicula + " [label = \"" + temp.id_Pelicula + "\"]; \n"; // DPI: " + temp.dpi + "\\n 

    if (temp.left != null) {//:C0
      cadena = cadena + this.graficadora(temp.left) + "nodo" + temp.id_Pelicula + " -> nodo" + temp.left.id_Pelicula + "\n";
    }
    if (temp.right != null) {//:C1
      cadena = cadena + this.graficadora(temp.right) + "nodo" + temp.id_Pelicula + " -> nodo" + temp.right.id_Pelicula + "\n";
    }
    return cadena;
  }
  graph(path) {
    let str = "";
    str = "digraph G{\nlabel=\" Peliculas \";\ngraph[size=\"10,8\"]; \n";
    if (this.root) {
      let current = this.root;
      let counter = 0;
      str += this.graficadora(this.root);
    }
    str += '}';
    //console.log(str);
    d3.select(path).graphviz().width(1000).height(1000).renderDot(str);
  }

}

peliculas = new AVLTree();