"use strict";
const programmes = [
    { title: "Diploma in ICT", duration: "3 Years", level: "NQF 6" },
    { title: "Extended Diploma", duration: "4 Years", level: "NQF 6" },
    { title: "Advanced Diploma", duration: "1 Year", level: "NQF 7" }
];
const container = document.getElementById("programCards");
programmes.forEach(p => {
    const card = document.createElement("div");
    card.className = "card hidden";
    card.innerHTML = `
    <h3>${p.title}</h3>
    <p>${p.duration}</p>
    <p>${p.level}</p>
  `;
    container.appendChild(card);
});
/* SCROLL ANIMATION */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
});
const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach(el => observer.observe(el));
