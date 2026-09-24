document.addEventListener("DOMContentLoaded", () => {
    const menu = document.querySelector(".menu");
    const nav = document.querySelector(".navlinks");
    if (menu && nav) {
        menu.addEventListener("click", () => {
            const open = nav.classList.toggle("open");
            menu.setAttribute("aria-expanded", open);
            menu.textContent = open ? "×" : "☰";
        });
    }
    document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener("click", e => {
            const id = a.getAttribute("href");
            const target = document.querySelector(id);
            if (target) { e.preventDefault(); target.scrollIntoView({ behavior: "smooth" }); nav?.classList.remove("open"); }
        });
    });

    // Gallery lightbox
    const items = [...document.querySelectorAll(".gallery-item")];
    const box = document.querySelector(".lightbox");
    if (items.length && box) {
        const img = box.querySelector("img");
        const cap = box.querySelector("figcaption");
        let i = 0, opener = null;
        const show = n => {
            i = (n + items.length) % items.length;
            img.src = items[i].dataset.full;
            img.alt = items[i].querySelector("img").alt;
            cap.textContent = items[i].dataset.caption || "";
        };
        const open = n => { opener = items[n]; show(n); box.hidden = false; document.body.style.overflow = "hidden"; box.querySelector(".lb-close").focus(); };
        const close = () => { box.hidden = true; document.body.style.overflow = ""; opener && opener.focus(); };
        items.forEach((el, n) => el.addEventListener("click", () => open(n)));
        box.querySelector(".lb-close").addEventListener("click", close);
        box.querySelector(".lb-prev").addEventListener("click", () => show(i - 1));
        box.querySelector(".lb-next").addEventListener("click", () => show(i + 1));
        box.addEventListener("click", e => { if (e.target === box) close(); });
        document.addEventListener("keydown", e => {
            if (box.hidden) return;
            if (e.key === "Escape") close();
            if (e.key === "ArrowLeft") show(i - 1);
            if (e.key === "ArrowRight") show(i + 1);
        });
    }
});