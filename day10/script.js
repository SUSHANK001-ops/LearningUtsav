gsap.to("#page2 h1",{
    transform: "translate(-170%)",
    scrollTrigger:{
        trigger:"#page2 ",
        scroller:"body",
        marker:true,
        start:"top 0%",
        top:"top -200%",
        scrub:4,
        pin:true

    }
})