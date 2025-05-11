// update-check.js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(registration => {
      registration.onupdatefound = () => {
        const newWorker = registration.installing;
        newWorker.onstatechange = () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            showUpdateBanner();
          }
        };
      };
    })
    .catch(error => {
      console.warn('Error al registrar service worker:', error);
    });
}

function showUpdateBanner() {
  const banner = document.createElement('div');
  banner.style = 'position:fixed;bottom:20px;left:20px;right:20px;padding:15px;background:#333;color:white;font-family:sans-serif;z-index:1000;text-align:center;border-radius:8px;';
  banner.innerHTML = `
    Nueva versión disponible.
    <button style="margin-left:10px;padding:5px 10px;" onclick="location.reload()">Actualizar</button>
  `;
  document.body.appendChild(banner);
}
