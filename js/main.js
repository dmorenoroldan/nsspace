/* ============ COPIAR AL PORTAPAPELES ============ */
var clip = new Clipboard('.copy');
clip.on('success', function(e) {
  nativeToast({
    message: '¡Copiado!',
    timeout: 5000,
    position: 'south'
  })
});

clip.on('error', function(e) {
  nativeToast({
    message: 'Error, inténtalo de nuevo',
    timeout: 5000,
    position: 'south'
  })
});

/* ============ REDONDEAR 3 DECIMALES ============ */
function roundTo(num) {
  return +(Math.round(num + "e+3")  + "e-3");
}

/* ============ CALCULAR REM ============ */
function calcularRem(num,lh,op) {
  var del;
  del = 0;
  if (op==0) {
    del = lh*num;
  }
  else {
    del = lh/num;
  }
  return del;
}

/* ============ CALCULAR SPACE ============ */
function calcularSpace(num,op) {
  var del;
  del = 0;
  if (op==0) {
    del = 1*num;
  }
  else {
    del = 1/num;
  }
  return del;
}

/* ============ ADD FILA ============ */
function addFila(name,space,rem) {
  var _valorfont = $("#fontsize").val();
  var fontsize = parseInt(_valorfont);
  var pixel = fontsize*rem;
  $("#resultado").append("<div><div><a class='copy' data-clipboard-text='"+name+"'>"+name+"</a></div><div><a class='copy' data-clipboard-text='"+roundTo(space)+"'>"+roundTo(space)+"</a></div><div><a class='copy' data-clipboard-text='"+roundTo(rem)+"'>"+roundTo(rem)+"</a></div><div><a class='copy' data-clipboard-text='"+roundTo(pixel)+"'>"+roundTo(pixel)+"px</a></div><div> <span class='result' style='width:"+pixel+"px'></span></div></div>");
}


/* ============ ADD VALOR ============ */
function addValor(name,num,op,bRem) {
    var _rem = calcularRem(num,bRem,op);
    var _spa = calcularSpace(num,op);
    addFila(name,_spa,_rem);
}


/* ============ HACER CALCULO ============ */
$('#calc').click(function() {
  var _valorfont = $("#fontsize").val();
  var fontsize = parseInt(_valorfont);

  var _valorline = $("#lineheight").val();
  var lineheight = parseInt(_valorline);

  if (fontsize>0 && lineheight>0) {
    var baseRem = lineheight/fontsize;

    $("#resultado").remove();
    $("#form").after("<div id='resultado'><div><div>Math</div><div>Space</div><div>Rem</div><div>Pixel</div><div>Resultado</div></div></div>");

    addValor("d6",6,1,baseRem);
    addValor("d5",5,1,baseRem);
    addValor("d4",4,1,baseRem);
    addValor("d3",3,1,baseRem);
    addValor("d2",2,1,baseRem);
    addValor("d1-2",1.5,1,baseRem);
    addFila("x1","1",baseRem);
    addValor("x1-2",1.5,0,baseRem);
    addValor("x2",2,0,baseRem);
    addValor("x3",3,0,baseRem);
    addValor("x4",4,0,baseRem);
    addValor("x5",5,0,baseRem);
    addValor("x6",6,0,baseRem);
  }
  else {
    console.log("error");
  }
});
