
export function initBrand() {
// Şimdilik sadece About linkini yakala
const link = document.getElementById('aboutLink');
link?.addEventListener('click', (e) => {
e.preventDefault();
alert('DewOps — Open tools for everyone.\nAGPL-3.0 © DewOps');
});
}