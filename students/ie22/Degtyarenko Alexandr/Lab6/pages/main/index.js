import { ProductCardComponent } from "../../components/product-card/index.js";
import { ChatPage } from "../chat/chatPage.js";
import { ProductPage } from "../product/index.js";
import { ajax } from "../../modules/ajax.js";
import { urls } from "../../modules/urls.js";
import { groupId } from "../../modules/consts.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.members = [];
        this.chats = [];
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getHTML() {
        return `
            <style>
                .chat-section {
                    background: linear-gradient(135deg,rgb(130, 35, 198),rgb(221, 124, 45));
                    padding: 20px; 
                    border-radius: 8px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                    color: white;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .chat-list {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
            </style>
            <div id="main-page" class="d-flex flex-column">
                <div id="member-list" class="member-list d-flex flex-wrap"></div>
                <div id="chat-section" class="chat-section mt-4">
                    <h2>Чаты сообщества</h2>
                    <div id="chat-list" class="chat-list d-flex flex-wrap mt-2"></div>
                </div>
            </div>`;
    }

    fetchMembers() {
        ajax.post(urls.getGroupMembers(groupId), (data) => {
            this.members = data.response.items;
            this.renderMembers(this.members);
        });
    }
    
    fetchChats() {
        ajax.post(urls.getGroupChats(groupId), (data) => {
            if (data.response && data.response.items) {
                this.chats = data.response.items;
                this.renderChats(this.chats);
            } else {
                console.error('Не удалось получить чаты', data);
            }
        });
    }

    renderMembers(items) {
        const memberList = document.getElementById('member-list');
        memberList.innerHTML = '';

        items.forEach((item) => {
            const productCard = new ProductCardComponent(memberList);
            productCard.render(item, this.clickMemberCard.bind(this));
        });
    }

    renderChats(items) {
        const chatList = document.getElementById('chat-list');
        chatList.innerHTML = '';
    
        items.forEach((item) => {
            const chatCard = document.createElement('div');
            chatCard.className = 'chat-card';
            chatCard.dataset.id = item.conversation.peer.id;
    
            const chatTitle = document.createElement('span');
            chatTitle.innerText = item.conversation.chat_settings.title || "Без названия";
            chatTitle.style.fontSize = '18px';

            chatCard.appendChild(chatTitle);
    
            chatCard.addEventListener('click', () => {
                const chatIdentifier = item.conversation.peer.id;
                const chatPage = new ChatPage(this.parent, chatIdentifier);
                chatPage.getData();
            });
    
            chatList.appendChild(chatCard);
        });
    }

    clickMemberCard(e) {
        const cardId = e.target.dataset.id;
        const productPage = new ProductPage(this.parent, cardId);
        productPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
    
        this.fetchMembers();
        this.fetchChats();
    }
}
