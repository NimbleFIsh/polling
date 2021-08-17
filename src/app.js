import { interval } from 'rxjs';
import { switchMap } from 'rxjs/operators'
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

interval(3000).pipe(
    switchMap(e => ajax.getJSON('https://chat-ws-nf.herokuapp.com/messages/unread'))
).subscribe(n => renderMsg(n));