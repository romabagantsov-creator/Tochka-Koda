
document.addEventListener('DOMContentLoaded', () => {
  // ===== МОБИЛЬНОЕ МЕНЮ =====
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');

  if (menuButton && nav) {
    const closeMenu = () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Открыть меню');
    };

    menuButton.addEventListener('click', () => {
      const isOpen =
        menuButton.getAttribute('aria-expanded') === 'true';

      menuButton.setAttribute('aria-expanded', String(!isOpen));
      menuButton.setAttribute(
        'aria-label',
        isOpen ? 'Открыть меню' : 'Закрыть меню'
      );

      nav.classList.toggle('open', !isOpen);
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', event => {
      if (
        !nav.contains(event.target) &&
        !menuButton.contains(event.target)
      ) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    });
  }

  // ===== АНИМАЦИЯ ПОЯВЛЕНИЯ БЛОКОВ =====
  const revealItems = document.querySelectorAll('.reveal');

  if (
    'IntersectionObserver' in window &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12
    });

    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => {
      item.classList.add('visible');
    });
  }

  // ===== ФОРМА ЗАПИСИ =====
  const form = document.getElementById('contact-form');
  const toast = document.getElementById('toast');

  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();

      // Проверяем заполнение обязательных полей.
      if (!form.reportValidity()) return;

      const data = new FormData(form);

      const name = String(data.get('name') || '').trim();
      const age = String(data.get('age') || '').trim();
      const contact = String(data.get('contact') || '').trim();

      const subject = encodeURIComponent(
        'Заявка на курс «Точка Кода»'
      );

      const body = encodeURIComponent(
        `Здравствуйте, Роман!

Хочу узнать о занятиях «Точка Кода».

Имя: ${name}
Возраст ученика: ${age}
Контакт для связи: ${contact}

Отправлено с сайта «Точка Кода».`
      );

      // Показываем уведомление.
      if (toast) {
        toast.textContent =
          'Откроется почтовое приложение с подготовленной заявкой.';

        toast.classList.add('show');

        window.setTimeout(() => {
          toast.classList.remove('show');
        }, 4500);
      }

      // Открываем почтовое приложение.
      // Письмо не отправляется автоматически.
      window.location.href =
        `mailto:rbagantsov@mail.ru?subject=${subject}&body=${body}`;
    });
  }

  // ===== АВТОМАТИЧЕСКИЙ ГОД В ФУТЕРЕ =====
  const year = document.getElementById('year');

  if (year) {
    year.textContent = new Date().getFullYear();
  }
});
