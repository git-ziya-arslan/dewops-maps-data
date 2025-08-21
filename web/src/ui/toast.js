
let holder;
function ensure() {
if (!holder) {
holder = document.createElement('div');
holder.className = 'toast-holder';
document.body.appendChild(holder);
}
}
export function toast(msg) {
ensure();
const el = document.createElement('div');
el.className = 'toast';
el.textContent = msg;
holder.appendChild(el);
setTimeout(() => el.classList.add('show'));
setTimeout(() => {
el.classList.remove('show');
setTimeout(() => el.remove(), 300);
}, 3000);
}