function setup() {
  createCanvas(400, 400);
}

class Figura1 {
  constructor(x, y, alto, ancho, vx, vy) {
    this.posicion = createVector(x, y);
    this.alto = alto;
    this.ancho = ancho;
    this.color = color(255, 87, 57);
    this.velocidad = createVector(vx, vy);
    
  }
  
  dibujar() {
    fill(this.color);
    rect(this.posicion.x,this.posicion.y,this.alto,this.ancho);
  
  }
}


class Figura2 {
  constructor(x, y, alto, ancho, vx, vy) {
    this.posicion = createVector(x, y);
    this.alto = alto;
    this.ancho = ancho;
    this.color = color(255, 87, 57);
    this.velocidad = createVector(vx, vy);
    
  }
  
  dibujar() {
    fill(this.color);
    ellipse(this.posicion.x,this.posicion.y,this.alto,this.ancho);
  
  }
}



class Rectangulo extends Figura1 {
  constructor(x, y, alto, ancho, vx, vy) {
    super(x, y, alto, ancho, vx, vy);
  }

  actualizar() {
    // Mover el rectángulo con las teclas WASD
    if (keyIsDown(87)) { // tecla W
      if (this.posicion.y > 0) {
        this.posicion.y -= 5;
      }
    }
    if (keyIsDown(83)) { // tecla A
      if (this.posicion.y < height - this.alto) {
        this.posicion.y += 5;
      }
    }
    if (keyIsDown(65)) { // tecla S
      if (this.posicion.x > 0) {
        this.posicion.x -= 5;
      }
    }
    if (keyIsDown(68)) { // tecla D
      if (this.posicion.x < width - this.ancho) {
        this.posicion.x += 5;
      }
    }

  /*  // Ajustar la posición del rectángulo si se salió del canvas
    if (this.posicion.y < 0) {
      this.posicion.y = 0;
    }
    if (this.posicion.y + this.alto > height) {
      this.posicion.y = height - this.alto;
    }
    if (this.posicion.x < 0) {
      this.posicion.x = 0;
    }
    if (this.posicion.x + this.ancho > width) {
      this.posicion.x = width - this.ancho;
    } */
  } 

  dibujar() {
    fill(this.color);
    rect(this.posicion.x, this.posicion.y, this.ancho, this.alto);
  }

  colision(circulo) {
    // calcular la distancia entre el centro del círculo y el rectángulo
  let dx = circulo.posicion.x - max(this.posicion.x, min(circulo.posicion.x, this.posicion.x + this.ancho));
    let dy = circulo.posicion.y - max(this.posicion.y, min(circulo.posicion.y, this.posicion.y + this.alto));
    let distancia = sqrt(dx * dx + dy * dy); 

    // si la distancia es menor o igual al radio del círculo, hay colisión
    if (distancia <= circulo.alto / 2) {
      return true;
    } else {
      return false;
    }
  }
}


class circulo extends Figura2 {
  constructor(x, y, alto, ancho, vx, vy) {
    super(x, y, alto, ancho, vx, vy);
  }
 
  actualizar() {
    this.posicion.add(this.velocidad);
    
    if (this.posicion.x - this.ancho / 2 < 0 || this.posicion.x + this.ancho / 2 > width) {
      // Cambiar la dirección del movimiento en el eje x
      this.velocidad.x *= -1;
    }
    if (this.posicion.y - this.alto / 2 < 0) {
      // Detener el movimiento de la pelota
      this.velocidad = createVector(0, 0);
      // Reposicionar la pelota fuera del canvas
      this.posicion = createVector(-100, -100);
    } else if (this.posicion.y + this.alto / 2 > height) {
      // Cambiar la dirección del movimiento en el eje y
      this.velocidad.y *= -1;
    }
  }
  
  dibujar() {
    fill(this.color);
    ellipse(this.posicion.x, this.posicion.y, this.alto, this.ancho);

    // Comprobar si hay una colisión con el rectángulo
    if (miRectangulo.colision(this)) {
      // Cambiar la dirección del movimiento del círculo
      this.velocidad.mult(-5, 1);

      // Cambiar la velocidad a valores aleatorios
      this.velocidad.x = random(-5, 5);
      this.velocidad.y = random(5, 10);
    }
  }
}



function setup() 
{
  createCanvas(400, 400);
  miRectangulo = new Rectangulo(175 , 25 ,20, 65, 0, 0);  
  micirculo = new circulo(175 , 180 ,20, 20, 0, -1); 
}

function draw() {
  background(220);
  
  micirculo.dibujar();
 micirculo.actualizar(); 
  
  miRectangulo.actualizar();
  miRectangulo.dibujar();
}