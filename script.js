const carWrap=document.querySelector('.car-wrap'),car=document.querySelector('.car'),hint=document.querySelector('.hint'),trails=document.querySelector('.trails'),modalBg=document.querySelector('.modal-bg'),modalTag=document.querySelector('.modal-tag'),modalTitle=document.querySelector('.modal-title'),modalCopy=document.querySelector('.modal-copy'),specs=document.querySelector('.specs'),go=document.querySelector('.modal-go'),viewer=document.querySelector('.vehicle-viewer'),vehiclePhoto=document.querySelector('.vehicle-photo'),angleLabel=document.querySelector('.angle-label'),angleDots=document.querySelector('.angle-dots'),vehicleStage=document.querySelector('.vehicle-stage');
let turned=false;
let activeViews=[],viewIndex=0,dragStart=null;
const vehicleViews={
  'Apex R':['images/360/apex-1.jpg','images/360/apex-2.jpg','images/360/apex-3.jpg','images/360/apex-4.jpg'],
  'Volt GT':['images/360/volt-1.jpg','images/360/volt-2.jpg','images/360/volt-3.jpg','images/360/volt-4.jpg'],
  'Raven RR':['images/360/raven-1.jpg','images/360/raven-2.jpg','images/360/raven-3.jpg','images/360/raven-4.jpg'],
  'Blaze 900':['images/360/blaze-1.jpg','images/360/blaze-2.jpg','images/360/blaze-3.jpg','images/360/blaze-4.jpg']
};
function moveCar(){const max=document.documentElement.scrollHeight-innerHeight,p=max?Math.min(scrollY/max,1):0,lane=Math.sin(p*Math.PI*3.4),turn=Math.cos(p*Math.PI*3.4);carWrap.style.left=(70+lane*15)+'%';carWrap.style.top=(18+p*65)+'vh';carWrap.style.transform=`translateX(-50%) rotateZ(${turn*-10}deg) rotateY(${lane*24}deg) rotateX(${Math.abs(turn)*5}deg) scale(${.8+p*.25})`;trails.classList.toggle('moving',p>.015);if(!turned)hint.textContent=p<.02?'BAJA PARA CONDUCIR':'TOCA PARA VER EL MALETERO'}
addEventListener('scroll',moveCar,{passive:true});moveCar();
function welcome(){viewer.hidden=true;modalTag.textContent='BIENVENIDO A BORDO';modalTitle.innerHTML='TU GUÍA HACIA LOS<br><em>MEJORES COCHES.</em>';modalCopy.textContent='Explora la colección, compara su potencia y encuentra el auto que conecta contigo.';specs.hidden=true;go.hidden=false;modalBg.hidden=false}
car.addEventListener('click',()=>{if(turned)return;turned=true;car.classList.add('open');hint.textContent='MOSTRANDO PARTE TRASERA';setTimeout(welcome,1150)});
function showAngle(index){if(!activeViews.length)return;viewIndex=(index+activeViews.length)%activeViews.length;vehiclePhoto.classList.add('changing');setTimeout(()=>{vehiclePhoto.src=activeViews[viewIndex];vehiclePhoto.alt=`${modalTitle.textContent}, ángulo ${viewIndex+1} de ${activeViews.length}`;angleLabel.textContent=`VISTA ${viewIndex+1} DE ${activeViews.length}`;angleDots.querySelectorAll('button').forEach((dot,i)=>dot.classList.toggle('active',i===viewIndex));vehiclePhoto.classList.remove('changing')},110)}
function openVehicle(card){activeViews=vehicleViews[card.dataset.name]||[];viewIndex=0;viewer.hidden=false;modalTag.textContent=card.dataset.type;modalTitle.textContent=card.dataset.name;modalCopy.textContent='Conoce su diseño desde todos los ángulos. Desliza la imagen para recorrer la carrocería y consulta sus características principales.';specs.innerHTML=`<span>POTENCIA<strong>${card.dataset.power}</strong></span><span>0–100 KM/H<strong>${card.dataset.zero}</strong></span><span>VISTAS<strong>360°</strong></span>`;specs.hidden=false;go.hidden=true;angleDots.innerHTML=activeViews.map((_,i)=>`<button aria-label="Ver ángulo ${i+1}" data-angle="${i}"></button>`).join('');angleDots.querySelectorAll('button').forEach(dot=>dot.addEventListener('click',()=>showAngle(+dot.dataset.angle)));showAngle(0);modalBg.hidden=false}
document.querySelectorAll('.card').forEach(card=>card.addEventListener('click',()=>openVehicle(card)));
document.querySelector('.prev').addEventListener('click',()=>showAngle(viewIndex-1));document.querySelector('.next').addEventListener('click',()=>showAngle(viewIndex+1));
vehicleStage.addEventListener('pointerdown',e=>{dragStart=e.clientX;vehicleStage.setPointerCapture(e.pointerId)});vehicleStage.addEventListener('pointerup',e=>{if(dragStart===null)return;const delta=e.clientX-dragStart;if(Math.abs(delta)>28)showAngle(viewIndex+(delta<0?1:-1));dragStart=null});
function closeModal(){modalBg.hidden=true;car.classList.remove('open');turned=false;hint.textContent='TOCA PARA VER EL MALETERO'}
document.querySelector('.close').addEventListener('click',closeModal);modalBg.addEventListener('click',e=>{if(e.target===modalBg)closeModal()});addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});go.addEventListener('click',()=>{closeModal();document.querySelector('#modelos').scrollIntoView({behavior:'smooth'})});
/* ==========================================================
   PESTAÑAS + MENU HAMBURGUESA
   COCHES 3D <-> SPECTRA
   PEGAR AL FINAL DE script.js
========================================================== */

const portfolioNavBtn =
  document.getElementById("portfolioNavBtn");

const portfolioNavPanel =
  document.getElementById("portfolioNavPanel");

const portfolioNavOverlay =
  document.getElementById("portfolioNavOverlay");

const portfolioNavClose =
  document.getElementById("portfolioNavClose");


function abrirPortfolioNav(){

  if(
    !portfolioNavBtn ||
    !portfolioNavPanel ||
    !portfolioNavOverlay
  ){
    return;
  }

  portfolioNavBtn.classList.add("is-open");

  portfolioNavPanel.classList.add("is-open");

  portfolioNavOverlay.classList.add("is-open");

  portfolioNavBtn.setAttribute(
    "aria-expanded",
    "true"
  );

  portfolioNavPanel.setAttribute(
    "aria-hidden",
    "false"
  );

}


function cerrarPortfolioNav(){

  if(
    !portfolioNavBtn ||
    !portfolioNavPanel ||
    !portfolioNavOverlay
  ){
    return;
  }

  portfolioNavBtn.classList.remove("is-open");

  portfolioNavPanel.classList.remove("is-open");

  portfolioNavOverlay.classList.remove("is-open");

  portfolioNavBtn.setAttribute(
    "aria-expanded",
    "false"
  );

  portfolioNavPanel.setAttribute(
    "aria-hidden",
    "true"
  );

}


if(portfolioNavBtn){

  portfolioNavBtn.addEventListener(
    "click",
    function(){

      const abierto =
        portfolioNavPanel.classList.contains(
          "is-open"
        );

      if(abierto){

        cerrarPortfolioNav();

      }else{

        abrirPortfolioNav();

      }

    }
  );

}


if(portfolioNavClose){

  portfolioNavClose.addEventListener(
    "click",
    cerrarPortfolioNav
  );

}


if(portfolioNavOverlay){

  portfolioNavOverlay.addEventListener(
    "click",
    cerrarPortfolioNav
  );

}


/* CERRAR CON ESC */

document.addEventListener(
  "keydown",
  function(event){

    if(event.key === "Escape"){
      cerrarPortfolioNav();
    }

  }
);


/* CERRAR EL PANEL AL ELEGIR UNA PAGINA */

document
  .querySelectorAll(".portfolioNavTab")
  .forEach(function(enlace){

    enlace.addEventListener(
      "click",
      cerrarPortfolioNav
    );

  });


/* ==========================================================
   FIN PESTAÑAS + MENU HAMBURGUESA
========================================================== */