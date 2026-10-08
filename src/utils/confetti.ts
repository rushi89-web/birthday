/**
 * Romantic Heart and Petal Confetti Effect
 * Lightweight, zero-external-dependencies, highly optimized canvas effect.
 */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  vRot: number;
  size: number;
  opacity: number;
  type: 'heart' | 'petal' | 'star';
  color: string;
}

export function fireRomanticConfetti(originX?: number, originY?: number, particleCount = 45) {
  if (typeof window === 'undefined') return;

  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  document.body.appendChild(canvas);

  const rawCtx = canvas.getContext('2d');
  if (!rawCtx) {
    canvas.remove();
    return;
  }
  const ctx: CanvasRenderingContext2D = rawCtx;

  const dpr = window.devicePixelRatio || 1;
  const width = window.innerWidth;
  const height = window.innerHeight;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.scale(dpr, dpr);

  const startX = originX !== undefined ? originX : width / 2;
  const startY = originY !== undefined ? originY : height / 2;

  const colors = [
    '#f43f5e', // rose-500
    '#fb7185', // rose-400
    '#f472b6', // pink-400
    '#fda4af', // rose-300
    '#fbcfe8', // pink-200
    '#fde047', // warm gold
  ];

  const particles: Particle[] = [];
  const types: ('heart' | 'petal' | 'star')[] = ['heart', 'petal', 'petal', 'star'];

  for (let i = 0; i < particleCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 2 + Math.random() * 6;
    particles.push({
      x: startX,
      y: startY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 2.5,
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 6,
      size: 8 + Math.random() * 12,
      opacity: 1,
      type: types[Math.floor(Math.random() * types.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
    });
  }

  function drawHeart(c: CanvasRenderingContext2D, size: number) {
    c.beginPath();
    const topCurveHeight = size * 0.3;
    c.moveTo(0, topCurveHeight);
    c.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
    c.bezierCurveTo(-size / 2, (size + topCurveHeight) / 2, 0, size, 0, size);
    c.bezierCurveTo(0, size, size / 2, (size + topCurveHeight) / 2, size / 2, topCurveHeight);
    c.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
    c.closePath();
    c.fill();
  }

  function drawPetal(c: CanvasRenderingContext2D, size: number) {
    c.beginPath();
    c.ellipse(0, 0, size * 0.45, size * 0.9, 0, 0, Math.PI * 2);
    c.fill();
  }

  function drawStar(c: CanvasRenderingContext2D, size: number) {
    c.beginPath();
    const spikes = 4;
    const outerRadius = size * 0.6;
    const innerRadius = size * 0.25;
    let rot = (Math.PI / 2) * 3;
    const step = Math.PI / spikes;

    c.moveTo(0, -outerRadius);
    for (let i = 0; i < spikes; i++) {
      let x = Math.cos(rot) * outerRadius;
      let y = Math.sin(rot) * outerRadius;
      c.lineTo(x, y);
      rot += step;

      x = Math.cos(rot) * innerRadius;
      y = Math.sin(rot) * innerRadius;
      c.lineTo(x, y);
      rot += step;
    }
    c.lineTo(0, -outerRadius);
    c.closePath();
    c.fill();
  }

  let animationFrameId: number;

  function render() {
    ctx.clearRect(0, 0, width, height);

    let activeCount = 0;

    for (const p of particles) {
      if (p.opacity <= 0.01) continue;
      activeCount++;

      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.12; // gentle gravity
      p.vx *= 0.98; // air resistance
      p.rotation += p.vRot;
      p.opacity -= 0.012; // fade out

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = Math.max(0, p.opacity);
      ctx.fillStyle = p.color;

      if (p.type === 'heart') {
        drawHeart(ctx, p.size);
      } else if (p.type === 'petal') {
        drawPetal(ctx, p.size);
      } else {
        drawStar(ctx, p.size);
      }

      ctx.restore();
    }

    if (activeCount > 0) {
      animationFrameId = requestAnimationFrame(render);
    } else {
      cancelAnimationFrame(animationFrameId);
      canvas.remove();
    }
  }

  animationFrameId = requestAnimationFrame(render);
}
