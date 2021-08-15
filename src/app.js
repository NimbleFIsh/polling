import { interval } from 'rxjs';
import { ajax } from 'rxjs/ajax';

function renderMsg(msgAll) {
    const msg_container = document.getElementById('msg_container');
    const time = new Date(msgAll.timestamp);
    document.getElementById('lastUpdated').innerText = `${time.toLocaleTimeString()} ${time.toLocaleDateString()}`;
    document.getElementById('added').innerText = msgAll.messages.length;
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
    document.getElementById('total').innerText = msg_container.childElementCount;
}

function ajaxReq() {
    ajax.getJSON('http://localhost:3035/messages/unread')
    .subscribe(
        res => renderMsg(res),
        err => console.error(err)
    )
}

ajaxReq();

interval(5000).subscribe({
    next: ajaxReq
});