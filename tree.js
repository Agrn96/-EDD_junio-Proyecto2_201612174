class Node {
  constructor(item = null) {
    this.item = item;
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

  insertNodeHelper(node, item) {

    if (node == null) {
      return (new Node(item));
    }

    if (item < node.item) {
      node.left = this.insertNodeHelper(node.left, item);
    } else if (item > node.item) {
      node.right = this.insertNodeHelper(node.right, item);
    } else {
      return node;
    }

    node.height = 1 + Math.max(this.height(node.left), this.height(node.right));
    let balanceFactor = this.getBalanceFactor(node);

    if (balanceFactor > 1) {
      if (item < node.left.item) {
        return this.rightRotate(node);
      } else if (item > node.left.item) {
        node.left = this.leftRotate(node.left);
        return this.rightRotate(node);
      }
    }

    if (balanceFactor < -1) {
      if (item > node.right.item) {
        return this.leftRotate(node);
      } else if (item < node.right.item) {
        node.right = this.rightRotate(node.right);
        return this.leftRotate(node);
      }
    }
    return node;
  }

  insertNode(item) {
    this.root = this.insertNodeHelper(this.root, item);
  }

  nodeWithMimumValue(node) {
    let current = node;
    while (current.left !== null) {
      current = current.left;
    }
    return current;
  }

  deleteNodeHelper(node, item) {

    if (node == null) {
      return node;
    }
    if (item < node.item) {
      node.left = deleteNodeHelper(node.left, item);
    } else if (item > node.item) {
      node.right = deleteNodeHelper(node.right, item);
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
        this.root.item = temp.item;
        this.root.right = deleteNodeHelper(this.root.right, temp.item);
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

  deleteNode(item) {
    root = deleteNodeHelper(this.root, item);
  }

  preOrder() {
    this.preOrderHelper(this.root);
  }

  preOrderHelper(node) {
    if (node) {
      console.log(node.item);
      this.preOrderHelper(node.left);
      this.preOrderHelper(node.right);
    }
  }
  graficadora(temp) { 
    let cadena = "";
    if (temp === null) {
      return cadena;
    }
    cadena = "nodo" + temp.item + " [label = \"" + temp.item + "\"]; \n"; // DPI: " + temp.dpi + "\\n 

    if (temp.left != null) {//:C0
      cadena = cadena + this.graficadora(temp.left) + "nodo" + temp.item + " -> nodo" + temp.left.item + "\n";
    }
    if (temp.right != null) {//:C1
      cadena = cadena + this.graficadora(temp.right) + "nodo" + temp.item + " -> nodo" + temp.right.item + "\n";
    }
    return cadena;
  }
  
  graph(path) {
    let str = "";
    str = "digraph G{\nlabel=\"  \";\ngraph[size=\"10,8\"]; \n";
    if (this.root) {
      let current = this.root;
      let counter = 0;
      str += this.graficadora(this.root);
    }
    str += '}';
    console.log(str);
    //d3.select(path).graphviz().width(1000).height(1000).renderDot(str);
  }

}

tree = new AVLTree();
tree.insertNode(7140394722109);
tree.insertNode(5710530186284);
tree.insertNode(2561983506422);
tree.insertNode(7851050325132);
tree.insertNode(6568804293458);
tree.insertNode(2984229606920);
tree.insertNode(9716381936092);
tree.insertNode(1219344961531);
tree.insertNode(8154736748444);
tree.insertNode(4560930105887);
tree.insertNode(3601995024933);
tree.insertNode(8175940098554);
tree.insertNode(3679640345001);
tree.insertNode(3542469120193);
tree.insertNode(9038170328286);
tree.insertNode(4862364527422);
tree.insertNode(1175928735759);
tree.insertNode(6124436571933);
tree.insertNode(4306113783482);
tree.preOrder();
tree.graph('#graph');