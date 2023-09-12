const scroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
});

function firstPageAnim() {
    var tl = gsap.timeline();
    tl.from("#nav", {
        y: -10,
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut,
        delay: 0.3,
    })
        .to(".boundingelem", {
            y: 0,
            ease: Expo.easeInOut,
            duration: 1.8,
            delay: -1,
            stagger: 0.2,
        })
        .from("#herofooter", {
            y: -10,
            opacity: 0,
            delay: -1,
            duration: 1.3,
            ease: Expo.easeInOut,
        })
    
        .from(".elem", {
            y: 80,
            ease: Expo.easeInOut,
            duration: 1.5,
            delay: -1,
            stagger: 0.1,
            opacity: 0,
        })
    
        .from("#about", {
            y: 80,
            stagger: 0.1,
            opacity: 0,
            delay: -1,
            duration: 1.5,
            ease: Expo.easeInOut,
        })
        .from("#subscribe", {
            x: -40,
            opacity: 0,
            delay: -1,
            duration: 1.4,
            ease: Expo.easeInOut,
            stagger: 0.1
        });
}

firstPageAnim();

function circleChaptaKaro() {
    var xscale = 1;
    var yscale = 1;

    var xPrev = 0;
    var yPrev = 0;

    window.addEventListener("mousemove", function (dets) {
        clearTimeout(timeout);
        var xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xPrev);
        var yscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xPrev);

        xprev = dets.clientX;
        yprev = dets.clientY;

        circleMouseFollower(xscale, yscale);
        var timeout = setTimeout(function () {
            document.querySelector(
                "#minicircle"
            ).style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(1,1)`;
        }, 100);
    });
}

circleChaptaKaro();

function circleMouseFollower(xscale, yscale) {
    window.addEventListener("mouseover", (dets) => {
        document.querySelector(
            "#minicircle"
        ).style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale},${yscale})`;
    });
}

//teno element ko select kro uske baad ek mousemove lagao, jab mousemove ho to ye pata kro ki mouse kha pr hai, jiska mtlb hai mouse ki x and y position pata kro, ab mouse ki x and y position ke bdle uss image ko show kro and uss img ko move kro,move krte waqt rotate kro, and jaise mouse tez chle wese wese rotation bhi tej kro

document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mousemove", function (dets) {
        var diff = dets.clientY - elem.getBoundingClientRect().top;
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;

        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: "power3",
            top: "diff",
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20, 20, diffrot * 0.7),
        });
    });

    elem.addEventListener("mouseleave", () => {
        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            duration: 0.5,
            ease: "power3",
        });
    });
});


function updateTime(){
    var currentTime = new Date()
    var hours = currentTime.getHours()
    var minutes = currentTime.getMinutes()
    if (minutes < 10){
        minutes = "0" + minutes
    }
    var t_str = hours + ":" + minutes + " ";
    if(hours > 11){
        t_str += "PM";
    } else {
        t_str += "AM";
    }
    document.getElementById('livetime').innerHTML = t_str+" "+"EST";
}
setInterval(updateTime, 1000);
