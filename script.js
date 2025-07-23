const card = document.getElementById('card');
const wrapper = document.getElementById('cardWrapper');

let targetX = 0, targetY = 0;
let currentX = 0, currentY = 0;

wrapper.addEventListener('mousemove', (e) => {
  const rect = wrapper.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const scale = 6;

  targetX = (x - centerX) / scale;
  targetY = -(y - centerY) / scale;

  // 💡 Shine rotation angle based on cursor
  const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
  card.style.setProperty('--shine-angle', `${angle}deg`);
});

wrapper.addEventListener('mouseleave', () => {
  targetX = 0;
  targetY = 0;
  card.style.setProperty('--shine-angle', `0deg`);
});

function animate() {
  currentX += (targetX - currentX) * 0.1;
  currentY += (targetY - currentY) * 0.1;

  card.style.transform = `rotateX(${currentY}deg) rotateY(${currentX}deg)`;
  const shine = card.querySelector('::before');
  requestAnimationFrame(animate);
}

animate();
