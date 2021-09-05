const navbar = document.querySelector(".navbar")
const hiddenNavbar = document.querySelector(".hidden-nav")
const navbarBtn = document.querySelector(".navbar-icon")
const navLinks = document.querySelectorAll(".nav-links")

const sections = document.querySelectorAll(".section")
const header = document.querySelector(".header")
const video = document.querySelector(".header video")

const spiner = document.querySelector(".spiner")
const spinerIcons = document.querySelectorAll(".spiner-icons")
const spinerContent = document.querySelectorAll(".spiner-content-text")

// ! styling

navbar.style.top = `-${navbar.getBoundingClientRect().height}px`;

const headerHeightChange = () => {
    header.style.height = `${video.getBoundingClientRect().height}px`

}
const spinerHeightChange = () => {
    spiner.style.height = `${spiner.getBoundingClientRect().width}px`

}
window.addEventListener("load", () => {
    headerHeightChange()
    spinerHeightChange()
})
window.addEventListener("resize", () => {
    headerHeightChange()
    spinerHeightChange()
})



// ! hidden menu

navbarBtn.addEventListener("click", function (e) {
    e.preventDefault()
    hiddenNavbar.classList.toggle("hidden")
})



// ! scroll events

window.onscroll = function () {
    scrollFunction()
};

function scrollFunction() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        navbar.style.top = "0";
    } else {
        navbar.style.top = `-${navbar.getBoundingClientRect().height}px`;
    }
}

// ! menu links activating on scroll

window.addEventListener("scroll", () => {
    let current;
    let end;
    sections.forEach((section) => {
        const sectionHeight = section.clientHeight;
        const sectionTop = section.offsetTop;
        const sectionBottom = section.offsetBottom;

        end = section.offsetBottom;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((li) => {
        const href = li.getAttribute("href");
        li.classList.remove("active");
        if (li.href.includes(current)) {
            li.classList.add("active");
        }
    });
});

// ! scroll into view

// * menu


navbar.addEventListener("click", function (e) {

    const clicked = e.target.closest(".nav-links")
    if (!clicked) return;
    e.preventDefault();
    const id = e.target.getAttribute("href");
    document.querySelector(`${id}`).scrollIntoView({
        behavior: "smooth"
    });
});

hiddenNavbar.addEventListener("click", function (e) {
    e.preventDefault();
    const clicked = e.target.closest(".nav-links");
    if (!clicked) return;
    hiddenNavbar.classList.add("hidden");
    const id = clicked.getAttribute("href");
    document.querySelector(`${id}`).scrollIntoView({
        behavior: "smooth"
    });
});

// ! observers

// ? spinner


const spinnerDisplay = function (entries) {
    const [entry] = entries;
    if (!entry.isIntersecting) {
        spinerIcons.forEach(icon => icon.classList.add("centered"))
    } else {
        spinerIcons.forEach(icon => icon.classList.remove("centered"))

    }
};
const menuObserver = new IntersectionObserver(spinnerDisplay, {
    root: null,
    threshold: 0,
    rootMargin: "-20px",
});
menuObserver.observe(spiner);

// ! services slider

new Swiper(".services-slider-container", {
    navigation: {
        prevEl: ".swiper-button-prev",
        nextEl: ".swiper-button-next"
    },
    slidesPerView: 1,
    breakpoints: {
        // when window width is >= 991px
        1100: {
            slidesPerView: 3,
            //   spaceBetween: 20,
        },
    },
    loop: true,
    centeredSlides: true,
    speed: 1000,
});


// ! swiper circle


let cur = 1;



const spinerContentActivateFunc = () => {
    spinerContent.forEach(el => {
        el.classList.remove("active")
        if (el.dataset.circle === document.querySelector(".spiner-icons.active").dataset.circle) {
            el.classList.add("active")
        }
    })
}

const spinerIconsActivateFunc = () => {
    if (cur == 6) {
        cur = 1
    } else {

        cur += 1
    }
    spinerIcons.forEach(el => {
        el.classList.remove("active")
    })
    document.querySelector(`.spiner-icons:nth-child(${cur})`).classList.add("active")

    spinerContentActivateFunc()
}
let spinerInterval = setInterval(spinerIconsActivateFunc, 4000)



spinerIcons.forEach(icon => {
    icon.addEventListener("mouseenter", (e) => {
        clearInterval(spinerInterval)
        spinerIcons.forEach(el => el.classList.remove("active"))
        e.target.classList.add("active")
        spinerContentActivateFunc()
    })
    icon.addEventListener("mouseleave", function () {
        spinerInterval = setInterval(spinerIconsActivateFunc, 4000)
    })
})




// ! work boxes product sorting

const workNav = document.querySelector(".work-nav")
const workBoxes = document.querySelectorAll(".work-box")


workNav.addEventListener("click", function (e) {
    clicked = e.target.closest("a")
    if (!clicked) return
    [...clicked.parentNode.children].forEach(el => {
        e.preventDefault()
        el.classList.remove("active")
    })
    clicked.classList.add("active")
    e.preventDefault()
    workBoxes.forEach(el => {
        if (el.dataset.product.includes(clicked.textContent.toLowerCase())) {
            el.style.display = "block"
            el.style.animation = "displaying 0.5s"
        } else {
            el.style.display = "none"

        }
    })
})


// ! work product description

// ? insertAdjacentHTML



const createElementFunc = function () {

    const productObj = {

        CleanDeviceDisplay: {
            imgs: [
                '<img src="./img/CleanDeviceDisplay1.jpg" alt="product" class="slide swiper-slide">',
                '<img src="./img/CleanDeviceDisplay2.jpg" alt="product" class="slide swiper-slide">',
                '<img src="./img/CleanDeviceDisplay3.jpg" alt="product" class="slide swiper-slide">',

            ],
        },
        CleanWatches: {
            imgs: [],
            video: "https://player.vimeo.com/video/193851364?h=e1365ea1e4&color=ffffff&title=0&byline=0&portrait=0",
        },
        AppleIwatch: {
            imgs: [
                '<img src="./img/AppleIwatch1.jpg" alt="product" class="slide swiper-slide">',
                '<img src="./img/AppleIwatch2.jpg" alt="product" class="slide swiper-slide">',
                '<img src="./img/AppleIwatch3.jpg" alt="product" class="slide swiper-slide">',
            ],



        },
        OfficeMaterials: {
            imgs: [
                '<img src="./img/OfficeMaterials1.jpg" alt="product" class="slide swiper-slide">',
                '<img src="./img/OfficeMaterials1.jpg" alt="product" class="slide swiper-slide">',
                '<img src="./img/OfficeMaterials1.jpg" alt="product" class="slide swiper-slide">',
            ],



        },
        BlackPhone: {
            imgs: [
                '<img src="./img/BlackPhone1.jpg" alt="product" class="slide swiper-slide">',
                '<img src="./img/BlackPhone2.jpg" alt="product" class="slide swiper-slide">',

            ],



        },
        LightningUpgrade: {
            imgs: [
                '<img src="./img/LightningUpgrade1.jpg" alt="product" class="slide swiper-slide">',
                '<img src="./img/LightningUpgrade2.jpg" alt="product" class="slide swiper-slide">',
                '<img src="./img/LightningUpgrade3.jpg" alt="product" class="slide swiper-slide">',
            ],



        },
        HazelSkechbook: {
            imgs: [
                '<img src="./img/HazelSkechbook1.jpg" alt="product" class="slide swiper-slide">',
                '<img src="./img/HazelSkechbook2.jpg" alt="product" class="slide swiper-slide">',
                '<img src="./img/HazelSkechbook3.jpg" alt="product" class="slide swiper-slide">',
            ],



        },
        AppleImac: {
            imgs: [
                '<img src="./img/AppleImac1.jpg" alt="product" class="slide swiper-slide">',
                '<img src="./img/AppleImac2.jpg" alt="product" class="slide swiper-slide">',
                '<img src="./img/AppleImac3.jpg" alt="product" class="slide swiper-slide">',
            ],



        },
        RadioDesk: {
            imgs: [
                '<img src="./img/RadioDesk1.jpg" alt="product" class="slide swiper-slide">',
            ],



        },
        EspectalCoffeeCup: {
            imgs: [
                '<img src="./img/EspectalCoffeeCup1.jpg" alt="product" class="slide swiper-slide">',
                '<img src="./img/EspectalCoffeeCup2.jpg" alt="product" class="slide swiper-slide">',
                '<img src="./img/EspectalCoffeeCup3.jpg" alt="product" class="slide swiper-slide">',
            ],



        },
        AppleDevice: {
            imgs: [
                '<img src="./img/AppleDevice1.jpg" alt="product" class="slide swiper-slide">',
                '<img src="./img/AppleDevice2.jpg" alt="product" class="slide swiper-slide">',
                '<img src="./img/AppleDevice3.jpg" alt="product" class="slide swiper-slide">',
            ],



        },
        PersonalMaterials: {
            imgs: [
                '<img src="./img/PersonalMaterials1.jpg" alt="product" class="slide swiper-slide">',
                '<img src="./img/PersonalMaterials2.jpg" alt="product" class="slide swiper-slide">',
                '<img src="./img/PersonalMaterials3.jpg" alt="product" class="slide swiper-slide">',
            ],



        },
    }


    
    workBoxes.forEach(box => {
        box.addEventListener("click", function (e) {
            let clicked = e.target.closest(".overlay").firstElementChild.textContent
            let clickedName = clicked
            .toLocaleLowerCase()
            .split(" ")
            .map(el => [el[0].toUpperCase() + el.slice(1)])
            .join("")
            
            let clickedLabel = e.target.closest(".overlay").firstElementChild.textContent
            .toLowerCase()
            .split(" ")
            .map(el => [el[0].toUpperCase() + el.slice(1)])
            .join(" ");
            
            let html = `
            <div class="prod-description-container container">
                <div class="prod-description-img">
            `;
            if (productObj[clickedName].imgs.length > 0) {
                html += `
            <div class="product-slider-container swiper-container ">
                <div class="product-slider swiper-wrapper ">
                  ${productObj[clickedName].imgs.join("\n")}
                </div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
                <div class="swiper-pagination"></div>
                </div>
                `
            } else {
                html += `
                <iframe src=${productObj[clickedName].video} width="640" height="346" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
                `
            };
            html += `
            </div>
            <div class="prod-description-texts">
            <h4>${clickedLabel}</h4>
            <p class="mulish">Credibly optimize interactive total linkage and resource-leveling innovation. Proactively
            communicate empowered mindshare rather than strategic process improvements. Professionally impact
            mission-critical schemas rather than dynamic meta-services.</p>
            <br>
            <p class="mulish">Collaboratively myocardinate focused potentialities after transparent bandwidth. Uniquely.
            </p>
            <br><br><br>
            <p class="mulish"><b>Client: </b><a href="#" class="underline">TreeThemes</a></p>
            <p class="mulish"><b>Category: </b><span>Slider / Images</span></p>
            <button class="view-btn">VIEW PROJECT
            <i class="fas fa-share"></i>
            </button>
            <a href="#" class="close-btn"><i class="fas fa-times"></i></a>
            </div>
            </div>
            `
            
            document.querySelector(".prod-description").insertAdjacentHTML('beforeend', html);
            
            const prodContainer = document.querySelectorAll(".prod-description-container")

            // ? slider

            new Swiper(".product-slider-container", {
                navigation: {
                    prevEl: ".swiper-button-prev",
                    nextEl: ".swiper-button-next"
                },
                pagination: {
                    el: '.swiper-pagination',
                    type: 'bullets',
                    clickable: "true"
                },
                slidesPerView: 1,
                loop: true,
                centeredSlides: true,
                speed: 1000,
            });

            if (prodContainer.length > 1) prodContainer[0].remove()

            document.querySelector(".prod-description").scrollIntoView({
                behavior: "smooth",
            });

            // ? close button

            const closeBtn = document.querySelector(".close-btn")
                closeBtn.addEventListener("click", function (e) {
                e.preventDefault()
                prodContainer.forEach(prod => prod.style.animation = "height-none 1s")
                    setTimeout(() => prodContainer.forEach(prod => prod.remove()),1000)
                
            })
        
        })
    })
    

}

createElementFunc()




// ! clients hovering
const clients = document.querySelectorAll(".client-img")
const clientsTexts = document.querySelectorAll(".clients-content")
clients.forEach(client => {

    client.addEventListener("mouseenter", function (e) {
        clients.forEach(client => client.classList.remove("active"))
        e.target.classList.add("active")
        clientsTexts.forEach(el => {
            el.classList.remove("active-content")
            if (e.target.alt === el.dataset.client) {
                el.classList.add("active-content")
            }
        })
    })
})