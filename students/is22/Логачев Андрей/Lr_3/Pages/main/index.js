import {ProductCardComponent} from "../../components/product-card/index.js";
import {ProductPage} from "../product/index.js";

export class MainPage {
    constructor(parent) { 
        this.parent = parent;
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }
        
    getHTML() {
        return (
            `
                <div id="main-page" class="d-flex flex-wrap"></div>
            `
        );
    }
    
    getData() {
        return [
            {
                id: 1,
                src: "https://m.streetcat.wiki/images/thumb/4/48/Freshguygif.gif/300px-Freshguygif.gif",
                title: "Mr Fresh",
                text: "Тот, кто ждет чего-то лучшего от жизни и проявляет терпение. Что-то подвернулось? Нет? Я еще потерплю."
            },
            {
                id: 2,
                src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyigNFMOoUHcpYXneHVERBHlLNTM-4qFuTlA&s",
                title: "Vibing Cat",
                text: "если у вас все хорошо или включена отличная музыка, под которую можно «вайбить»"
            },
            {
                id: 3,
                src: "https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_66003a554574211d98e676a3_66003abb0a03706993926e33/scale_1200",
                title: "Hug?",
                text: "Беседует с иностранцем, не говоря на его языке."
            },
        ]
    }
    getDataInfo() {
        return [
            {
                id: 1,
                src: "https://opis-cdn.tinkoffjournal.ru/mercury/02-cats-mem.gegcqxgs2if6..gif",
                title: "Mr Fresh",
                text: "Порода кота: Домашняя короткошерстная, не знаю зачем, но вот"
            },
            {
                id: 2,
                src: "https://opis-cdn.tinkoffjournal.ru/mercury/08-cats-mem.qzg8ghiayj9s..gif",
                title: "Vibing Cat",
                text: "Самое время насладиться моментом"
            },
            {
                id: 3,
                src: "https://opis-cdn.tinkoffjournal.ru/mercury/01-cats-mem.cg9l94h5qym2..gif",
                title: "Hug?",
                text: "Hug?"
            },
        ]
    }

    showNotification(message) {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.style.opacity = 1;
        setTimeout(() => {
            notification.style.opacity = 0;
        }, 3000);
    }
        
    clickCard(e) {
        const cardId = e.target.dataset.id;
        const data = this.getDataInfo().find(item => item.id === parseInt(cardId));

        const productPage = new ProductPage(this.parent, data);
        productPage.render();

        this.showNotification(`Meme: ${cardId}`);
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);  

        const data = this.getData();
        data.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot);
            productCard.render(item, this.clickCard.bind(this));
        });
    }
}