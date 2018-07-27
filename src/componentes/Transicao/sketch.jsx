export default function sketch (p) {
    const cor = "black",
        incremento = 10,
        delayToIn = 0,
        delayToOut = 1000,
        
        canvas = document.querySelector("canvas#transicao"),
        ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.zIndex = 999;

    let radius,
        direcao,
        center = {x: canvas.width / 2, y: canvas.height / 2},
        pointIn = center,
        pointOut = center,
        mude,
        fim

  
    p.setup = function () {
        radius = p.max(canvas.width, canvas.height);
        direcao = -1;
        p.frameRate(120);
    };

    p.myCustomRedrawAccordingToNewPropsHandler = (new_props) => {
        fim = new_props.fim;
        mude = new_props.mude;
        pointIn = new_props.pointIn || center;
        pointOut = new_props.pointOut || center;
    }
  
    p.draw = function () {
        let pointX, pointY;
        if (direcao > 0) {
            pointX = pointIn.x
            pointY = pointIn.y
        } else if (direcao < 0) {
            pointX = pointOut.x
            pointY = pointOut.y
        }
        radius += incremento * direcao;
        
        if (radius <= 0) {
            radius = 0;
            mude();
            setTimeout(() => direcao = 1, delayToIn);
        } if (radius >= p.max(canvas.width, canvas.height)+incremento) {
            fim();
            p.noLoop();
            setTimeout(() => direcao = -1, delayToOut);
        }
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = cor;
        ctx.beginPath();
        ctx.arc(pointX, pointY, radius, 0, 2 * Math.PI);
        ctx.rect(canvas.width, 0, -canvas.width, canvas.height);
        ctx.fill();
    };
  };