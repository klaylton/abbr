document.addEventListener('mouseover', (e)=>{
   if(e.target.tagName == "ABBR"){
     const alvo = e.target;
     if(alvo.title){
         let title = alvo.getAttribute("title");
         alvo.style.opacity = 1;
         alvo.setAttribute('data-tip', title);       
         alvo.removeAttribute("title");
     }
     alvo.addEventListener("mouseleave",function(){
         if(this.getAttribute('data-tip') != null){
             alvo.setAttribute('title', title);
             alvo.removeAttribute("data-tip");
         }
     });   
   } 
})


// Funções
function func() {
    const el = event.target;
    let title = el.getAttribute('title');
    let pos_top;

    if (el.title) {
        var tooltip = document.createElement("div");
        tooltip.setAttribute("id", "tooltip");
        tooltip.textContent = title;
        tooltip.style.opacity = 0;
        document.body.appendChild(tooltip);
        el.removeAttribute("title");
        init_tooltip();
    }

    // função iniciar
    function init_tooltip() {
        if (window.innerWidth < tooltip.offsetWidth * 1.5) {
            tooltip.style.maxWidth = (window.innerWidth / 2) + "px";
        } else {
            tooltip.style.maxWidth = "340px";
        }

        var pos_left = el.offsetLeft + (el.offsetWidth / 2) - (tooltip.offsetWidth / 2);
        pos_top = el.offsetTop - window.scrollY - tooltip.offsetHeight - 20;

        if (pos_left < 0) {
            pos_left = el.offsetLeft + el.offsetWidth / 2 - 20;
            tooltip.classList.add('left');
        } else {
            tooltip.classList.remove('left');
        }

        if (pos_left + tooltip.offsetWidth > window.innerWidth) {
            pos_left = el.offsetLeft - tooltip.offsetWidth + el.offsetWidth / 2 + 20;
            tooltip.classList.add('right');
        } else {
            tooltip.classList.remove('right');
        }

        if (pos_top < 0) {
            pos_top = el.offsetTop + el.offsetHeight + 10
            tooltip.classList.add('top');
        } else {
            pos_top = el.offsetTop - tooltip.offsetHeight - 10;
            tooltip.classList.remove('top');
        }

        tooltip.style.left = pos_left + "px";
        tooltip.style.top = pos_top + "px";


        // setInterval(function () {
        //     tooltip.style.opacity = 1;
        //     tooltip.style.top = pos_top + "px";
        // }, 50)
    }


    function esconder() {
        if (tooltip && tooltip.parentNode) {
            el.setAttribute("title", title);
            tooltip.style.top = pos_top - 20 + "px"
            tooltip.style.opacity = 0

            tooltip.addEventListener("transitionend", fn)
            function fn() {
                tooltip
                    .removeEventListener("transitionend", fn)
                document.body.removeChild(tooltip)
            }
        }
    };

    el.addEventListener("mouseleave", esconder);
    //el.addEventListener("mouseout", esconder);
}

//alert("🙌 If you like this code then dont forget to upvote +1 👆")

//}