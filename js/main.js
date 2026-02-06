/**
 * hamburger
 */
document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector(".js-btn");
  const targetElements = document.querySelectorAll(
    ".l-header, .l-header__nav, .c-hamburger__line",
  );

  if (button) {
    button.addEventListener("click", () => {
      targetElements.forEach((el) => el.classList.toggle("open"));
    });
  }

  const navLinks = document.querySelectorAll(
    ".p-global-nav__link, .p-mega-menu__item",
  );

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const href = link.getAttribute("href");
      if (href === "#") {
        return;
      }

      targetElements.forEach((el) => el.classList.remove("open"));
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".js-background-shapes");
  if (!container) return;

  // 設定項目
  const shapeCount = 30;
  const colors = [
    "#ff768a", // ピンク 1
    "#89c3eb", // 水色 1
    "#89c3eb", // 黄色 1
    "#FFC800", // 黄色 2 (追加)
    "#fdf2a7", // 黄色 3 (追加)
  ];
  const types = ["circle", "square", "triangle"];
  const alpha = "50";

  for (let i = 0; i < shapeCount; i++) {
    const shape = document.createElement("div");

    const size = Math.random() * 30 + 15;

    const baseColor = colors[Math.floor(Math.random() * colors.length)];
    const color = baseColor + alpha;

    const type = types[Math.floor(Math.random() * types.length)];
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const duration = Math.random() * 10 + 10;
    const delay = Math.random() * 10;

    shape.classList.add("shape", `shape--${type}`);

    shape.style.left = `${left}%`;
    shape.style.top = `${top}%`;
    shape.style.animationDuration = `${duration}s`;
    shape.style.animationDelay = `-${delay}s`;

    if (type === "triangle") {
      shape.style.borderLeftWidth = `${size / 2}px`;
      shape.style.borderRightWidth = `${size / 2}px`;
      shape.style.borderBottomWidth = `${size}px`;
      shape.style.borderLeftColor = "transparent";
      shape.style.borderRightColor = "transparent";
      shape.style.borderBottomColor = color; // 透明度付きの色が適用されます
    } else {
      shape.style.width = `${size}px`;
      shape.style.height = `${size}px`;
      shape.style.backgroundColor = color; // 透明度付きの色が適用されます
    }

    container.appendChild(shape);
  }
});

/**
 * アコーディオン
 */
document.addEventListener("DOMContentLoaded", function () {
  const items = document.querySelectorAll(".c-accordion__item");

  items.forEach((item, index) => {
    const trigger = item.querySelector(".js-accordion-trigger");
    const content = item.querySelector(".js-accordion-content");

    if (!trigger || !content) return;

    const uniqueId = `accordion-content-${index}`;
    trigger.setAttribute("aria-controls", uniqueId);
    content.setAttribute("id", uniqueId);

    trigger.addEventListener("click", () => {
      const isOpen = trigger.classList.contains("is-active");
      if (isOpen) {
        closeAccordion(trigger, content);
      } else {
        openAccordion(trigger, content);
      }
    });
  });

  function openAccordion(trigger, content) {
    trigger.classList.add("is-active");
    trigger.setAttribute("aria-expanded", "true");

    content.classList.add("is-open");
    content.setAttribute("aria-hidden", "false");

    // 具体的な高さを計算してセット（これでアニメーションします）
    content.style.height = content.scrollHeight + "px";

    // アニメーション完了後に height: auto にしてレスポンシブ対応させる
    content.addEventListener("transitionend", function onTransitionEnd() {
      content.removeEventListener("transitionend", onTransitionEnd);
      content.style.height = "auto";
    });
  }

  function closeAccordion(trigger, content) {
    trigger.classList.remove("is-active");
    trigger.setAttribute("aria-expanded", "false");

    // 現在の高さをピクセルで再セット（autoから数値に戻さないとアニメーションしないため）
    content.style.height = content.scrollHeight + "px";

    // ブラウザの描画更新を待ってから 0 にする
    requestAnimationFrame(() => {
      content.style.height = "0";
      content.classList.remove("is-open");
      content.setAttribute("aria-hidden", "true");
    });
  }
});
