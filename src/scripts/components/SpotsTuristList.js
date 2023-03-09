export class TouristSpots {
    constructor() {
        this.listCard = [
            {
                imageCard: "../svg/01-pao-de-acucar.svg",
                titleCard: "Pão de Açúcar",
                descriptionCard:
                    "Amet minim mollit non deserunt ullamco est sit aliqua dolor dosa amet sint. Velit officia consece duis enim velit mollit.",
            },
            {
                imageCard: "../svg/02-cristo-redentor.svg",
                titleCard: "Cristo Redentor ",
                descriptionCard:
                    "Amet minim mollit non deserunt ullamco est sit aliqua dolor dosa amet sint. Velit officia consece duis enim velit mollit.",
            },
            {
                imageCard: "../svg/03-ilha-grande.svg",
                titleCard: "Ilha Grande ",
                descriptionCard:
                    "Amet minim mollit non deserunt ullamco est sit aliqua dolor dosa amet sint. Velit officia consece duis enim velit mollit.",
            },
            {
                imageCard: "../svg/04-centro-historico-parati.svg",
                titleCard: "Centro Histórico de Paraty ",
                descriptionCard:
                    "Amet minim mollit non deserunt ullamco est sit aliqua dolor dosa amet sint. Velit officia consece duis enim velit mollit.",
            },
        ];

        this.selectors();
        this.events();
        this.createSlickVerify();
        this.createCard();
    }

    selectors() {
        this.form = document.querySelector(".form");
        this.image = document.querySelector(".form-imagem-input");
        this.titleForm = document.querySelector(".input-text-title");
        this.descriptionForm = document.querySelector(".text-area-description");
        this.containerIputImage = document.querySelector(".container-input-image");
        this.labelImage = document.querySelector(".label-image");
        this.preview = document.querySelector(".preview");
        this.containerCarrossel = document.querySelector(".container-row");
    }
    events() {
        this.image.addEventListener("change", this.loadPreviewImage.bind(this), false);
        this.form.addEventListener("submit", this.insertToList.bind(this));
    }

    // CREATE CARD FOR THE CARROUSSEL
    createCard() {
        let structure = "";
        this.listCard.forEach((item) => {
            structure += `
            <li data-test="item-list" class="card">
            <figure class="figure-card">
                    <img data-test="image-item-list" class="image-item" src="${item.imageCard}" alt="${item.descriptionCard}"/>
                    <figcaption class="subtitle-container-carroussel-card">
                    <h2 data-test="title-item-list" class="text-card">${item.titleCard}</h2>
                    <p data-test="description-item-list" class="paragraph-card">${item.descriptionCard}</p>
                    </figcaption>
                    </figure>
            </li>`;
        });
        this.containerCarrossel.innerHTML = structure;
    }

    // LOAD IMAGE IN PREVIEW INPUT
    loadPreviewImage(ev) {
        const inputTarget = ev.target;
        const file = inputTarget.files[0];
        if (file) {
            let reader = new FileReader();
            reader.addEventListener("load", (e) => {
                this.preview.src = e.target.result;

                this.labelImage.style.display = "none";
                this.preview.style.visbility = "hidden";
                this.preview.style.display = "block";
            });
            reader.readAsDataURL(file);
            ev.target.files[0] = "";
        }
    }

    // INSERT  CARD TO LIST
    insertToList(evt) {
        evt.preventDefault();
        const imageCard = this.preview.src;
        const titleCard = this.titleForm.value;
        const descriptionCard = this.descriptionForm.value;

        console.log("oassou aqui")
        const itemCard = {
            imageCard,
            titleCard,
            descriptionCard,
        };

        this.listCard.push(itemCard);
        this.resetSlickVerify();
        this.createCard();
        this.createSlickVerify();
        this.resetInputsFields();

    }

    // FUNCTIONS RESET INPUTS
    resetImageField() {
        this.preview.style.display = "none";
        this.labelImage.style.display = "flex";
    }
    resetInputsFields() {
        this.resetImageField();
        this.titleForm.value = "";
        this.descriptionForm.value = "";
        this.image.value = "";
    }

    // FUNCTIONS SLICK
    resetSlickVerify() {
        if (window.innerWidth > 1024) {
            $(".container-row").slick("unslick");
        }
    }

    createSlickVerify() {
        if (window.innerWidth > 1024) {
            $(".container-row").slick({
                infinite: true,
                slidesToScroll: 1,
                slidesToShow: 4,
                arrows: true,
                dots: true,
                prevArrow: `<img class= "slick-prev" src="./svg/prev.svg" alt="">`,
                nextArrow: `<img class="slick-next" src="./svg/next.svg" alt="">`,
                responsive: {
                    breakpoint: 1024,
                    arrows: false,
                    dots: false,
                    settings: "unslick",
                },
            });
        }
    }
}