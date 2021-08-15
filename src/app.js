import { interval } from 'rxjs';
import { ajax } from 'rxjs/ajax';

function renderMsg(msgAll) {
    const msg_container = document.getElementById('msg_container');
    msgAll.messages.forEach(msg => {
        const date = new Date(msg.received);
        msg_container.insertAdjacentHTML('afterbegin', `
            <li class="msg" id="${msg.id}">
                <div class="email">${msg.from}</div>
                <div class="subject">${msg.subject.length > 15 ? msg.subject.substr(0, 15) + '...' : msg.subject}</div>
                <div class="date">${date.toLocaleTimeString()} ${date.toLocaleDateString()}</div>
            </li>
        `);
    });
}

interval(3000).subscribe({
    next: () => {
        ajax.getJSON('http://localhost:3035/messages/unread')
        .subscribe(
            res => renderMsg(res),
            err => console.error(err)
        )
    }
});