let tl = gsap.timeline();

tl.from("h1",{
    y:-30,
    duration:0.3,
    delay:1,
    opacity:0
})
tl.from("h3",{
    y:-30,
    duration:0.3,
    opacity:0,
    stagger:0.1,
})
tl.from("h4",{
    y:40,
    duration:0.6,
    opacity:0,
    scale:0.2
})